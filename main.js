const canvas = document.getElementById("myCanvas");
canvas.width = 200;

//Reference to canvas context that contains
//all the drawing methods
const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width);
const car = new Car(100, 100, 30, 50);

//start to animate the car
animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    road.draw(ctx);
    car.draw(ctx);
    //CONSISTENTLY CALLS animation 
    //gives illusion of movement
    requestAnimationFrame(animate);

}
