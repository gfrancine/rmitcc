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

  // circle
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

  // make the face respond to the mouse
  // TODO: parallax
  const mouseLookX = (mouseX - windowWidth / 2) / windowWidth;
  const mouseLookY = (mouseY - windowHeight / 2) / windowHeight;
  const moveFactor = 30; // arbitrary number

  translate(mouseLookX * moveFactor, mouseLookY * moveFactor);

  // eyes
  push();
  // parallax, eyes move a little more than the rest of the face
  translate(mouseLookX * moveFactor, mouseLookY * moveFactor);
  text("O", -TEXT_SIZE * 2, 0);
  text("0", TEXT_SIZE * 2, 0);

  pop();

  textSize(TEXT_SIZE * 2);

  //mouth
  text("-------", 0, TEXT_SIZE * 1.5);

  //nose
  text("L", 0, TEXT_SIZE / 2);

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
