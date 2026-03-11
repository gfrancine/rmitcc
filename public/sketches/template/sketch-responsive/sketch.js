/*

Week 
Title

*/

document.title = "Title";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  ellipse(CANVAS_W / 2, CANVAS_H / 2, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
