/*

Week 4
Macrotypography / Parallax

*/

document.title = "W4 - Macrotypography / Parallax";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const floatingStrings = []; /* string[] */
let font1, font2;

class FloatingString {
  constructor(str) {
    this.str = str;
    this.font = random([font1, font2]);
    this.proximity = Math.random() ** 2; // 0 to 1; exponent so distant text is more common
    this.alignment = random([LEFT, CENTER, RIGHT]);
    this.originPos = createVector(Math.random(), Math.random()); // 0 to 1; as % of the canvas's width or height
  }

  // update(t) {}

  draw() {
    push();

    textFont(this.font);
    textAlign(this.alignment, CENTER);

    const TEXT_SIZE_RANGE = [12, 64];
    const calculatedTextSize =
      TEXT_SIZE_RANGE[0] +
      this.proximity * (TEXT_SIZE_RANGE[1] - TEXT_SIZE_RANGE[0]);
    textSize(calculatedTextSize);
    textLeading(calculatedTextSize * 1);
    const textBoxWidth = calculatedTextSize * 10;

    const mouseOffsetFromCenter = createVector(mouseX / width, mouseY / height) // // 0 to 1
      .sub(0.5, 0.5)
      .mult(2); // center position, again, in unit

    const MOVE_FACTOR = width * 0.5; // arbitrary

    const calculatedPos = createVector(
      this.originPos.x * width,
      this.originPos.y * height,
    ).add(mouseOffsetFromCenter.mult(this.proximity * MOVE_FACTOR)); // parallax

    text(this.str, calculatedPos.x, calculatedPos.y, textBoxWidth);

    pop();
  }
}

async function setup() {
  font1 = await loadFont(SHARED_PATH + "fonts/TINY5x3-200.otf");
  font2 = await loadFont(SHARED_PATH + "fonts/TINY5x3-40.otf");

  await loadStrings("assets/text.txt").then((lines) =>
    lines.forEach((line) => {
      floatingStrings.push(new FloatingString(line));
    }),
  );

  createCanvas(windowWidth, windowHeight);
}

let t = 0;
function draw() {
  t += deltaTime / 1000;
  background(COLORS.grey90());

  const smallestDimension = Math.min(width, height);
  if (width < height) isDesktop = false;

  // https://p5js.org/reference/p5/image/

  floatingStrings.forEach((floatingStr) => {
    // floatingStr.update(t);
    floatingStr.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
