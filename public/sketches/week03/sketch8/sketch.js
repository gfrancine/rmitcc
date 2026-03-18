/*

Week 3
Text Points / Stretching

*/

document.title = "W3 - Text Points / Stretching";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let font;

// https://p5js.org/reference/p5.Font/textToPoints/
// https://p5js.org/reference/p5.Font/textBounds/

async function setup() {
  // preload function deprecated in p5 2.0
  // https://dev.to/limzykenneth/asynchronous-p5js-20-458f
  font = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  createCanvas(windowWidth, windowHeight);
  // rectMode(CENTER); // https://p5js.org/reference/p5/rectMode/
  textFont(font);
}

const textBoxes /* {
  textStr: string,
  bg: () => p5.Color,
  fg: () => p5.Color,
  x0: number
  y0: number
  x1: number
  y1: number
} */ = [];

const phrases = `
hello p5!
`
  .trim()
  //.split(/\s/);
  .split("\n");

/*
function randomFromArray(array) {
  const i = Math.floor(Math.random() * array.length);
  return array[i];
} */

let phrasesCursor = 0; // increase every call

function randomTextBox(x0, y0, x1, y1) {
  const textStr = phrases[phrasesCursor]; // randomFromArray(phrases);
  phrasesCursor++;
  if (phrasesCursor === phrases.length) phrasesCursor = 0;

  const colorKeys = Object.keys(COLORS).sort(() => Math.random() - 0.5);
  colorKeys.splice(colorKeys.indexOf("grey90"), 1); // remove the sketch background color
  const color1 = colorKeys.pop();
  const color2 = colorKeys.pop();
  // console.log(color1, color2); // debug
  const bg = COLORS[color1];
  const fg = COLORS[color2];

  return {
    textStr,
    bg,
    fg,
    x0,
    y0,
    x1,
    y1,
  };
}

let mouseDragStartPos = null; /* { x: number, y: number } */

function draw() {
  background(COLORS.grey90());

  // helper text
  if (textBoxes.length === 0) {
    push();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(height / 30);
    text("click and drag!", width / 2, height / 2);
    pop();
  }

  // textboxes
  textBoxes.forEach((textBox) => {
    const { textStr, x0, y0, x1, y1 } = textBox;

    const minX = Math.min(x0, x1);
    const minY = Math.min(y0, y1);
    const maxX = Math.max(x0, x1);
    const maxY = Math.max(y0, y1);

    const w = maxX - minX;
    const h = maxY - minY;

    push();

    // draw the background rect
    strokeWeight(0);
    fill(textBox.bg());
    rect(minX, minY, w, h);

    // calculate the actual rendered text bounds
    textAlign(LEFT, TOP);
    textSize(h);
    const bounds = textBounds(textStr, minX, minY);
    /* // debug
    push();
    fill(0, 0, 0, 0);
    strokeWeight(0.5);
    stroke(255, 0, 0);
    rect(bounds.x, bounds.y, bounds.w, bounds.h);
    pop();
    */

    // compensate the differences
    translate(minX, minY);
    scale(w / bounds.w, h / bounds.h); // bugfix note: scale first before applying position adjustments; otherwise, they get scaled too

    // draw the text
    fill(textBox.fg());
    text(textStr, minX - bounds.x, minY - bounds.y);

    pop();
  });

  // drag selection
  if (mouseDragStartPos) {
    // is dragging
    const minX = Math.min(mouseDragStartPos.x, mouseX);
    const minY = Math.min(mouseDragStartPos.y, mouseY);
    const maxX = Math.max(mouseDragStartPos.x, mouseX);
    const maxY = Math.max(mouseDragStartPos.y, mouseY);

    push();
    strokeWeight(1);
    fill(0, 0, 0, 0);
    rect(minX, minY, maxX - minX, maxY - minY);
    pop();
  }
}

function mousePressed() {
  // drag start
  if (!mouseDragStartPos) {
    mouseDragStartPos = { x: mouseX, y: mouseY };
  }
}

function mouseReleased() {
  // drag end
  textBoxes.push(
    randomTextBox(mouseDragStartPos.x, mouseDragStartPos.y, mouseX, mouseY),
  );

  mouseDragStartPos = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
