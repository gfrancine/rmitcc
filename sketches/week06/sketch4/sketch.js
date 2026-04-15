/*

Week 6
Perlin Noise

*/

document.title = "W6 - Perlin Noise";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const GRID_W = 40;
const GRID_H = 40;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  // frameRate(8);
  // noLoop();
}

let t = 0;
function draw() {
  t += deltaTime / 1000;

  const cellWidth = width / GRID_W;
  const cellHeight = height / GRID_H;

  // https://p5js.org/reference/p5/noiseDetail/
  noiseDetail(
    6, // "octaves"
    0.4, // falloff
  );

  const noiseScale = 0.18;

  const timeOffset = t * 0.5;

  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      noStroke();
      const value = noise(x * noiseScale + timeOffset, y * noiseScale); // 0 to 1
      fill(lerpColor(COLORS.white(), COLORS.black(), value));
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }

  // image(lowResBuffer, 0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
