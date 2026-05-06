/*

Week 7 
Sounds / "Jacob Collier Simulator"

*/

document.title = "W7 - Sounds / Jacob Collier Simulator";

// forked from the Sound Intro sketch by Andy Simionato
// (https://github.com/Simandy/creativecoding_2026/tree/main/sound_intro)

/**
 * Creative Coding 2026 — Sound intro
 *
 * Introducing sound as a way to transform a sketch!
 *
 * Remember that you MUST include the p5.sound.min.js library to get this to work
 * (see the index.html tab above to see what I mean)
 * If you are reproducing this sketch (or a version) just add the sound library
 * under Sketch > Import library > p5.sound ...and Processing will do the rest!
 *
 * This sketch was brought to you by Karen ann Donnachie & Andy Simionato
 * Try noodling with the variables, or wire it up to follow different movements
 * or interactions...
 */

const COLORS = GLOBALS.colors;

// https://en.wikipedia.org/wiki/Piano_key_frequencies
function getNoteFrequency(stepsFromA4) {
  return 440 * 2 ** (stepsFromA4 / 12);
}

// in semitones away from A4
const RANGE = {
  min: 28 - 49, // C3
  max: 52 - 49, // C5
};

// maybe there's a programmatic way to do this but I Don't Have Time
const NOTES =
  "C#3 D3 D#3 E3 F3 F#3 G3 G#3 A3 A#3 B3 C4 C#4 D4 D#4 E4 F4 F#4 G4 G#4 A4 A#4 B4 C3"
    .split(" ")
    .reverse();

const N_OSCILLATORS = 3;
const AMPLITUDE = 0.04;

const oscillators = []; // https://beta.p5js.org/reference/p5.sound/p5.Oscillator/
let playing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < N_OSCILLATORS; i++) {
    oscillators.push(new p5.Oscillator("sine")); // can be 'sine', 'triangle', 'sawtooth', 'square'
  }
}

function draw() {
  background(30);

  // draw notes
  stroke(255);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < NOTES.length; i++) {
    const rowHeight = height / NOTES.length;
    const y = rowHeight * i + rowHeight / 2;
    strokeWeight(1);
    line(0, y, width, y);
    strokeWeight(0);
    fill(255);
    text(NOTES[i], 0, y - rowHeight / 2);
  }

  if (playing) {
    const semitonesFromA4 = map(
      // map pitch to mouseY
      height - mouseY,
      0,
      height,
      RANGE.min,
      RANGE.max,
    );
    oscillators[0].freq(getNoteFrequency(semitonesFromA4));
    // oscillators[1].freq(getNoteFrequency(semitonesFromA4 + 4)); // major 3rd
    oscillators[1].freq(getNoteFrequency(semitonesFromA4 + 7)); // perfect 5th
    oscillators[2].freq(getNoteFrequency(semitonesFromA4 - 12)); // octave...below

    oscillators.forEach((osc) => osc.amp(AMPLITUDE, 0.1)); // 0.1 is the smoothing time to avoid clicks)

    // display frequency
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(getNoteFrequency(semitonesFromA4) + " Hz", width / 2, height / 2);

    // draw mouse
    fill(lerpColor(COLORS.green(), COLORS.blue(), mouseY / height));
    noStroke();
    const size = min(width, height) * 0.05;
    ellipse(mouseX, mouseY, size, size);
  } else {
    // helper text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      "Jacob Collier Simulator\n(Click and drag to make sound)",
      width / 2,
      height / 2,
    );
  }
}

function mousePressed() {
  userStartAudio(); // Start the audio context if it isn't running yet
  if (!playing) {
    oscillators.forEach((osc) => osc.start());
    // oscillators[0].start();
    playing = true;
  }
}

function mouseReleased() {
  if (playing) {
    oscillators.forEach((osc) => osc.amp(0, 0.1)); // Ramp amplitude to 0 over 0.5 seconds to avoid a click
    setTimeout(() => {
      oscillators.forEach((osc) => osc.stop()); // Stop oscillator after the ramp
      playing = false;
    }, 0.1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
