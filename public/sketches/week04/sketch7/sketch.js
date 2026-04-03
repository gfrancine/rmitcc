/*

Week 4
Macrotypography / Typing

*/

document.title = "W4 - Macrotypography / Typing";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let bodyFont;
let contentStr; /* string */
let textBox; /*TypingTextBox */

class TypingTextBox {
  constructor(sourceStr) {
    this.sourceStr = sourceStr;
    this.progress = 0; // 0 to 1;
    this._currentStr = "";
  }

  update(dt) {
    const TYPING_SPEED = (0.002 / 100) * 1000; // in % per milisecond

    let dProgress = TYPING_SPEED * dt; // delta progress

    // slow down on the spaces
    const currentIndex = Math.round(this.progress * this.sourceStr.length);
    if (this.sourceStr[currentIndex] === " ") {
      dProgress *= 0.3;
    }

    this.progress += dProgress;
    if (this.progress > 1) {
      // reset back to 0 when completed
      this.progress = 0;
    }

    this._currentStr = this.sourceStr.slice(0, currentIndex) + "|";
  }

  draw() {
    const smallestDimension = min(width, height);
    const fontSize = smallestDimension * 0.03;

    const textBoxDimensions = createVector(width * 0.8, height * 0.8);
    textFont(bodyFont);
    textAlign(CENTER, CENTER);
    textSize(fontSize);
    text(
      this._currentStr,
      width / 2 - textBoxDimensions.x / 2,
      height / 2 - textBoxDimensions.y / 2,
      textBoxDimensions.x,
      textBoxDimensions.y,
    );
  }
}

async function setup() {
  bodyFont = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  contentStr = await loadStrings("assets/mitlicense.txt").then((lines) =>
    lines.join(" "),
  );
  textBox = new TypingTextBox(contentStr);

  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  textBox.update(deltaTime / 1000);
  textBox.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
