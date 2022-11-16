const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

//Reference to canvas context that contains
//all the drawing methods
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI"); //HOLDS control
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2) //does not hold control
];
//start to animate the car
animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic); //pass the road borders to the car

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    //make it so that the car is always in the center of the screen
    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, car.brain);

    //CONSISTENTLY CALLS animation 
    //gives illusion of movement
    requestAnimationFrame(animate);

}
