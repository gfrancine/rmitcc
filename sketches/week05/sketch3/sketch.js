/*

Week 5
Images / Collage

*/

document.title = "W5 - Images / Collage";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

const collageLayers /* CollageLayer[] */ = [];

class CollageItem {
  constructor(
    image, // p5.Image
    x, // unit (0 to 1) of canvas width
    y,
    scale, // 0 to 1 of SMALLEST DIMENSION (either canvas width or height),
    orientation, // num, in radians
  ) {
    this.image = image;
    this.pos = { x, y }; // unit
    this.scale = scale;
    this.orientation = orientation;
  }

  draw() {
    push();

    translate(this.pos.x * width, this.pos.y * height);
    rotate(this.orientation);
    imageMode(CENTER);

    const smallestDimension = min(width, height);
    const aspectRatio = this.image.width / this.image.height;
    const w = this.scale * smallestDimension;
    const h = w / aspectRatio;

    image(this.image, 0, 0, w, h);

    pop();
  }
}

class CollageLayer {
  items /* CollageItems[] */ = [];

  constructor(
    sourceImages, // p5.Image[]
    options, // see below
  ) {
    this.sourceImages = sourceImages;

    this.options = {
      // options
      itemCount: sourceImages.length,
      layerWidth: 1, // unit (0 to 1) of canvas width
      layerHeight: 1,
      // todo: add width and height with units
      minItemScale: 0, // of smallest dimension (either canvas width/height)
      maxItemScale: 1,
      minItemRotation: 0, // radians
      maxItemRotation: PI,
      ...options,
    };

    const {
      itemCount,
      layerHeight,
      layerWidth,
      minItemScale,
      maxItemScale,
      minItemRotation,
      maxItemRotation,
    } = this.options;

    // generate items
    const images = [...sourceImages]; // copy the array because we're going to use pop()

    for (let i = 0; i < itemCount; i++) {
      this.items.push(
        new CollageItem(
          images.pop(),
          random(-layerWidth / 2, layerWidth / 2),
          random(-layerHeight / 2, layerHeight / 2),
          random(minItemScale, maxItemScale),
          random(minItemRotation, maxItemRotation),
        ),
      );
    }
  }

  draw() {
    push();
    translate(width / 2, height / 2);
    this.items.forEach((item) => item.draw());
    pop();
  }

  debug() {
    push();

    // show layer bounds
    strokeWeight(2);
    stroke(255, 0, 0);
    fill(0, 0, 0, 0);

    rectMode(CENTER);
    translate(width / 2, height / 2);
    rect(
      0,
      0,
      this.options.layerWidth * width,
      this.options.layerHeight * height,
    );

    pop();
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(25);
  noLoop();

  const COLLAGE_IMAGES_PATH = "../assets/collage-images/";

  // load source images
  const sourceImages = [];
  await Promise.all(
    `aubrey.jpg
    bayercracker.png
    girlinred.jpg
    lemon.jpeg
    lyrics.png
    phoebe.jpg
    soekarnohatta.png`
      .split("\n")
      .map(
        (
          fileName, // turn into Promise[]
        ) =>
          loadImage(COLLAGE_IMAGES_PATH + fileName.trim()).then((image) =>
            sourceImages.push(image),
          ),
      ),
  );

  // generate collage layers
  const N_LAYERS = 1;
  for (let i = 0; i < N_LAYERS; i++) {
    collageLayers.push(
      new CollageLayer(sourceImages, {
        layerWidth: 0.5,
        layerHeight: 0.5,
      }),
    );
  }
}

function draw() {
  background(0);

  collageLayers.forEach((collageLayer) => collageLayer.draw());

  // collageLayers.forEach((collageLayer) => collageLayer.debug());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
