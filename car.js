class Car {
    //car object constructor
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;

        this.maxSpeed = maxSpeed;
        this.friction = 0.05;

        this.angle = 0;
        this.damaged=false;
        this.useBrain = controlType == "AI"; //if the control type is AI, then use the brain

        if (controlType != "DUMMY") {
            this.sensor = new Sensor(this); //instance of sensor class
            this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]) //input layer (ray count), hidden layer (6), output layer (4) forward,backward,left,right
        }
        this.controls = new Controls(controlType)
    }
    //check if a control is pressed, and move
    update(roadBorders, traffic) {
        if (!this.damaged) { //if the car is not damaged
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged = this.#assessDamage(roadBorders, traffic); //we assess damage with traffic
        }
        if (this.sensor) {
            this.sensor.update(roadBorders, traffic); //only update the sensor, if the property exists
            //take off the offseets from sensor readings (readings has x, y, offset of where the reading is )
            //if null, sensor goes as far as it can and doesnt read
            //1 - s.offset the neurons will recieve low values if the object is far away, and high values if the object is close
            //when we point a flashlight, as we get closer the light gets brighter
            const offsets = this.sensor.readings.map(s => s == null ? 0 : 1 - s.offset);
            const outputs = NeuralNetwork.feedForward(offsets, this.brain); //feedforward the neural network

            if (this.useBrain) { //if the car is using the brain
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }

    }

    #assessDamage(roadBorders, traffic) {
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }

        for (let i = 0; i < traffic.length; i++) { //when we touch the car we crash
            if (polysIntersect(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    }

    #createPolygon() {
        const points=[]; //one point per corner of the car
        //we need to find the corners of the car (see image 1)
        const rad=Math.hypot(this.width,this.height)/2; //hypotenuse of the car
        const alpha= Math.atan2(this.width,this.height);  //the tangent is the with divided by the height (use arc tangent)
        points.push({//top right
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }
    #move() {
        if (this.controls.forward) {
            this.speed += this.acceleration; //y increases as you go down
        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        //-this.maxSpeed indicates car moving backwards
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;
        }
        //decrease speed due to friction
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        //car moves with little friction
        //change the speed to 0
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {
            //calculate a flip, the value is 1 or minus 1 depending on the speed
            //this flips the controls backwards
            //this doesnt do anything when the velocity is positive
            const flip = this.speed < 0 ? -1 : 1;
            //left and right controls
            if (this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        //car will move in the direction of this angle
        //based off the unit circle, x translated by speed

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        //this.y -= this.speed;
        //method that takes context as param
    }
    draw(ctx, color, drawSensor = false) {
        if(this.damaged){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle = color;
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y); //move to the first point
        for(let i=1;i<this.polygon.length;i++){ //loop through the rest of the points
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();
        if (this.sensor && drawSensor) {
            this.sensor.draw(ctx); //draw the sensor
        }

    }
}