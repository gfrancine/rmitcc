/*

Week 3
Text Points / Social Distancing

*/

document.title = "W3 - Text Points / Social Distancing";

const SHARED_PATH = "../../../shared/";

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

function draw() {
  const smallestDimension = Math.min(width, height);

  background(220);

  const textStr = "covid";
  const textPos = [width / 2, height / 2];

  textSize((width / textStr.length) * 1.8); // arbitrary number
  textAlign(CENTER, CENTER);

  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: 0.05,
    simplifyThreshold: 0,
  });

  strokeWeight(1);
  fill(0, 0, 0, 0);

  const DOT_ACTIV_RADIUS = smallestDimension / 10; // the radius around a mouse that the dots will be affected
  const DOT_OFFSET_MUL = smallestDimension / 30; // how far a dot will move when affected, ie. multiplied by distance from mouse to dot

  textPoints.forEach((p, _i) => {
    const toMouseVector = createVector(p.x, p.y).sub(mouseX, mouseY);
    const toMouseDistance = toMouseVector.mag();

    let offsetX = 0;
    let offsetY = 0;

    if (toMouseDistance < DOT_ACTIV_RADIUS) {
      const directionVector = toMouseVector.div(toMouseDistance); // unit vector
      offsetX = directionVector.x * DOT_OFFSET_MUL;
      offsetY = directionVector.y * DOT_OFFSET_MUL;
    }

    ellipse(p.x + offsetX, p.y + offsetY, width / 100);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
