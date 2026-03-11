/*

Week 2
Faces

*/

document.title = "W2 Faces";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(127);

  const TEXT_SIZE = Math.min(windowWidth, windowHeight) / 10;
  const CENTER_X = windowWidth / 2;
  const CENTER_Y = windowHeight / 2;

  // face
  fill(255, 0, 255);
  noStroke();
  translate(CENTER_X, CENTER_Y); // move 0,0 to the center
  ellipse(0, 0, TEXT_SIZE * 8);

  fill(0, 0, 255);
  stroke(0, 255, 0);
  strokeWeight(20);

  // facial features
  strokeWeight(50);
  textSize(TEXT_SIZE);
  textAlign(CENTER, CENTER);

  // make the face respond to the mouse and with parallax
  // first find out how far off the mouse is from the center
  const mouseOffsetX = ((mouseX - windowWidth / 2) / windowWidth) * 2; // 0 to 1
  const mouseOffsetY = ((mouseY - windowHeight / 2) / windowHeight) * 2;
  const moveFactor = 10; // arbitrary number
  translate(mouseOffsetX * moveFactor, mouseOffsetY * moveFactor);

  // eyes
  push();
  // 1.4 is also an arbitrary finetuned number because movefactor ^ 2 is a little too much
  translate(mouseOffsetX * moveFactor ** 1.4, mouseOffsetY * moveFactor ** 1.4);
  text("O", -TEXT_SIZE * 2, 0);
  text("0", TEXT_SIZE * 2, 0);
  pop();

  textSize(TEXT_SIZE * 2);

  // mouth
  text("-------", 0, TEXT_SIZE * 1.5);

  // nose also moves, about half as much as the eyes
  push();
  translate(mouseOffsetX * moveFactor, mouseOffsetY * moveFactor);
  text("L", 0, TEXT_SIZE / 2);
  pop();

  // eyebrows
  push();
  translate(-TEXT_SIZE * 2, -TEXT_SIZE * 2); // move origin to the eyebrow position
  rotate(QUARTER_PI * -2);
  text(")", 0, 0);
  pop();

  push();
  translate(TEXT_SIZE * 2, -TEXT_SIZE * 2); // move origin to the eyebrow position
  rotate(QUARTER_PI * -2);
  text(")", 0, 0);
  pop();
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
