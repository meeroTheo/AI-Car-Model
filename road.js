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

        for (let i = 0; i <= this.laneCount; i++) {
            //what is the x coordinate of each of these vertical lines
            //we get these by linear interpolation
            const x = lerp(this.left,
                this.right, i / this.laneCount); //x coordinate of the line

            //make a vertical line on the left side of the screen
            ctx.beginPath(); //start drawing
            ctx.moveTo(x, this.top); //start at the top left
            ctx.lineTo(x, this.bottom); //draw to the bottom left
            ctx.stroke(); //draw the line

        }
    }
}

function lerp(A, B, t) {
    //You have the value of A, and the difference between B and A multiplied by percentage t
    //when t is 0, you get A
    //when t is 1, you get B
    //when t is 0.5, you get the midpoint between A and B
    // 0 and 1 give you the two endpoints
    return A + (B - A) * t; //linear interpolation

}