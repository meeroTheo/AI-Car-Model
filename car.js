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

        this.controls = new Controls()
    }
    //check if a control is pressed, and move
    update() {
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
        this.y -= this.speed;
    }
    //method that takes context as param
    draw(ctx) {
        ctx.beginPath();
        //draw the car as a rectangle
        //it starts at x,y
        //the x is the center of the car
        ctx.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}