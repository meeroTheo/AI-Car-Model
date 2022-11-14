const canvas = document.getElementById("myCanvas");
canvas.width = 200;

//Reference to canvas context that contains
//all the drawing methods
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS"); //HOLDS control
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

    canvas.height = window.innerHeight;

    //make it so that the car is always in the center of the screen
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx);
    }
    car.draw(ctx);

    ctx.restore();
    //CONSISTENTLY CALLS animation 
    //gives illusion of movement
    requestAnimationFrame(animate);

}
