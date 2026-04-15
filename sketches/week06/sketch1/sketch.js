/*

Week 6
Randomness / Starry Skies

*/

document.title = "W6 - Randomness / Starry Skies";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

// background is lost on resizeCanvas
function drawBackground() {
  background(COLORS.black());
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  // noLoop();

  drawBackground();
}

function draw() {
  const smallestDimension = min(width, height);
  const dotSize = smallestDimension * 0.008;

  for (let i = 0; i < 5; i++) {
    fill(random(255));
    square(random(width), random(height), dotSize);
  }

  background(0, 0, 0, 255 * 0.1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawBackground();
}
