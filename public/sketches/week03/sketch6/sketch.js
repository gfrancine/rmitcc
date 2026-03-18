/*

Week 3
Text Points / Glyphs

*/

document.title = "W3 - Text Points / Glyphs";

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
}

// random number lookup arrays that stay constant instead of calling Math.random() every frame
// used for the random point offset

function getRandomLookup(length) {
  const lookup = new Array(length);
  lookup.fill(1);
  return lookup.map((v) => Math.max(v * Math.random(), 0)); // 0 to 1
}

const RAND_X = getRandomLookup(1000);
const RAND_Y = getRandomLookup(1000);

let t = 0;

function draw() {
  t += 1 / 50;
  const modifier = Math.sin(t) / 2 + 0.5; // 0 to 1;

  background(220);

  const textStr = "B";
  const textPos = [width / 2, height / 2];
  const smallestDimension = Math.min(width, height);

  const stretchX = (smallestDimension / 2) * modifier;
  const stretchY = 0;

  textSize(smallestDimension * 1); // arbitrary number
  textAlign(CENTER, CENTER);
  textFont(font);

  // draw bounds
  const textBounds = font.textBounds(textStr, ...textPos);

  strokeWeight(1);
  fill(0, 0, 0, 0);
  rect(
    textBounds.x - stretchX / 2,
    textBounds.y - stretchY / 2,
    textBounds.w + stretchX,
    textBounds.h + stretchY,
  );

  // draw points
  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: 0.01 + 0.03 * (1 - modifier),
    simplifyThreshold: 0,
  });

  fill(0, 0, 0);
  beginShape();

  textPoints.forEach((p, i) => {
    let x = p.x;
    let y = p.y;

    // stretch the points
    const fromCenterX = x - width / 2;
    const fromCenterY = y - height / 2;
    x += (fromCenterX / (width / 2)) * stretchX;
    y += (fromCenterY / (height / 2)) * stretchY;

    // random point offset
    if (i % 2 === 0) {
      const randUnitX = (RAND_X[i] - 0.5) * 2; // rand lookup ranges from 0 to 1; change to -1 to 1
      const randUnitY = (RAND_Y[i] - 0.5) * 2;
      x += (smallestDimension / 5.5) * modifier * randUnitX;
      y += (smallestDimension / 5.5) * modifier * randUnitY;
    }

    // finally, draw
    vertex(x, y);

    push();
    strokeWeight(1);

    // TODO: why does the path close weirdly?
    // fill(255);
    if (i === 0) fill(0, 255, 0);
    else if (i === textPoints.length - 1) fill(255, 0, 0);
    else fill(255, 0, 0, 0);

    ellipse(x, y, smallestDimension / 80);
    pop();
  });

  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
