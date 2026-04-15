/*

Week 3
Text Points / Stretching

*/

document.title = "W3 - Text Points / Stretching";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

// Text boxes

const textBoxes /* {
  textStr: string,
  bg: () => p5.Color,
  fg: () => p5.Color,
  x0: number
  y0: number
  x1: number
  y1: number
} */ = [];

function p5Color(...values) {
  return () => color(...values);
}

// copied from globals
const TEXTBOX_COLORS = {
  // neutrals
  black: p5Color(0),
  white: p5Color(255),
  grey50: p5Color(127),
  // primaries/extremes
  red: p5Color(255, 0, 0),
  green: p5Color(0, 255, 0),
  magenta: p5Color(255, 0, 255),
  blue: p5Color(0, 0, 255),
  // olives, murky yellows/greens/browns
  brass: p5Color(180, 170, 45),
  wasabi: p5Color(127, 140, 50),
  // intense warm
  pumpkin: p5Color(255, 120, 40),
  // pinks
  fuchsia: p5Color(245, 0, 180),
  // blues/purples
  crystalBlue: p5Color(100, 175, 250),
  lavenderBlue: p5Color(127, 130, 233),
};

// "thing" by leonard cohen
const phrases = `
i am
this thing
that needs
to sing
I love
to sing
to my beloved's
other
thing
O G-D
I want
to sing
I Am
this thing
THAT 
NEEDS
TO 
SING!
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

  const colorKeys = Object.keys(TEXTBOX_COLORS).sort(() => Math.random() - 0.5);
  const color1 = colorKeys.pop();
  const color2 = colorKeys.pop();
  // console.log(color1, color2); // debug
  const bg = TEXTBOX_COLORS[color1];
  const fg = TEXTBOX_COLORS[color2];

  return {
    textStr,
    bg, //: TEXTBOX_COLORS.blue,
    fg, //: TEXTBOX_COLORS.grey50,
    x0,
    y0,
    x1,
    y1,
  };
}

// mouse dragging

let mouseDragStartPos = null; /* { x: number, y: number } */

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

// draw

// https://p5js.org/reference/p5.Font/textBounds/

function handleNaN(n) {
  return isNaN(n) ? 0 : n;
}

async function setup() {
  // preload function deprecated in p5 2.0
  // https://dev.to/limzykenneth/asynchronous-p5js-20-458f
  const font = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function draw() {
  background(COLORS.grey90());

  // helper text
  if (textBoxes.length === 0) {
    push();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(height / 50);
    text("click and drag!\n('Thing' by Leonard Cohen)", width / 2, height / 2);
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
    scale(handleNaN(w / bounds.w), handleNaN(h / bounds.h)); // bugfix note: scale first before applying position adjustments; otherwise, they get scaled too

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("canvas", "png");
  }
}
