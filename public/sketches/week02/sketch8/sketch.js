/*

Week 2
Lerping / Sine Waves

*/

document.title = "Lerping / Sine Waves";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

let t = 0;

function draw() {
  // lerp based on a sine wave
  const div = 50; // the lower, the faster
  t += 1 / div;
  if (t === div) t = 0;
  const value = Math.abs(Math.sin(t));

  const color0 = color(255, 0, 255);
  const color1 = color(0, 0, 255);
  background(lerpColor(color0, color1, value));

  textSize(windowHeight / 10);
  textAlign(CENTER, CENTER);
  fill(lerpColor(color1, color0, value));
  text(
    `Sine waves!\n${Math.round(value * 10) / 10}`,
    windowWidth / 2,
    windowHeight / 2,
  );
}

// Events

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("mycanvas", "jpg");
  }
}
