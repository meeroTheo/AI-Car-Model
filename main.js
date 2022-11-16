const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

//Reference to canvas context that contains
//all the drawing methods
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 100;
const cars = generateCars(N); //generate 100 cars


const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2) //does not hold control
];
//start to animate the car
animate();

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

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    //make it so that the car is always in the center of the screen
    carCtx.save();
    carCtx.translate(0, -cars[0].y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }

    carCtx.globalAlpha = 0.2; //changes the opacity of the car
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");

    }
    carCtx.globalAlpha = 1;
    cars[0].draw(carCtx, "blue", true); //only draw sensors
    carCtx.restore();

    //Visualizer.drawNetwork(networkCtx, cars[0].brain);

    //CONSISTENTLY CALLS animation 
    //gives illusion of movement
    requestAnimationFrame(animate);

}
