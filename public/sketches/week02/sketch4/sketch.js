/*

Week 2
Drawing

*/

document.title = "W2 Drawing";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 255);

  textSize(windowHeight / 20);
  textAlign(CENTER, CENTER);
  fill(0, 255, 0);
  text(
    "draw something!\n(press down to draw)",
    windowWidth / 2,
    windowHeight / 2,
  );
}

function draw() {
  // do not draw when mouse is outside
  if (mouseX === 0 && mouseY === 0) return;

  strokeWeight(2);
  stroke(0, 255, 0);
  fill(0, 0, 0, 0);
  if (mouseIsPressed) fill(0, 255, 0);

  square(mouseX, mouseY, windowWidth / 10);
}

// Events

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("mycanvas", "jpg");
  }
}
