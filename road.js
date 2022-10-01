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
    //tells us what is the center of a given lane
    getLaneCenter(laneIndex) {
        const laneWidth = this.width / this.laneCount; //width of each lane
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth; //center of the lane
    }

    draw(ctx) {

        ctx.lineWidth = 5; //set width of the road
        ctx.strokeStyle = 'white'; //set color of the road

        for (let i = 0; i <= this.laneCount; i++) {
            //what is the x coordinate of each of these vertical lines
            //we get these by linear interpolation
            const x = lerp(this.left,
                this.right, i / this.laneCount); //x coordinate of the line

            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20, 20]); //dashed line after every 20 pixels
            } else {
                ctx.setLineDash([]); //no dashes
            }
            //make a vertical line on the left side of the screen
            ctx.beginPath(); //start drawing
            ctx.moveTo(x, this.top); //start at the top left
            ctx.lineTo(x, this.bottom); //draw to the bottom left
            ctx.stroke(); //draw the line

        }
    }
}

