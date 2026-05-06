/*

Week 8
Sounds / 

*/

document.title = "W8 - Sounds /";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let playing = false;

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (!playing) {
    textSize(12);
    textAlign(LEFT, TOP);
    text("Click to begin!", 0, 0);
    return;
  }

  ellipse(width / 2, height / 2, 50, 50);
}

function mousePressed() {
  if (!playing) {
    playing = true;
    userStartAudio();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
