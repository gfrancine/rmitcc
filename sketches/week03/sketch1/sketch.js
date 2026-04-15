/*

Week 3
Fonts / Hello

*/

document.title = "W3 - Fonts / Hello";

const SHARED_PATH = "../../../shared/";

let font;

// preload function deprecated in p5 2.0
// https://dev.to/limzykenneth/asynchronous-p5js-20-458f

async function setup() {
  font = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  stroke(0);
  strokeWeight(1);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);

  push();

  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(height / 10);

  stroke(0);
  strokeWeight(1);
  strokeWeight(height / 80);
  text("hello worlddddd!", width / 2, height / 2);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
