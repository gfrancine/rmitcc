/*

Week 7
3D / Texture + Materials

*/

document.title = "W7 - 3D / Texture + Materials";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const FRAME_RATE = 30; // per second

// https://p5js.org/reference/p5/loadModel/
// https://p5js.org/examples/3d-geometries/
let shape; /* p5.Geometry */
let messageTexture; /* p5.frameBugffer */
let video; // we're going to use a video as a texture

async function setup() {
  shape = await loadModel("../assets/Suzanne.obj");

  video = await createVideo([
    "../assets/fingers.webm",
    "../assets/fingers.mov",
  ]);
  video.hide();

  createCanvas(windowWidth, windowHeight, WEBGL);
  frameRate(FRAME_RATE);

  // background text
  messageTexture = createGraphics(400, 200);
  messageTexture.fill(0);
  messageTexture.textAlign(CENTER, TOP);
  messageTexture.textSize(20);
  messageTexture.text(
    "Texture + Materials!\n(click anywhere to enable textures)",
    0,
    0,
    400,
    200,
  );
}

function mouseClicked() {
  video.loop();
}

function applyRotation() {
  rotateY((HALF_PI * frameCount) / FRAME_RATE);
}

// specularMaterial and shininess
// https://beta.p5js.org/tutorials/lights-camera-materials/
function applyShinyMaterial(modifier /* 0 to 1 */) {
  // specular light
  specularMaterial(COLORS.lavenderBlue()); // color of the reflections
  shininess(lerp(1, 50, modifier));
}

function draw() {
  background(220);
  strokeWeight(0.1);

  // background text
  push();
  translate(0, 0, -100);
  texture(messageTexture);
  plane(400, 200);
  pop();

  const t = millis() / 1000;
  const modifier = Math.sin(t) / 2 + 0.5; // 0 to 1

  // lighting
  // https://beta.p5js.org/tutorials/lights-camera-materials/

  // ambient lights
  // ambientLight(lerpColor(COLORS.blue(), COLORS.black(), modifier)); // "a soft kind of sunlight"
  ambientLight(15);

  // directional light
  const direction1 = createVector(-0.5, 1, -0.8); // top right, a little from the front
  const direction2 = createVector(0.5, 1, -0.8); // top left
  const lightDirection = p5.Vector.lerp(direction1, direction2, modifier);

  directionalLight(
    // rgb color
    255,
    255,
    255,
    // direction
    lightDirection.x,
    lightDirection.y,
    lightDirection.z,
  );

  // spotlight
  // https://beta.p5js.org/reference/p5/spotLight/
  const spotlightPos = createVector(0, 1000, 0);
  const spotlightDirection = createVector(0, -1, 0);
  spotLight(
    // color
    COLORS.magenta(),
    //
    spotlightPos,
    spotlightDirection,
    // 'angle', which determines radius of the light cone.
    PI / 3,
  );
  // visualize the spotlight origin
  push();
  noLights();
  fill(COLORS.magenta());
  translate(spotlightPos);
  sphere(50);
  pop();

  // shapes

  // blank sphere
  push();
  fill(COLORS.white());
  translate(-200, 0, 0);
  applyRotation();
  applyShinyMaterial(modifier);
  sphere(50);
  pop();

  // blank model / Suzanne
  push();
  scale(50);
  translate(0, 0, 0);
  rotateY(PI); // original mdoel is facing backwards, turn it towards us
  // applyRotation();
  rotateX(PI); // original mdoel is also upside down

  applyShinyMaterial(modifier);
  model(shape);
  pop();

  // red cube
  push();
  translate(200, 0, 0);
  applyRotation();
  rotateX(Math.sin(t) * PI);
  applyShinyMaterial(modifier);
  box(50, 50, 50);
  pop();

  // video sphere
  push();
  fill(COLORS.white());
  translate(0, -200, 0);
  applyRotation();
  texture(video);
  applyShinyMaterial(modifier);
  sphere(50);
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
