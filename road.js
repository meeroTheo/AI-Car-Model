class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;  //center of the road
        this.width = width; //width of the road
        this.laneCount = laneCount; //number of lanes

        this.left = x - width / 2; //left side of the road
        this.right = x + width / 2; //right side of the road

        const infinity = 1000000; //arbitrary large number
        this.top = -infinity; //top of the road
        this.bottom = infinity; //bottom of the road

    }

    draw(ctx) {
        ctx.lineWidth = 5; //set width of the road
        ctx.strokeStyle = 'white'; //set color of the road

        //make a vertical line on the left side of the screen
        ctx.beginPath(); //start drawing
        ctx.moveTo(this.left, this.top); //start at the top left
        ctx.lineTo(this.left, this.bottom); //draw to the bottom left
        ctx.stroke(); //draw the line

        ctx.beginPath(); //start drawing
        ctx.moveTo(this.right, this.top); //start at the top right
        ctx.lineTo(this.right, this.bottom); //draw to the bottom right
        ctx.stroke(); //draw the line
    }
}