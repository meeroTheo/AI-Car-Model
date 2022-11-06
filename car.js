class Car {
    //car object constructor
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;

        this.maxSpeed = 3;
        this.friction = 0.05;
        this.sensor=new Sensor(this); //instance of sensor class
        this.angle = 0;
        this.damaged=false;

        this.controls = new Controls()
    }
    //check if a control is pressed, and move
    update(roadBorders) {
        if (!this.damaged) {
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged=this.#assessDamage(roadBorders);
        }
        this.sensor.update(roadBorders);
    }

    #assessDamage(roadBorders){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
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
    draw(ctx) {
        if(this.damaged){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle="black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();

        this.sensor.draw(ctx);
    }
}