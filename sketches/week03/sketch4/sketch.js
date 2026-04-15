/*

Week 3
Text Points

*/

document.title = "W3 - Text Points";

const SHARED_PATH = "../../../shared/";

let font;

// https://p5js.org/reference/p5.Font/textToPoints/
// https://p5js.org/reference/p5.Font/textBounds/

async function setup() {
  // preload function deprecated in p5 2.0
  // https://dev.to/limzykenneth/asynchronous-p5js-20-458f
  font = await loadFont(SHARED_PATH + "fonts/Aileron-Bold.otf");
  createCanvas(windowWidth, windowHeight);
  // rectMode(CENTER); // https://p5js.org/reference/p5/rectMode/
}

function draw() {
  background(220);

  const textStr = "hello p5!";
  const textPos = [width / 2, height / 2];

  textSize((width / textStr.length) * 1.8); // arbitrary number
  textAlign(CENTER, CENTER);

  fill(128);
  textFont(font);
  text(textStr, ...textPos);

  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: 0.05,
    simplifyThreshold: 0,
  });

  const textBounds = font.textBounds(textStr, ...textPos);

  strokeWeight(1);
  fill(0, 0, 0, 0);

  rect(textBounds.x, textBounds.y, textBounds.w, textBounds.h);
  textPoints.forEach((p, i) => {
    //point(p.x, p.y);

    ellipse(p.x, p.y, width / 120);

    const nextP = textPoints[i + 1];
    if (nextP) {
      line(p.x, p.y, nextP.x, nextP.y);
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
