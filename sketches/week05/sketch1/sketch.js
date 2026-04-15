/*

Week 5
Images

*/

document.title = "W5 - Images";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let bgImage;
let smallImage;

async function setup() {
  // await loadImage(SHARED_PATH + "images/w6-collage/");
  bgImage = await loadImage(SHARED_PATH + "images/phoebe.jpg");
  smallImage = await loadImage(SHARED_PATH + "images/bayercracker.png");
  createCanvas(windowWidth, windowHeight);
  frameRate(25);
  // noLoop();

  background(0);

  // moved image() to here so we can draw with the cursor
  // https://p5js.org/reference/p5/image/
  // /*
  image(
    bgImage,
    // destination rect
    // destination position
    0,
    0,
    // destination width/height
    width,
    height,
    // sample/source rect
    // sample start position
    0,
    0,
    // sample width/height
    bgImage.width,
    bgImage.height,
    // fit, CONTAIN | COVER
    COVER,
  );
  // */

  /*
  // without imageMode
  // image(bgImage, width/2 - bgImage.width/2, height/2 - bgImage.height/2);
  // with imageMode
  imageMode(CENTER);
  image(bgImage, mouseX, mouseY);
  // image(bgImage, width/2, height/2);
  */
}

function draw() {
  // cursor
  push();
  imageMode(CENTER);
  image(
    smallImage,
    mouseX,
    mouseY,
    smallImage.width * 0.15,
    smallImage.height * 0.15,
  );
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
