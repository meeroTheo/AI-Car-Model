class Sensor{
    //constructor takes car as an argument
    //we need to know where the car is
    constructor(car){
        this.car=car;
        this.rayCount=3; //our sensor casts 3 rays in different directions ahead of the car
        this.rayLength=100; //sensors have a range (after which they dont work anymore)
        //if they dont sense anything beyond the 100 px range they cant see beyond
        this.raySpread=Math.PI/4; //same as 45 degrees(angle of rays)
        this.rays=[]; //array of rays keeps individual rays
    }

    update(){
        this.rays=[]; //array that we need to populate with rays
        for (let i=0;i<this.rayCount;i++){
            //use lerp to interpolate between the angle of the car and the angle of the car plus the spread
            //gives us value between A and B depending on the value of t
            const rayAngle = lerp(//figure out the angle of each individual ray
                this.raySpread/2, //remember the unit circle
                -this.raySpread/2,
                i/(this.rayCount-1)
             );
             //calculate the start poiint of the array
             const start ={x:this.car.x,y:this.car.y};
                //calculate the end point of the array
             const end={
                //uses sin and cos because we are using the unit circle to calculate the angle
                x:this.car.x-Math.sin(rayAngle)*this.rayLength, //x coordinate of the end point
                y:this.car.y-Math.cos(rayAngle)*this.rayLength //y coordinate of the end point
             };
             this.rays.push([start,end]); //push inside the array to form a segment (same as borders in road.js)

        }
        
    }
    //draw the rays
    draw(ctx){
        for (let i=0;i<this.rayCount;i++){
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle='red';
            //move to the start point of the ray
            ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);
            //draw to the end point of the ray
            ctx.lineTo(this.rays[i][1].x,this.rays[i][1].y);
            ctx.stroke();
            
        }
    }

}