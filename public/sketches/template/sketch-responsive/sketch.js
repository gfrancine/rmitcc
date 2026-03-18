/*

Week 
Title

*/

document.title = "W - Title";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  ellipse(width / 2, height / 2, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
