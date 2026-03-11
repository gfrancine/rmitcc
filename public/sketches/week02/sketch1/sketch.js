/*

Week 2
Hello P5

*/

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 0, 255);
  fill(0, 255, 0, 0);
  stroke(0, 255, 0);
  strokeWeight(2);

  ellipse(windowWidth / 2, windowHeight / 2, 50, 50);
  square(100, 200, 100);
  square(0, 100, 50);
  line(0, 0, windowWidth, windowHeight);
}

// Events

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
