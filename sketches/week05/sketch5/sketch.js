/*

Week 5
Camera Mosaic

*/

document.title = "W5 - Camera Mosaic";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

// get an array of random numbers that sum up to 1
function getUnitArray(length, min = 0, max = 1) {
  const array = [];

  let sum = 0;
  for (let i = 0; i < length; i++) {
    const v = random(min, max);
    array.push(v);
    sum += v;
  }

  return array.map((v) => v / sum);
}

// a calculation utility class
class UnevenGrid {
  constructor(nCols, nRows) {
    this.nCols = nCols;
    this.nRows = nRows;
    this.colWidths = getUnitArray(nCols, 0, 3);
    this.rowHeights = getUnitArray(nRows, 0, 3);
  }

  calculateCellBounds(colIndex, rowIndex, gridX, gridY, gridWidth, gridHeight) {
    const w = this.colWidths[colIndex] * gridWidth;
    const h = this.rowHeights[rowIndex] * gridHeight;

    let x = gridX;
    for (let i = 0; i < colIndex; i++) {
      x += this.colWidths[i] * gridWidth;
    }

    let y = gridY;
    for (let i = 0; i < rowIndex; i++) {
      y += this.rowHeights[i] * gridHeight;
    }

    return { x, y, w, h };
  }

  forEachCell(callback) {
    for (let i = 0; i < this.nCols; i++) {
      for (let j = 0; j < this.nRows; j++) {
        callback(i, j);
      }
    }
  }
}

// let's draw text in a circle
class Letter {
  constructor(str, progress) {
    this.str = str;
    this.progress = progress; // progress in the circumference of a circle
    // this.x = Math.random();
    // this.y = Math.random();
  }

  draw() {
    push();
    translate(width / 2, height / 2);

    const smallestDimension = min(width, height);
    const rectSize = smallestDimension * 0.1;

    const circleSize = smallestDimension * 0.8;
    const x = -(Math.sin((this.progress + 0.3) * PI * 2) * circleSize) / 2;
    const y = (Math.cos((this.progress + 0.3) * PI * 2) * circleSize) / 2;

    fill(0);
    rectMode(CENTER);
    square(x, y, rectSize);

    fill(255);
    textSize(0.8 * rectSize);
    textAlign(CENTER, CENTER);
    text(this.str, x, y);
    pop();
  }
}

const CAPTURE_W = 360;
const CAPTURE_H = 200;

let capture; // p5.Capture
let grid; // UnevenGrid; mosaic grid data
// partner each mosaic grid cell with another random cell to sample the video capture from
let sourceCellMap /* int number[][] */ = []; // [row][column]

const TEXT_STR = "CAMERAMOSAIC!";
const letters = TEXT_STR.split("").map(
  (letter, i) => new Letter(letter, i / TEXT_STR.length),
); // some on-screen text

async function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = new UnevenGrid(6, 6);

  // initialize source cell map
  for (let i = 0; i < grid.nCols; i++) {
    const mapRow = [];
    for (let j = 0; j < grid.nRows; j++) {
      const sourceColI = Math.round(random(0, grid.nCols - 1));
      const sourceRowI = Math.round(random(0, grid.nRows - 1));
      mapRow.push([sourceColI, sourceRowI]);
    }
    sourceCellMap[i] = mapRow;
  }

  // /*
  capture = createCapture(VIDEO);
  capture.size(CAPTURE_W, CAPTURE_H);
  capture.hide();
  // */

  frameRate(10);
  // noLoop();
}

function draw() {
  background(0);

  grid.forEachCell((x, y) => {
    const destCell = grid.calculateCellBounds(x, y, 0, 0, width, height);
    const sourceCellIndices = sourceCellMap[x][y]; //[x,y]
    const sourceCell = grid.calculateCellBounds(
      sourceCellIndices[0],
      sourceCellIndices[1],
      // map cell dimensions to the capture's width + height instead of the canvas
      0,
      0,
      CAPTURE_W,
      CAPTURE_H,
    );

    // for debugging
    rect(destCell.x, destCell.y, destCell.w, destCell.h);

    strokeWeight(0);
    image(
      capture,
      destCell.x,
      destCell.y,
      destCell.w,
      destCell.h,
      sourceCell.x,
      sourceCell.y,
      sourceCell.w,
      sourceCell.h,
    );
  });

  letters.forEach((letter) => letter.draw());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
