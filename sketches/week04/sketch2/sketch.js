/*

Week 4
Macrotypography / Load Strings

*/

document.title = "W4 - Macrotypography / Load Strings";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let loadedText; /* string[] */
let bodyFont;

async function setup() {
  bodyFont = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  loadedText = await loadStrings("assets/text.txt");
  createCanvas(windowWidth, windowHeight);

  noLoop();
}

function draw() {
  background(COLORS.grey90());

  const smallestDimension = Math.min(width, height);
  if (width < height) isDesktop = false;

  // https://p5js.org/reference/p5/image/

  textFont(bodyFont);
  textSize(smallestDimension * 0.018);
  textAlign(CENTER, CENTER);
  fill(0);
  //    fill(COLORS.lightFuchsia());

  loadedText.forEach((content) => {
    // textSize(random(smallestDimension * 0.01, smallestDimension * 0.2));
    textAlign(random([LEFT, CENTER, RIGHT]));
    textSize(random([12, 12, 12, 12, 12, 12, 18, 24, 28, 36, 48, 56, 64, 72]));
    text(content, random(0, width), random(0, height));
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
