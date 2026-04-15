/*

Week 2
Rows and Columns

*/

document.title = "W2 Rows and Columns";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(127);

  const rows = 10;
  const cols = 10;
  const targetSize = windowWidth / 20;
  const targetRotation = QUARTER_PI;

  const marginX = windowWidth / 10;
  const marginY = windowHeight / 10;
  const width = windowWidth - marginX * 2;
  const height = windowHeight - marginY * 2;
  const cellWidth = width / rows;
  const cellHeight = height / cols;

  for (let i = 1; i < rows + 1; i++) {
    const cellX = marginX + cellWidth * (i - 1); // top left

    for (let j = 1; j < cols + 1; j++) {
      const cellY = marginY + cellHeight * (j - 1);
      const value = (i / rows + j / cols) / 2; // 0 to 1

      push();
      // go from blue to magenta
      const magenta = color(255, 0, 255);
      const blue = color(0, 0, 255);
      noStroke();
      fill(lerpColor(blue, magenta, value));

      // origin starts  at the top left, so we need to do all this
      // set origin to the middle of the grid "cell"
      translate(cellX + cellWidth / 2, cellY + cellHeight / 2);
      rotate(value * targetRotation);

      // move back by half the drawn square size
      const squareSize = value * targetSize;
      square(-squareSize / 2, -squareSize / 2, squareSize);

      pop();

      /*
      // debug: show cells
      push();
      stroke(0, 255, 0);
      strokeWeight(2);
      rect(cellX, cellY, cellWidth, cellHeight);
      pop();
      */
    }
  }
}

// Events

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
