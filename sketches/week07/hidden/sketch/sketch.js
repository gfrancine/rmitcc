/*

Week 
Title

*/

document.title = "W - Title";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const CANVAS_W = 800;
const CANVAS_H = 600;

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
}

function draw() {
  background(220);
  ellipse(CANVAS_W / 2, CANVAS_H / 2, 50, 50);
}
