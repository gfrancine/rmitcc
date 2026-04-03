/*

Week 5
Images / Cursors

*/

document.title = "W5 - Images / Cursors";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let cursorImages; /* { [str]: p5.Image } */
let boxes; /* Box[] */

class Box {
  constructor(id, color, x, y, w, h) {
    this.id = id;
    this.color = color; /* () => p5.Color */
    this.bounds = { x, y, w, h };
  }

  isWithin(x, y) {
    // remember we're using the center rect mode for the boxes
    return (
      x >= this.bounds.x - this.bounds.w / 2 &&
      x <= this.bounds.x + this.bounds.w / 2 &&
      y >= this.bounds.y - this.bounds.h / 2 &&
      y <= this.bounds.y + this.bounds.h / 2
    );
  }

  draw() {
    const { x, y, w, h } = this.bounds;

    push();

    rectMode(CENTER);
    fill(this.color());
    rect(x, y, w, h);

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(h * 0.1);
    text(this.id, x, y);

    pop();
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);

  cursorImages = {
    garlicCracker: await loadImage("assets/bayercracker.png"),
    biscuit: await loadImage("assets/biscuit.jpg"),
    thins: await loadImage("assets/thins.jpg"),
  };

  const boxData = [
    // id, color
    ["garlicCracker", COLORS.green],
    ["biscuit", COLORS.lavenderBlue],
    ["thins", COLORS.grey50],
  ];

  const boxSize = width * 0.2;

  boxes = boxData.map(
    ([id, color], i) =>
      new Box(
        id,
        color,
        (width / (boxData.length + 1)) * (i + 1),
        height / 2,
        boxSize,
        boxSize,
      ),
  );

  // noLoop();
}

function draw() {
  background(0);

  let cursorImg = null;

  boxes.forEach((box) => {
    box.draw();
    if (box.isWithin(mouseX, mouseY)) cursorImg = cursorImages[box.id];
  });

  push();
  imageMode(CENTER);

  if (cursorImg) {
    const smallestDimension = min(width, height);

    image(
      cursorImg,
      mouseX,
      mouseY,
      smallestDimension * 0.2,
      smallestDimension * 0.2,
    );
  }
  pop();
}

/* not in the mood to use responsive unit positions sorry
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
*/
