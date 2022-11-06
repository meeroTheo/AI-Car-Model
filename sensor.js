class Sensor{
    //constructor takes car as an argument
    //we need to know where the car is
    constructor(car){
        this.car=car;
        this.rayCount=5; //our sensor casts 3 rays in different directions ahead of the car
        this.rayLength=150; //sensors have a range (after which they dont work anymore)
        //if they dont sense anything beyond the 100 px range they cant see beyond
        this.raySpread=Math.PI/2; //same as 45 degrees(angle of rays)
        this.rays=[]; //array of rays keeps individual rays
        this.readings=[]; //some values for each array telling us if there is a border there or not

    }

    update(roadBorders){
        //we cant detect whether the road borders are close or not
        this.#castRays(); //cast rays private method
        this.readings=[]; //array of readings
        for (let i=0;i<this.rays.length;i++){
            this.readings.push(
                this.#getReading(this.rays[i],roadBorders) //add to readings array a reading
        
            );
        
        }
    }
    #getReading(ray,roadBorders){
        //check to see where the array touches the road borders
        //we only have 2 borders( one ray can only touch both of them if the car goes offscreen
        //its good to consider multiple intersections 
        //later we will have traffic
        //we will find all the touches and keep the closest one to the sensor
        //that will be our reading
        let touches=[];
        for (let i=0;i<roadBorders.length;i++){
            const touch=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if (touch){
                touches.push(touch); //may return null if segments dont intersect
            }
        }
        if (touches.length==0){ //no readings (dont encounter anything)
            return null;
        }

        else{
            //get intersectioj doesnt just return intersection
            // point (but also offset( how far the point is from this 
            //ray of 0which 9s the center of the car ))
            //we want to find all the offsets from all the touches in one array
            //(map method goes through all elements in the array and for each element it takes its offset (returns a new array called offsets))
            const offsets=touches.map(e=>e.offset);
            //we need to find the nearest offset
            const minOffset=Math.min(...offsets); //spread operator (spreads the array into individual values)
            //return the touch with the minimum offset
            return touches.find(e=>e.offset==minOffset);
        }
    }
    #castRays(){
        this.rays=[]; //array that we need to populate with rays
        for (let i=0;i<this.rayCount;i++){
            //use lerp to interpolate between the angle of the car and the angle of the car plus the spread
            //gives us value between A and B depending on the value of t
            const rayAngle = lerp(//figure out the angle of each individual ray
                this.raySpread/2, //remember the unit circle
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1) //if there is only one ray, it will be in the middle
             )+this.car.angle; //add the angle of the car to the angle of the ray
             //calculate the start poiint of the array
             const start ={x:this.car.x,y:this.car.y};
                //calculate the end point of the array
             const end={
                //uses sin and cos because we are using the unit circle to calculate the angle
                x:this.car.x-
                Math.sin(rayAngle)*this.rayLength, //x coordinate of the end point
                y:this.car.y-
                Math.cos(rayAngle)*this.rayLength //y coordinate of the end point
             };
             this.rays.push([start,end]); //push inside the array to form a segment (same as borders in road.js)
        }
    }
    //draw the rays
    draw(ctx){
        for (let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if (this.readings[i]){
                end=this.readings[i];
            }
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle='yellow';
            //move to the start point of the ray
            ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);
            //draw to the end point of the ray
            ctx.lineTo(end.x,end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle='black';
            //draws tip of where the line should be
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y);
            //draw to the end point of the ray
            ctx.lineTo(end.x,end.y);
            ctx.stroke();
            
        }
    }

}