/*

Week 2
Drawing / Lines

*/

document.title = "W2 Drawing / Lines";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 0, 255);

  textSize(windowHeight / 20);
  textAlign(CENTER, CENTER);
  fill(0, 255, 0);
  text("lines!\n(press down to draw)", windowWidth / 2, windowHeight / 2);
}

function draw() {
  // background(255, 0, 255, 1);

  // do not draw when mouse is outside
  if (mouseX === 0 && mouseY === 0) {
    return;
  }

  stroke(0, 255, 0);
  strokeWeight(2);
  if (mouseIsPressed) {
    line(windowWidth / 2, windowHeight / 2, mouseX, mouseY);
  }
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
