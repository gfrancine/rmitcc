/*

Week 5
Hello Camera

*/

document.title = "W5 - Hello Camera";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let capture;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // https://p5js.org/examples/imported-media-video-capture/
  capture = createCapture(VIDEO);
  capture.size(360, 200);
  capture.hide();

  frameRate(24);
  // noLoop();
}

function draw() {
  background(220);

  push();

  translate(width / 2, height / 2); // move origin to center, so the video shears from the center
  scale(-1, 1); // flip
  shearX(((mouseX - width / 2) / width) * PI); // shear based on mouse position // TODO : sine wave?
  shearY(((mouseY - height / 2) / height) * PI);

  image(capture, -width / 2, -height / 2, width, height);

  filter(INVERT);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
