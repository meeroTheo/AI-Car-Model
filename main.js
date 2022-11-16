const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

//const networkCanvas = document.getElementById("networkCanvas");
//networkCanvas.width = 300;

//Reference to canvas context that contains
//all the drawing methods
const carCtx = carCanvas.getContext("2d");
//const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 100;
const cars = generateCars(N); //generate 100 cars
let bestCar = cars[0]; //will update on every frame
//get mutate value from html
const mutateValue = document.getElementById("mutateValue");
if (localStorage.getItem("bestBrain")) { //we can still get a previous brain from local storage
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem("bestBrain")); //parse the brain from local storage
        if (i != 0) {
            //the brain in local storage will be kept, when i=0 (best car)
            //for all the other ones, mutate
            NeuralNetwork.mutate(cars[i].brain, mutateValue); //0.2 is the amount factor
        }
    }


}


const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2), //does not hold control
    new Car(road.getLaneCenter(0), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "DUMMY", 2),

];
//start to animate the car
animate();

function save() {
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain)); //serializing the brain into local storage
}
function discard() {
    localStorage.removeItem("bestBrain");
}
function generateCars(N) {
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}
function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic); //pass the road borders to the car

    }
    bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y))); //find the car with the lowest y value of all cars
    //...cars.map(c => c.y) creates an array of all the y values of the cars which we spread into the min function


    carCanvas.height = window.innerHeight;
    //networkCanvas.height = window.innerHeight;
    //make it so that the car is always in the center of the screen
    carCtx.save();
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2; //changes the opacity of the car
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");

    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true); //only draw sensors
    carCtx.restore();

    //Visualizer.drawNetwork(networkCtx, bestCar.brain);

    //CONSISTENTLY CALLS animation 
    //gives illusion of movement
    requestAnimationFrame(animate);

}
