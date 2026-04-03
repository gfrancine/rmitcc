/*

Week 5
Video / ASCII

*/

document.title = "W5 - Video / ASCII";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const CANVAS_W = 600;
const CANVAS_H = 600;

const BUFFER_W = 24;
const BUFFER_H = 24;

// Ascii charset
const CHARSET = " .:+#@".split("");

let video;
let lowResBuffer; // a low-res canvas to "pixelate" the video

async function setup() {
  createCanvas(CANVAS_W, CANVAS_H);

  // video taken from https://p5js.org/examples/imported-media-video-canvas/
  video = await createVideo([
    "../assets/fingers.webm",
    "../assets/fingers.mov",
  ]);
  video.loop();
  video.hide();

  // create a low-res canvas to load the video into
  // thank you Gemini 3 Fast
  // https://p5js.org/reference/p5/p5.Graphics/
  // https://openprocessing.org/sketch/2839027
  lowResBuffer = createGraphics(BUFFER_W, BUFFER_H);
  // apparently being on a mac / retina display causes the number of pixels to
  // be much greater and messes up the pixel array indexing
  // https://p5js.org/reference/p5/pixelDensity/
  lowResBuffer.pixelDensity(1);

  frameRate(10);
}

function draw() {
  background(0);
  lowResBuffer.image(video, 0, 0, lowResBuffer.width, lowResBuffer.height);

  const cellWidth = CANVAS_W / BUFFER_W;
  const cellHeight = CANVAS_H / BUFFER_H;

  lowResBuffer.loadPixels(); // prepare the buffer to have its pixel array read

  noStroke();

  textSize(cellHeight * 1);

  for (let y = 0; y < lowResBuffer.height; y++) {
    for (let x = 0; x < lowResBuffer.width; x++) {
      // find the start index of the pixel in the array
      // every pixel takes up 4 slots in an array
      // https://idmnyu.github.io/p5.js-image/index.html
      const index = (x + y * lowResBuffer.width) * 4;

      const r = lowResBuffer.pixels[index + 0];
      const g = lowResBuffer.pixels[index + 1];
      const b = lowResBuffer.pixels[index + 2];
      // const a = pixels[index+3];

      // https://gitlab.com/gfrancine/photoedit/-/blob/master/packages/core/filter-basics.tsx
      // https://glipdemo.netlify.app/
      const GAMMA = 0.8; // finetuned number just for this video
      const brightness = (r + g + b) / 3 ** GAMMA;
      const str =
        CHARSET[int(map(brightness, 0, 255, 0, CHARSET.length))] || CHARSET[0];

      /*
      fill(brightness);
      rect(
        x * cellWidth,
        y * cellHeight,
        cellWidth,cellHeight
      );
      */

      fill(255);
      text(str, x * cellWidth, y * cellHeight);
    }
  }

  // image(lowResBuffer, 0, 0, width, height);
}
