/*

Week 6
Glitchy Title

*/

document.title = "W6 - Glitchy Title";

/*
I'm helping design visuals for a short film. This is adapted from one of my
concepts for the title design and I used the same modulo flashing logic I 
learned this week :)
*/

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const CLR_BG = COLORS.grey50;
const CLR_FG = COLORS.black;
const FRAME_RATE = 12;

/** @returns true at a random interval, relative to the constant FRAME_RATE */
// Adapted from the 'Glitch TV' sketch by Karen ann Donnachie and Andy Simionato
// https://github.com/Simandy/creativecoding_2026/blob/main/glitch_TV/glitch_TV.js
// probably not a good idea to couple this function to a constant but for brevity's sake !!
function isRandomModuloFlash(
  minModulo /* 0 to 1, a percent of the framerate */,
  maxModulo,
) {
  return (
    frameCount % int(random(FRAME_RATE * minModulo, FRAME_RATE * maxModulo)) ===
    0
  );
}

let font; /* p5.Font;*/

async function setup() {
  font =
    // await loadFont(SHARED_PATH + "fonts/XanhMono-Italic.ttf");
    // await loadFont(SHARED_PATH + "fonts/Aileron-Bold.otf");
    await loadFont(SHARED_PATH + "fonts/arialnarrow_bold.ttf");
  createCanvas(windowWidth, windowHeight);
  frameRate(FRAME_RATE);
}

function draw() {
  // don't draw some frames
  if (isRandomModuloFlash(0.5, 1)) return;

  background(CLR_BG());

  // scale larger for recording
  translate(width / 2, height / 2);
  scale(2);
  translate(-width / 2, -height / 2);

  const smallestDimension = min(width, height);
  const TEXT_SIZE = smallestDimension * 0.2;

  textFont(font);
  fill(CLR_FG());
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE);
  textLeading(TEXT_SIZE * 0.65);

  // this only exists in p5.js v2
  const contours = font.textToContours("i feel\nsick", width / 2, height / 2, {
    sampleFactor: 1.2,
  });

  let pointCount = 0;
  const contourPoints /* { x: number; y: number }[] */ = [];
  const isGlitching = isRandomModuloFlash(0.2, 1);

  contours.forEach((points) => {
    points.forEach(() => {
      pointCount++;
    });
  });

  strokeWeight(smallestDimension * 0.0003);
  stroke(CLR_FG());
  noFill();

  // draw glitchy outline
  for (let i = 0; i < 1; i++) {
    beginShape();

    let i = 0;
    contours.forEach((points) => {
      beginContour();
      points.forEach((point) => {
        i++;

        const horizontalSkew = isGlitching ? random(0.002, 0.02) : 0.002;

        const extendGlitch =
          i % int(random(1, contourPoints.length * 0.1)) === 0;

        const x =
          point.x +
          random(-1, 1) * smallestDimension * horizontalSkew +
          (extendGlitch
            ? random(-1, 1) * smallestDimension * random(0.002, 0.02)
            : 0);

        const y =
          point.y +
          random(-1, 1) * smallestDimension * 0.005 +
          +(extendGlitch
            ? random(-1, 1) * smallestDimension * random(0.002, 0.02)
            : 0);

        vertex(x, y);
        contourPoints.push({ x, y });
      });
      endContour(CLOSE);
    });

    endShape();
  }

  // draw dots
  const dotLetters = "IneedSPACE".split("");

  contourPoints.forEach((point, i) => {
    const hasDot = i % int(random(1, contourPoints.length * 0.02)) === 0;

    const isRed = int(random(1, 10)) === 1;

    if (hasDot) {
      const dotSize = smallestDimension * 0.006;
      push();
      noStroke();

      fill(CLR_FG());
      if (isRed) fill(COLORS.red());
      rectMode(CENTER);
      square(point.x, point.y, dotSize);

      fill(CLR_BG());
      textSize(dotSize);
      textAlign(CENTER, CENTER);
      text(random(dotLetters), point.x, point.y);

      pop();
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(e) {
  if (e.key === "s") {
    saveCanvas("title", "png");
  }
}
