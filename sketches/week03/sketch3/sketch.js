/*

Week 3
Fonts / Drawing

*/

document.title = "W3 - Fonts / Drawing";

const SHARED_PATH = "../../../shared/";

let font;

// preload function deprecated in p5 2.0
// https://dev.to/limzykenneth/asynchronous-p5js-20-458f

async function setup() {
  font = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  createCanvas(windowWidth, windowHeight);

  background(220);
}

function draw() {
  push();

  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(height / 30);

  if (mouseX > 0 && mouseY > 0) {
    text("hello worlddddd!", mouseX, mouseY);
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
