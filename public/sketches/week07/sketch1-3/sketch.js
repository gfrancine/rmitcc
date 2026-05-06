/*

Week 7
3D / Models

*/

document.title = "W7 - 3D / Models";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const FRAME_RATE = 30; // per second

// https://p5js.org/reference/p5/loadModel/
// https://p5js.org/examples/3d-geometries/
let shape; /* p5.Geometry */

async function setup() {
  shape = await loadModel("../assets/Suzanne.obj");

  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(FRAME_RATE);
}

function draw() {
  background(220);
  // noStroke();
  strokeWeight(0.1);

  // lighting
  // https://beta.p5js.org/tutorials/lights-camera-materials/
  ambientLight(0); // "a soft kind of sunlight"
  directionalLight(
    // rgb color
    255,
    255,
    255,
    // direction
    // positive z -> towards you
    -0.5,
    1,
    -0.5, // where is this light heading? is there a tool?
  );

  // 'ground' plane
  push();
  translate(0, 120, 0); // move things with translate  // push it down
  rotateX(HALF_PI);
  fill(COLORS.white());
  plane(500, 500);
  pop();

  // SHAPE
  push();
  scale(100);
  translate(0, 0, 0);
  rotateY(-(PI * frameCount) / FRAME_RATE);
  rotateX((PI * frameCount) / FRAME_RATE);
  normalMaterial();
  model(shape);
  pop();
  // push(); pop();

  orbitControl();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("mycanvas", "jpg");
  }
}
