/*

Week 8
Sounds / Load MP3

*/

document.title = "W8 - Sounds / Load MP3";

// https://p5js.org/reference/p5/loadSound/
// https://beta.p5js.org/search/?term=p5+soun
// https://beta.p5js.org/reference/p5.sound/

const SHARED_PATH = "../../../shared/";
const COLORS = GLOBALS.colors;

let sound;
let soundAnalyzer;
let playing = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  sound = await loadSound(SHARED_PATH + "audio/mokkamusic-onthemission.mp3");
  // sound = await loadSound(SHARED_PATH + "audio/doorbell.mp3");
  soundAnalyzer = new p5.Amplitude();
  soundAnalyzer.setInput(sound);

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
    textSize(smallestDim * map(volume, 0, 1, 0.01, 0.4));
    text("playing...", width / 2, height / 2);
  } else {
    textSize(smallestDim * 0.08);
    text("click to start!", width / 2, height / 2);
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") userStartAudio();

  playing = !playing;

  if (playing) {
    //
    background(220);
    sound.play();
  } else {
    sound.stop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
