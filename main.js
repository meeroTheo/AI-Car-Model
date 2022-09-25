const canvas = document.getElementById("myCanvas");
canvas.width = 200;

//Reference to canvas context that contains
//all the drawing methods
const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);

//start to animate the car
animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    //CONSISTENTLY CALLS animation 
    //gives illusion of movement
    requestAnimationFrame(animate);

}
