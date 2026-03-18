/*

Week 3
Fonts / Datavis

*/

document.title = "W3 - Fonts / Datavis";

const SHARED_PATH = "../../../shared/";

let font;

// preload function deprecated in p5 2.0
// https://dev.to/limzykenneth/asynchronous-p5js-20-458f

async function setup() {
  font = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  createCanvas(windowWidth, windowHeight);
}

const textCoords = {
  x: [],
  y: [],
};

for (let i = 0; i < 30; i++) {
  textCoords.x.push(Math.random());
  textCoords.y.push(Math.random());
}

function drawHelloText(x, y) {
  push();

  textFont(font);
  textAlign(CENTER, CENTER);
  textSize((height / 10) * x);

  stroke(0);
  strokeWeight(1);
  strokeWeight((height / 80) * y);

  text("hello!", width * x, height * y);

  pop();
}

function draw() {
  background(220);

  stroke(0);
  strokeWeight(1);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);

  textCoords.x.forEach((x, i) => {
    const y = textCoords.y[i];
    drawHelloText(x, y);
  });

  drawHelloText(mouseX / width, mouseY / height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
