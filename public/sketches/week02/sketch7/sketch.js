/*

Week 2
Color Lerping

*/

document.title = "Color Lerping";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // lerp based on mouseX
  const value = mouseX / windowWidth;

  const color0 = color(255, 0, 255);
  const color1 = color(0, 0, 255);
  background(lerpColor(color0, color1, value));

  textSize(windowHeight / 10);
  textAlign(CENTER, CENTER);
  fill(lerpColor(color1, color0, value));
  text("lerping!", windowWidth / 2, windowHeight / 2);
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
