/*

Week 2
Drawing / Velocity

*/

document.title = "Drawing / Velocity";

function setup() {
  createCanvas(windowWidth, windowHeight);

  background(255, 0, 255);

  textSize(windowWidth / 10);
  textAlign(CENTER, CENTER);
  fill(0, 255, 0);
  text("Velocity!", windowWidth / 2, windowHeight / 2);
}

function draw() {
  // fourh variable is opacity
  // but why is it never covering up completely?
  background(255, 0, 255, 10);

  if (mouseX === 0 && mouseY === 0) return; // do not draw when mouse is outside

  // square color and width changes based on mouse speed
  const deltaD = createVector(mouseX, mouseY).dist(
    createVector(pmouseX, pmouseY),
  );

  // too lazy to do pythagoras
  const windowDiagonal = createVector(0, 0).dist(
    createVector(windowHeight, windowWidth),
  );

  const value = deltaD / windowDiagonal;

  strokeWeight(1);

  // the faster the mouse, the greener
  fill(255 - 255 * value * 20, 255, 255 - 255 * value * 20);

  const minSize = windowWidth / 20;
  const maxSize = windowWidth / 5;
  const unit = windowWidth * 2; // arbitrary

  square(mouseX, mouseY, Math.max(minSize, Math.min(maxSize, unit * value)));
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
