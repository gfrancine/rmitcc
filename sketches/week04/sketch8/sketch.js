/*

Week 4
Macrotypography / Parallax + Typing

*/

document.title = "W4 - Macrotypography / Parallax + Typing";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const floatingStrings = []; /* string[] */
let font1, font2;

class FloatingString {
  constructor(str) {
    this.sourceStr = str;
    this.progress = random(0, 1); // 0 to 1;
    this._currentStr = "";
    this.font = random([font1, font2]);
    this.color = random([COLORS.lightFuchsia, COLORS.black]);
    this.proximity = Math.random() ** 2; // 0 to 1; exponent so distant text is more common
    this.originPos = createVector(random(0, 1), random(0, 1)); // 0 to 1; as % of the canvas's width or height
  }

  update(dt) {
    // taken directly from sketch 7
    const TYPING_SPEED = (0.02 / 100) * 1000; // in % per milisecond

    let dProgress = TYPING_SPEED * dt; // delta progress

    // slow down on the spaces
    const currentIndex = Math.round(this.progress * this.sourceStr.length);
    if (this.sourceStr[currentIndex] === " ") {
      dProgress *= 0.1;
    }

    this.progress += dProgress;
    if (this.progress > 1) {
      // reset back to 0 when completed
      this.progress = 0;
    }

    this._currentStr = this.sourceStr.slice(0, currentIndex);
  }

  draw() {
    push();

    fill(this.color());
    textFont(this.font);
    textAlign(CENTER, CENTER);

    const TEXT_SIZE_RANGE = [12, 64];
    const calculatedTextSize =
      TEXT_SIZE_RANGE[0] +
      this.proximity * (TEXT_SIZE_RANGE[1] - TEXT_SIZE_RANGE[0]);
    textSize(calculatedTextSize);
    textLeading(calculatedTextSize * 1);
    const textBoxWidth = calculatedTextSize * 10;

    const mouseOffsetFromCenter = createVector(mouseX / width, mouseY / height) // // 0 to 1
      .sub(0.5, 0.5)
      .mult(2); // center position, -1 to 1

    const MOVE_FACTOR = width * 0.5; // arbitrary

    const calculatedPos = createVector(
      this.originPos.x * width,
      this.originPos.y * height,
    ).add(mouseOffsetFromCenter.mult(this.proximity * MOVE_FACTOR)); // parallax

    text(this._currentStr, calculatedPos.x, calculatedPos.y, textBoxWidth) +
      "_";

    pop();
  }
}

async function setup() {
  font1 = await loadFont(SHARED_PATH + "fonts/TINY5x3-200.otf");
  font2 = await loadFont(SHARED_PATH + "fonts/TINY5x3-40.otf");

  // what if we use the source code?
  await loadStrings("sketch.js").then((lines) =>
    lines.forEach((line) => {
      if (line.trim().length <= 2) return;
      floatingStrings.push(new FloatingString(line));
    }),
  );

  createCanvas(windowWidth, windowHeight);
}

let t = 0;
function draw() {
  t += deltaTime / 1000;
  background(COLORS.grey90());

  if (width < height) isDesktop = false;

  // https://p5js.org/reference/p5/image/

  floatingStrings.forEach((floatingStr) => {
    // floatingStr.update(t);
    floatingStr.update(deltaTime / 1000);
    floatingStr.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
