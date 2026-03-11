/*

Week 2
Hello P5

*/

document.title = "W2 Hello P5";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(127);

  // shapes
  fill(0, 255, 0, 0);
  stroke(0, 255, 0);
  strokeWeight(2);

  line(0, 0, windowWidth, windowHeight);
  line(windowWidth, 0, 0, windowHeight);
  rect(0, 0, windowWidth, windowHeight);
  ellipse(windowWidth / 2, windowHeight / 2, 50, 50); // ellipses' origins are on the center
  square(windowWidth / 2, windowHeight / 2, 50); // squares' aren't

  square(0, 0, 50); // positions (0,0) start on the top left
  square(100, 200, 100);

  // text
  textAlign(RIGHT, BOTTOM);
  textSize(windowHeight / 10);
  text("Hello p5!", windowWidth, windowHeight);
}

// Events

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
