/*

Week 7 
Sounds / Beeping

*/

document.title = "W7 - Sounds / Beeping";

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

const N_OSCILLATORS = 2;
const AMPLITUDE = 0.01;
const oscillators = []; // https://beta.p5js.org/reference/p5.sound/p5.Oscillator/
let started = false;
let playing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  for (let i = 0; i < N_OSCILLATORS; i++) {
    oscillators.push(new p5.Oscillator("square")); // can be 'sine', 'triangle', 'sawtooth', 'square'
  }
}

// https://en.wikipedia.org/wiki/Piano_key_frequencies
function getNoteFrequency(stepsFromA4) {
  return 440 * 2 ** (stepsFromA4 / 12);
}

function draw() {
  background(30);

  const shouldSwitch = frameCount % int(map(mouseY, 0, height, 5, 20)) === 0;
  if (shouldSwitch) playing = !playing;

  if (started) {
    // helper text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(
      "The higher up your mouse is, \n the faster the beeps get!",
      width / 2,
      height / 2,
    );

    const START_TONE = -12;
    const END_TONE = -6;
    oscillators[0].freq(
      getNoteFrequency(map(height - mouseY, 0, height, START_TONE, END_TONE)),
    );
    oscillators[1].freq(
      getNoteFrequency(
        map(height - mouseY, 0, height, START_TONE + 7, END_TONE + 7),
      ),
    );

    oscillators.forEach((osc) => {
      osc.amp(AMPLITUDE);
      if (playing) osc.start();
      else osc.stop();
    });

    // draw mouse
    if (playing)
      fill(lerpColor(color(0, 255, 0), color(255, 0, 255), mouseY / height));
    else noFill();
    noStroke();
    const size = min(width, height) * 0.1;
    rect(mouseX, mouseY, size, size);
  } else {
    // helper text
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(16);
    text("(click to start!)", width / 2, height / 2);
  }
}

function mousePressed() {
  userStartAudio(); // Start the audio context if it isn't running yet
  if (!started) {
    oscillators.forEach((osc) => osc.start());
    started = true;
  }
}

// function mouseReleased() {
//   if (playing) {
//     oscillators.forEach((osc) => osc.amp(0, 0.1)); // Ramp amplitude to 0 over 0.5 seconds to avoid a click
//     setTimeout(() => {
//       oscillators.forEach((osc) => osc.stop()); // Stop oscillator after the ramp
//       playing = false;
//     }, 0.1);
//   }
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("mycanvas", "jpg");
  }
}
