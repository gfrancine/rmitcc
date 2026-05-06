/*

Week 8
Sounds / Mic Input

*/

document.title = "W8 - Sounds / Mic Input";

// https://p5js.org/reference/p5/loadSound/
// https://beta.p5js.org/search/?term=p5+soun
// https://beta.p5js.org/reference/p5.sound/

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let soundInput;
let soundAnalyzer;
let playing = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  soundInput = new p5.AudioIn();
  soundInput.start();

  // sound = await loadSound(SHARED_PATH + "audio/doorbell.mp3");
  soundAnalyzer = new p5.Amplitude();
  soundAnalyzer.setInput(soundInput);

  // some browsers don't like playing audio without iteraction
  // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/suspend
  getAudioContext().suspend(); //
}

function draw() {
  background(220);

  const smallestDim = min(width, height);
  textAlign(CENTER, CENTER);
  stroke(0);
  strokeWeight(smallestDim * 0.001);
  noFill();

  if (playing) {
    // sound.isPlaying();
    const volume = soundAnalyzer.getLevel();
    textSize(smallestDim * 0.08);
    // textSize(smallestDim * map(volume, 0, 1, 0.01, 0.4));
    text("listening...\n" + volume * 100 + "%", width / 2, height / 2);
  } else {
    textSize(smallestDim * 0.08);
    text("click to start!", width / 2, height / 2);
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") userStartAudio();

  if (playing) {
    background(220);
  } else {
    playing = !playing;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
