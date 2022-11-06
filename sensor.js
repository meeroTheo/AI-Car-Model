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
    
}