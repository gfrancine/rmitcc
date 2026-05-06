/*

Week 7
3D / Camera Movement

*/

document.title = "W7 - 3D / Camera Movement";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const FRAME_RATE = 30; // per second

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(FRAME_RATE);
}

function draw() {
  // https://beta.p5js.org/reference/p5/camera/
  const t = millis() / 1000;

  // camera panning left/right
  // const xPos = 400 * Math.sin(t);
  // camera (
  //   // camera position
  //   xPos,0, 1000,
  //   // point where the camera is looking.
  //   xPos,0, 0,
  // );

  // camera orbiting
  // zoom in & out
  const CAM_ORBIT_RADIUS =
    1000 -
    (Math.sin(t * 2 /* zoom in/out at twice the speed */) / 2 + 0.5) * 400;

  camera(
    // camera position
    Math.cos(t) * CAM_ORBIT_RADIUS,
    Math.sin(t) * CAM_ORBIT_RADIUS * 0.5,
    Math.sin(t) * CAM_ORBIT_RADIUS,
    // point where the camera is looking.
    0,
    0,
    0,
  );

  background(220);
  // noStroke();
  strokeWeight(0.1);

  push();
  fill(COLORS.magenta());
  ellipse(0, 0, 50, 50);
  pop();

  // lighting
  // https://beta.p5js.org/tutorials/lights-camera-materials/
  ambientLight(80); // "a soft kind of sunlight"
  directionalLight(
    // rgb color
    255,
    255,
    255,
    // direction
    // positive z -> towards you
    0.2,
    0.5,
    -1, // where is this light heading? is there a tool?
  );

  // 'ground' plane
  push();
  translate(0, 120, 0); // move things with translate  // push it down
  rotateX(HALF_PI);
  fill(COLORS.white());
  plane(500, 500);
  pop();

  // sphere
  push();
  fill(COLORS.white());
  translate(0, 120, 0);
  sphere(50);
  pop();

  // rotating cube
  push();
  translate(0, 0, 0);
  rotateY((HALF_PI * frameCount) / FRAME_RATE);
  rotateX((HALF_PI * frameCount) / FRAME_RATE);
  fill(COLORS.red());
  box(50, 50, 50);
  pop();

  // orbiting 'moon'
  push();
  const ORBIT_RADIUS = 120;
  fill(COLORS.white());
  // https://graphtoy.com/
  translate(
    // half revolution every second
    sin((frameCount / FRAME_RATE) * PI) * ORBIT_RADIUS,
    0,
    //  cos(frameCount / FRAME_RATE * PI) * ORBIT_RADIUS,
    cos((frameCount / FRAME_RATE) * PI) * ORBIT_RADIUS,
  );
  sphere(20);
  pop();

  // push(); pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("mycanvas", "jpg");
  }
}
