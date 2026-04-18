/*

Week 6
Randomness / Fragmentation

*/

document.title = "W6 - Randomness / Fragmentation";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

/*
Separate the image into rows and fragment them
*/

/**
 * the random flashing will be based on a modulo applied to frameCount
 * https://p5js.org/reference/p5/frameCount/
 */
const FRAME_RATE = 12;

/** @returns true at a random interval, relative to the constant FRAME_RATE */
// Adapted from the 'Glitch TV' sketch by Karen ann Donnachie and Andy Simionato
// https://github.com/Simandy/creativecoding_2026/blob/main/glitch_TV/glitch_TV.js
// probably not a good idea to couple this function to a constant but for brevity's sake !!
// and probably a better api would just be to take a single number, the % of framerates a flash can happen?
function isRandomModuloFlash(
  minModulo /* 0 to 1, a percent of the framerate */,
  maxModulo,
) {
  return (
    frameCount % int(random(FRAME_RATE * minModulo, FRAME_RATE * maxModulo)) ===
    0
  );
}

/**
 * for random image stretching
 * @param img p5.Image
 * @returns array [sample x, sample y, sample width, sample height]
 */
function getRandomImageSampleRect(img) {
  const sampleWidth = random(img.width);
  const sampleHeight = random(img.height);

  return [
    random(img.width - sampleWidth),
    random(img.height - sampleHeight),
    sampleWidth,
    sampleHeight,
  ];
}

/** @type {number[]} */ // today i learned!
const rowHeights = GLOBALS.getRandomUnitArray(40);

// Sketch

let sourceImg;
let textCanvas;

async function setup() {
  // photo by mojtaba mosayebzadeh on Unsplash
  // sourceImg = await loadImage("assets/img.jpg");

  // instead of an image, use our own text drawn on a buffer canvas
  const TEXT_STR = "rat";
  textCanvas = createGraphics(400, 200);
  const TEXT_SIZE = textCanvas.height * 1;
  textCanvas.textSize(TEXT_SIZE);
  textCanvas.textLeading(TEXT_SIZE * 0.85);

  // zoom out
  textCanvas.translate(textCanvas.width / 2, textCanvas.height / 2);
  textCanvas.scale(0.8);
  textCanvas.translate(-textCanvas.width / 2, -textCanvas.height / 2);

  // stretch the text to fill the buffer canvas
  // see Week 3 / Sketch 8
  textCanvas.textAlign(LEFT, TOP);
  const bounds = textCanvas.textBounds(TEXT_STR, 0, 0);
  textCanvas.scale(textCanvas.width / bounds.w, textCanvas.height / bounds.h);
  textCanvas.text(TEXT_STR, -bounds.x, -bounds.y);

  textCanvas.filter(textCanvas.BLUR, 1); // why isn't this working?
  sourceImg = textCanvas;

  createCanvas(windowWidth, windowHeight);
  frameRate(FRAME_RATE);
  // noLoop();
}

function draw() {
  background(COLORS.wasabi());

  // zoom out
  translate(width / 2, height / 2);
  scale(0.8);
  translate(-width / 2, -height / 2);

  // draw each fragment row
  let currentY = 0;
  let currentSampleY = 0;

  rowHeights.forEach((rowHeight) => {
    const actualRowHeight = height * rowHeight;
    const actualSampleRowHeight = sourceImg.height * rowHeight;

    let sampleRect = [
      0,
      currentSampleY,
      sourceImg.width,
      sourceImg.height * rowHeight,
    ];

    if (isRandomModuloFlash(0.5, 1)) {
      // just the horizontal properties
      const sampleWidth = random(sourceImg.width);
      ((sampleRect[0] = random(sourceImg.width - sampleWidth)), // sample x
        (sampleRect[2] = sampleWidth));
    }

    image(
      sourceImg,
      0,
      currentY,
      width,
      actualRowHeight,
      ...sampleRect, // why is adding this throwing an error?
    );

    currentY += actualRowHeight;
    currentSampleY += actualSampleRowHeight;
  });

  //  image(sourceImg, 0, 0, width, height);

  // filter(GRAY);
  filter(BLUR, 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
