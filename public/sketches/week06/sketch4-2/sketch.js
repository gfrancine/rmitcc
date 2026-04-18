/*

Week 6
Perlin Noise + Glitching

*/

document.title = "W6 - Perlin Noise + Glitching";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const GRID_W = 40;
const GRID_H = 40;

function getRandomColorScheme() {
  // shuffle
  const colors = [
    COLORS.grey50,
    COLORS.black,
    COLORS.white,
    () => color(220, 0, 0),
  ].sort(() => Math.random() - 0.5);

  return {
    bg: colors[0],
    fg1: colors[1],
    fg2: colors[2],
    fg3: colors[3],
  };
}

let currentColorScheme = getRandomColorScheme();

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

  // modulo glitching again!
  if (frameCount % int(random(20, 60)) === 0) {
    currentColorScheme = getRandomColorScheme();
  }

  if (frameCount % int(random(20, 60)) === 0) {
    t += random(-50, 50);
  }

  const { bg, fg1, fg2, fg3 } = currentColorScheme;

  background(bg());

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

      const cellWidth = width / GRID_W;
      const cellHeight = height / GRID_H;
      const cellX = x * cellWidth + cellWidth / 2;
      const cellY = y * cellHeight + cellHeight / 2;

      if (value > 0.75) {
      } else if (value > 0.5) {
        fill(fg1());
        // "tools determine the kind of happy accidents you run into."
        // today I typed in "9.5" instead of ".95"
        rect(cellX, cellY, cellWidth * 0.8, cellHeight * 9.5);
      } else if (value > 0.25) {
        fill(fg2());
        rect(cellX, cellY, cellWidth * 0.95, cellHeight * 0.8);
      } else {
        fill(fg3());
        circle(cellX, cellY, min(cellWidth, cellHeight) * 1);
      }

      const index = (y + 1) * (x + 1);

      const str =
        index % 4 === 0
          ? "A"
          : index % 3 === 0
            ? "D"
            : index % 2 === 0
              ? "G"
              : "I";

      fill(bg());
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
