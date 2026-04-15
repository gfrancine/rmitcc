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
  t += (deltaTime / 1000) * 1.3; // arbitrary number
  const modifier = GLOBALS.steepSine(t, 4) / 2 + 0.5; // 0 to 1;

  background(220);

  const textStr = "S";
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
  fill(COLORS.none());
  rect(
    textBounds.x - stretchX / 2,
    textBounds.y - stretchY / 2,
    textBounds.w + stretchX,
    textBounds.h + stretchY,
  );

  // draw points

  const sfScaleFactor = 762 / smallestDimension; // width of my vscode preview window when I finetuned the sample factors

  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: (0.01 + 0.03 * (1 - modifier)) * sfScaleFactor, // 0.03 * sfScaleFactor,
    simplifyThreshold: 0, //0.001,
  });

  const drawPointsCallbacks = []; // draw the circles after drawing the shape

  fill(COLORS.lavenderBlue());
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
      x += (smallestDimension / 2.5) * modifier * randUnitX;
      y += (smallestDimension / 2.5) * modifier * randUnitY;
    }

    // finally, add a point
    vertex(x, y);

    drawPointsCallbacks.push(() => {
      push();
      strokeWeight(1);

      // TODO: why does the path close weirdly?
      // fill(255);
      if (i === 0)
        fill(COLORS.red()); // first point
      else if (i === textPoints.length - 1)
        fill(COLORS.green()); // last point
      else fill(COLORS.white());

      ellipse(x, y, smallestDimension / 80);
      pop();
    });
  });

  endShape(CLOSE);

  drawPointsCallbacks.forEach((c) => c());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
