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

        this.angle = 0;

        this.controls = new Controls()
    }
    //check if a control is pressed, and move
    update() {
        this.#move();
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
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        //draw the car as a rectangle
        //it starts at x,y
        //the x is the center of the car
        ctx.rect(
            - this.width / 2,
            - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();
    }
}