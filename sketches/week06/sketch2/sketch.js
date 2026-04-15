/*

Week 6
Randomness / Starry Skies 2

*/

document.title = "W6 - Randomness / Starry Skies 2";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

// background is lost on resizeCanvas
function drawBackground() {
  background(COLORS.blue());
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  // noLoop();

  drawBackground();
  rectMode(CENTER);
}

function draw() {
  const smallestDimension = min(width, height);

  for (let i = 0; i < 50; i++) {
    const size = smallestDimension * random(0.01, 0.4);

    // use classes next?
    noStroke();
    fill(random(255), 0, 255);
    square(random(width), random(height), size);
  }

  background(0, 0, 255, 255 * 0.1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawBackground();
}
