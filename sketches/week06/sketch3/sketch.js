/*

Week 6
Randomness / Glitch

*/

document.title = "W6 - Randomness / Glitch";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

/*
A breakdown of all the glitching "effects":
- get the background image to stretch randomly
- get fragments of the image to flash around randomly
- apply an invert filter randomly
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

// Sketch

let sourceImg;

async function setup() {
  // photo by mojtaba mosayebzadeh on Unsplash
  sourceImg = await loadImage("assets/img.jpg");

  createCanvas(windowWidth, windowHeight);
  frameRate(FRAME_RATE);
  // noLoop();

  imageMode(CENTER);
}

function draw() {
  const centerX = width / 2;
  const centerY = height / 2;

  // stretch background image
  if (isRandomModuloFlash(0.01, 1)) {
    const sampleRect = getRandomImageSampleRect(sourceImg);
    image(sourceImg, centerX, centerY, width, height, ...sampleRect);
  } else {
    image(sourceImg, centerX, centerY, width, height); // draw it normally
  }

  // invert
  if (isRandomModuloFlash(0.5, 2)) {
    filter(INVERT);
  }

  // random fragments of the image
  for (let i = 0; i < 5; i++) {
    if (isRandomModuloFlash(0.01, 1.5)) {
      image(
        sourceImg,
        // destination rect
        random(width),
        random(height),
        random(width),
        random(height),
        // sample rect
        // note: sample rect args are unaffected by image mode
        ...getRandomImageSampleRect(sourceImg),
      );
    }
  }

  // what else?

  filter(GRAY);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
