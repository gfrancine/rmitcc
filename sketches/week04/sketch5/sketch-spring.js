/*

Week 4
Forces

*/

document.title = "W4 - Forces";

const SHARED_PATH = "../../../shared/";

let font;

// https://p5js.org/reference/p5.Font/textToPoints/
// https://p5js.org/reference/p5.Font/textBounds/

class Point {
  constructor(x, y) {
    this.pos = createVector(random(0, width), random(0, height)); // todo: use unit vectors ?
    this.originPos = createVector(x, y);
    this.velocity = createVector(0, 0);
  }

  update(dt) {
    const smallestDimension = Math.min(width, height);
    const MOUSE_ACTIV_RADIUS = smallestDimension * 0.2;
    const SPEED = 20;
    const MASS = 1;
    const DAMPING = 0.9;

    const fromMouseVec = p5.Vector.sub(this.pos, createVector(mouseX, mouseY)); // why is sub and add mutable but not setMag ??
    const toOriginVec = p5.Vector.sub(this.originPos, this.pos);

    let awayForce = createVector(0, 0);
    let returnForce = createVector(0, 0);

    if (fromMouseVec.mag() < MOUSE_ACTIV_RADIUS) {
      // is within the activation radius; move away from mouse
      awayForce = fromMouseVec.mult(2);
    }

    if (toOriginVec.mag() > 1.5) {
      // unaffected by mouse; return to origin pos
      returnForce = toOriginVec.setMag(SPEED);
    }

    const dampingForce = p5.Vector.mult(this.velocity, -DAMPING);

    const acceleration = awayForce
      .add(returnForce)
      .add(dampingForce)
      .mult(MASS);

    this.velocity = this.velocity.add(acceleration.mult(dt));

    // apply velocity
    this.pos.add(p5.Vector.mult(this.velocity, dt));
  }

  draw() {
    push();

    const smallestDimension = Math.min(width, height);

    strokeWeight(1);
    fill(0, 0, 0, 0);
    ellipse(this.pos.x, this.pos.y, smallestDimension * 0.01);

    pop();
  }
}

let points = [];

function updatePoints() {
  const newPoints = [];

  const smallestDimension = Math.min(width, height);

  const textStr = "some\nsteering";
  const textPos = [width / 2, height / 2];

  const fontSize = smallestDimension * 0.3; // arbitrary number
  textSize(fontSize);
  textLeading(fontSize * 0.65);
  textAlign(CENTER, CENTER);

  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: 0.12,
    simplifyThreshold: 0,
  });

  textPoints.forEach((point) => {
    newPoints.push(new Point(point.x, point.y));
  });

  points = newPoints;
  console.log(points);
}

async function setup() {
  // preload function deprecated in p5 2.0
  // https://dev.to/limzykenneth/asynchronous-p5js-20-458f
  font = await loadFont(SHARED_PATH + "fonts/TINY5x3-200.otf");

  createCanvas(windowWidth, windowHeight);

  // rectMode(CENTER); // https://p5js.org/reference/p5/rectMode/

  updatePoints();
  //noLoop();
}

function draw() {
  background(220);
  strokeWeight(1);
  fill(0, 0, 0, 0);

  points.forEach((point) => {
    point.update(deltaTime / 100);
    point.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
