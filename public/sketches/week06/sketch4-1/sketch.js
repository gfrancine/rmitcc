/*

Week 6
Perlin Noise / ADGIDW25 Identity

*/

document.title = "W6 - Perlin Noise / ADGIDW25 Identity";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

/*
Last year I got to attend ADGI Design Week 2025 on my visit back to Jakarta. I
loved its identity too much and may have stared at it a little too long. Maybe
it's even the reason why I chose the courses I did this semester?
https://www.instagram.com/p/DRWm6JSDyup/?img_index=1
*/

const GRID_W = 40;
const GRID_H = 40;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // frameRate(8);
  // noLoop();

  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textWeight(900);
}

let t = 0;
function draw() {
  t += deltaTime / 1000;

  background(220, 0, 0);

  // https://p5js.org/reference/p5/noiseDetail/
  noiseDetail(
    6, // "octaves"
    0.3, // falloff
  );

  const noiseScale = 0.3;

  const timeOffset = t * 0.5;

  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      noStroke();

      let value = noise(x * noiseScale + timeOffset, y * noiseScale); // 0 to 1
      value = map(value, 0.1, 0.65, 0, 1); // apply a 'levels' adjustment

      const index = (y + 1) * (x + 1);

      const cellWidth = width / GRID_W;
      const cellHeight = height / GRID_H;
      const cellX = x * cellWidth + cellWidth / 2;
      const cellY = y * cellHeight + cellHeight / 2;

      if (value > 0.75) {
      } else if (value > 0.5) {
        fill(0);
        rect(cellX, cellY, cellWidth * 0.8, cellHeight * 0.95);
      } else if (value > 0.25) {
        fill(COLORS.grey50());
        rect(cellX, cellY, cellWidth * 0.95, cellHeight * 0.8);
      } else {
        fill(COLORS.white());
        circle(cellX, cellY, min(cellWidth, cellHeight));
      }

      const str =
        index % 4 === 0
          ? "A"
          : index % 3 === 0
            ? "D"
            : index % 2 === 0
              ? "G"
              : "I";

      fill(220, 0, 0);
      textSize(min(cellWidth, cellHeight) * 0.8);
      text(str, cellX, cellY);

      // debug
      // fill(value * 255);
      // rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }

  // image(lowResBuffer, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
