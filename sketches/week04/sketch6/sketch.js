/*

Week 4
OOP / Forces 2

*/

document.title = "W4 - OOP / Forces 2";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let font; // p5.Font
let pointImages; // p5.Image[]

// https://p5js.org/reference/p5.Font/textToPoints/
// https://p5js.org/reference/p5.Font/textBounds/

class Point {
  constructor(x, y) {
    this.pos = createVector(x, y); // todo: use unit vectors ?
    this.originPos = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.image = random(pointImages);
  }

  randomizePos() {
    this.pos = createVector(random(0, width), random(0, height));
  }

  update(dt) {
    const smallestDimension = Math.min(width, height);
    const MOUSE_ACTIV_RADIUS = smallestDimension * 0.08;
    const DAMPING = 0.08; // treat this like a spring
    const MAX_SPEED = 30;

    // target and origin are flipped here
    // why is sub and add mutable but not setMag ??
    const fromMouseVec = p5.Vector.sub(this.pos, createVector(mouseX, mouseY));
    const toOriginVec = p5.Vector.sub(this.originPos, this.pos);

    // apply forces

    // away force, ie. if it's within the activation radius move away from mouse
    if (fromMouseVec.mag() < MOUSE_ACTIV_RADIUS) {
      const awayForce = fromMouseVec.mult(10); // arbitrary
      this.velocity.add(awayForce);
    }

    // return force
    const distanceToOrigin = toOriginVec.mag();
    // slow down as it gets nearer
    // https://github.com/Simandy/creativecoding_2026/blob/main/type_class_adv_steering/type_class_adv_steering.js
    const returnSpeed =
      distanceToOrigin > MOUSE_ACTIV_RADIUS
        ? MAX_SPEED
        : map(distanceToOrigin, 0, MOUSE_ACTIV_RADIUS, 0, MAX_SPEED);

    const returnForce = toOriginVec.setMag(returnSpeed);
    this.velocity.add(returnForce);

    // damping
    const dampingForce = p5.Vector.mult(this.velocity, -DAMPING);
    this.velocity.add(dampingForce);

    // apply velocity
    this.pos.add(p5.Vector.mult(this.velocity, dt));
  }

  drawLines() {
    push();

    strokeWeight(1);
    stroke(0);
    line(width / 2, height / 2, this.pos.x, this.pos.y);

    pop();
  }

  drawPoints() {
    push();

    const smallestDimension = Math.min(width, height);
    const pointSize = smallestDimension * 0.03;
    strokeWeight(0);

    /*
    fill(COLORS.white());
    rectMode(CENTER);
    square(this.pos.x, this.pos.y, pointSize);
    */

    imageMode(CENTER);
    image(this.image, this.pos.x, this.pos.y, pointSize, pointSize);

    pop();
  }
}

let points = [];

function refreshPoints() {
  const newPoints = [];

  const smallestDimension = Math.min(width, height);

  const textStr = "hungry";
  const textPos = [width / 2, height / 2];

  const fontSize = smallestDimension * 0.4; // arbitrary number
  textSize(fontSize);
  textLeading(fontSize * 0.65);
  textAlign(CENTER, CENTER);

  const textPoints = font.textToPoints(textStr, ...textPos, {
    sampleFactor: 0.05,
    simplifyThreshold: 0,
  });

  textPoints.forEach((point) => {
    newPoints.push(new Point(point.x, point.y));
  });

  points = newPoints;
}

function randomizePointPositions() {
  points.forEach((point) => point.randomizePos());
}

async function setup() {
  // preload function deprecated in p5 2.0
  // https://dev.to/limzykenneth/asynchronous-p5js-20-458f
  font = await loadFont(SHARED_PATH + "fonts/TINY5x3-200.otf");
  pointImages = [
    await loadImage("assets/bayercracker.png"),
    // await loadImage( "assets/biscuit.jpg"),
    // await loadImage( "assets/thins.jpg"),
  ];

  createCanvas(windowWidth, windowHeight);

  refreshPoints();
  randomizePointPositions();
  //noLoop();
}

function draw() {
  background(COLORS.lightFuchsia());

  points.forEach((point) => {
    point.update(deltaTime / 1000);
    point.drawLines();
  });

  points.forEach((point) => point.drawPoints());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  refreshPoints();
}

function mouseClicked() {
  randomizePointPositions();
}
