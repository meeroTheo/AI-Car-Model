class Car {
    //car object constructor
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls()
    }
    //check if a control is pressed, and move
    update() {
        if (this.controls.forward) {
            this.y -= 2; //y increases as you go down
        }
        if (this.controls.reverse) {
            this.y += 2;
        }
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