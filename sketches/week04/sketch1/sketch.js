/*

Week 4
Images & Macrotypography

*/

document.title = "W4 - Images & Macrotypography";

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

// i know the end – phoebe bridgers

const content1 = `Somewhere in Germany, but I can't place it
Man, I hate this part of Texas
Close my eyes, fantasize
Three clicks and I'm home
When I get back I'll lay around
Then I'll get up and lay back down
Romanticize a quiet life
There's no place like my room
But you had to go
I know, I know, I know
Like a wave that crashed and melted on the shore
Not even the burnouts are out here anymore
And you had to go
I know, I know, I know
Out in the park, we watch the sunset
Talking on a rusty swing set
After a while you went quiet and I got mean
I'm always pushing you away from me
But you come back with gravity
And when I call, you come home
A bird in your teeth
So I gotta go
I know, I know, I know
When the sirens sound, you'll hide under the floor
But I'm not gonna go down with my hometown in a tornado
I'm gonna chase it
I know, I know, I know
I gotta go now
I know, I know, I know`
  .replaceAll("\n", " ")
  .repeat(3);

const content2 = `Driving out into the sun
Let the ultraviolet cover me up
Went looking for a creation myth
Ended up with a pair of cracked lips
Windows down, scream along
To some America First rap, country song
A slaughterhouse, an outlet mall
Slot machines, fear of God
Windows down, heater on
Big bolts of lightning hanging low
Over the coast, everyone's convinced
It's a government drone or an alien spaceship
Either way, we're not alone
I'll find a new place to be from
A haunted house with a picket fence
To float around and ghost my friends
No, I'm not afraid to disappear
The billboard said, "The end is near"
I turned around, there was nothing there
Yeah, I guess the end is here
[screaming]`
  .replaceAll("\n", " ")
  .repeat(3);

let isDesktop = true;
let bodyFont;
let bgImage;

async function setup() {
  bodyFont = await loadFont(SHARED_PATH + "fonts/XanhMono-Regular.ttf");
  bgImage = await loadImage(SHARED_PATH + "images/phoebe.jpg");
  createCanvas(windowWidth, windowHeight);

  noLoop();
}

function draw() {
  // background(220);

  const smallestDimension = Math.min(width, height);
  if (width < height) isDesktop = false;

  // https://p5js.org/reference/p5/image/
  image(
    bgImage,
    0,
    0,
    width,
    height, // normal bounds
    0,
    0,
    width,
    height, // destination rectangle
  );

  const margin = width * 0.1;
  const gutter = width * 0.04;

  textFont(bodyFont);
  textSize(smallestDimension * 0.018);
  fill(255);
  const textBoxSize = [width / 2 - margin - gutter / 2, height * 0.8]; // width, height

  /*
  text(
    content1,
    width / 2 - textBoxSize[0] / 2,
    height / 2 - textBoxSize[1] / 2,
    ...textBoxSize,
  );
  */

  textAlign(CENTER, CENTER);
  text(content1, margin, height / 2 - textBoxSize[1] / 2, ...textBoxSize);

  textAlign(CENTER, CENTER);
  text(
    content2,
    width - margin - textBoxSize[0],
    height / 2 - textBoxSize[1] / 2,
    ...textBoxSize,
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
