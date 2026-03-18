/*

Week 3
Text Points / Indices

*/

document.title = "W3 - Text Points / Indices";

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

let t = 0;

function draw() {
  t += 1 / 80;
  const modifier = Math.abs(Math.sin(t));

  background(COLORS.grey50());

  const textStr = "COLOR";
  const textPos = [width / 2, height / 2];
  const smallestDimension = Math.min(width, height);

  textSize((width / textStr.length) * 1.8); // arbitrary number
  textAlign(CENTER, CENTER);
  textFont(font);

  /*
  // draw bounds
  const textBounds = font.textBounds(textStr, ...textPos);

  strokeWeight(1);
  fill(0, 0, 0, 0);
  rect(   textBounds.x ,    textBounds.y ,    textBounds.w ,    textBounds.h,  );
  */

  // draw points
  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: 0.05 + 0.05 * modifier,
    simplifyThreshold: 0,
  });

  fill(0, 0, 0);

  textPoints.forEach((p, i) => {
    let x = p.x;
    let y = p.y;

    const modifier = Math.sin((i / (textPoints.length - 1)) * PI);

    // finally, draw
    push();

    strokeWeight(0);

    // TODO: why does the path close weirdly?
    fill(0);
    /*
    if (i === 0) fill(0, 255, 0);
    else if (i === textPoints.length - 1) fill(255, 0, 0);
    else fill(255, 0, 0, 0);
    */

    rectMode(CENTER);
    fill(
      lerpColor(
        COLORS.lavenderBlue(),
        COLORS.pumpkin(),
        i / (textPoints.length - 1),
      ),
    );
    rect(x, y, width / 8, (smallestDimension / 100) * modifier);

    pop();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
