/*

Week  4
Macrotypography / Grids

*/

document.title = "W4 - Macrotypography / Grids";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let bodyFont;
let crackerImg;

// a html-like multi-span grid system

class GridCell {
  constructor(rowSpan, colSpan) {
    this.type = random([1, 2, 2, 3]);
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
  }

  update(t) {} // ooh what can we do here??

  draw(x, y, w, h) {
    push();
    beginClip();
    rect(x, y, w, h);
    endClip();

    switch (this.type) {
      // big pink
      // todo: stretch type
      case 1: {
        strokeWeight(0);

        fill(COLORS.lightFuchsia());
        rect(x, y, w, h);

        fill(COLORS.black());
        textSize(24);
        text("01", x, y, w, h); // todo:  stretch type
        break;
      }
      // dense body text
      case 2: {
        strokeWeight(0);
        fill(COLORS.brass());
        rect(x, y, w, h);

        textAlign(LEFT, TOP);
        fill(COLORS.black());
        text(
          "sadfadsf sdfa s sffsa ddf fasd fdsa fds fasd fadf da fsdf dsa fasdfdsf asdfdadffa adf adsf asd dfsf ".repeat(
            100,
          ),
          x,
          y,
          w,
          h,
        );
        break;
      }
      // image
      case 3: {
        fill(COLORS.white());
        image(crackerImg, x, y, w, h);
        break;
      }
    }

    pop();
  }
}

class Grid {
  constructor(w, h, nRows = 1, nCols = 1, maxRowSpan = 1, maxColSpan = 1) {
    this.size = createVector(w, h); // unit vec2, 0 to 1; % of smallest canvas dimension
    this.nRows = nRows; // constant?
    this.nCols = nCols;
    this.rows /* GridCell | null [][] */ = []; // structured like a html table

    // for keeping track of which cells are occupied based on rowSpan or colSpan
    const nullCells = [];

    for (let i = 0; i < nRows; i++) {
      nullCells[i] = new Array(nCols);
      //nullCells.push(new Array(nCols));
      this.rows[i] = new Array(nCols).fill(null);
    }

    for (let i = 0; i < nRows; i++) {
      for (let j = 0; j < nCols; j++) {
        if (nullCells[i][j] !== null) {
          // TODO: use an integer random array instead; getting a 1 is rare
          let rowSpan = min(nRows, i + Math.round(random(0.5, maxRowSpan))) - i;
          let colSpan = min(nCols, j + Math.round(random(0.5, maxColSpan))) - j;

          // check if the columns beside are occupied; and if so, resize it
          for (let k = colSpan; k > 1; k--) {
            let reduceOneCol = false;

            for (let f = 0; f < rowSpan; f++) {
              if (nullCells[i + f][j + k] === null) {
                reduceOneCol = true;
                break;
              }
            }

            if (reduceOneCol) colSpan--;
          }

          const cell = new GridCell(rowSpan, colSpan);

          // mark the cells as occupied
          for (let k = 0; k < rowSpan; k++) {
            for (let f = 0; f < colSpan; f++) {
              nullCells[i + k][j + f] = null;
            }
          }

          this.rows[i][j] = cell;
        }
      }
    }
  }

  update(t) {
    this.rows.forEach((row) => {
      row.forEach((cellOrNull) => {
        if (cellOrNull !== null) {
          const cell = cellOrNull;
          cell.update(t);
        }
      });
    });
  }

  draw() {
    const smallestDimension = min(width, height);
    const calcdGridSize = p5.Vector.mult(this.size, smallestDimension);
    const calcdGridPos = createVector(
      width / 2 - calcdGridSize.x / 2,
      height / 2 - calcdGridSize.y / 2,
    );

    const cellHeight = calcdGridSize.y / this.nRows;
    const cellWidth = calcdGridSize.x / this.nCols;

    this.rows.forEach((row, i) => {
      row.forEach((cellOrNull, j) => {
        if (cellOrNull !== null) {
          const cell = cellOrNull;
          cell.draw(
            calcdGridPos.x + cellWidth * j,
            calcdGridPos.y + cellHeight * i,
            cellWidth * cell.colSpan,
            cellHeight * cell.rowSpan,
          );
        }
      });
    });
  }
}

let grid;

async function setup() {
  bodyFont = await loadFont(SHARED_PATH + "fonts/TINY5x3-40.otf");
  crackerImg = await loadImage("assets/bayercracker.png");
  textFont(bodyFont);

  grid = new Grid(0.6, 0.8, 12, 12, 6, 6);

  createCanvas(windowWidth, windowHeight);

  noLoop();
}

function draw() {
  background(220);

  grid.update();
  grid.draw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
