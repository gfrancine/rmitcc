//
const GLOBALS = {};

(() => {
  function p5Color(...values) {
    return () => color(...values);
  }

  // usage: GLOBALS.colors.black() -> p5 color
  // https://pinterest.com/gracefrancine/color/
  // https://colors.artyclick.com/color-name-finder/
  GLOBALS.colors = {
    // neutrals
    black: p5Color(0),
    white: p5Color(255),
    grey50: p5Color(127),
    // primaries/extremes
    red: p5Color(255, 0),
    green: p5Color(0, 255, 0),
    magenta: p5Color(255, 0, 255),
    blue: p5Color(0, 0, 255),
    // olives, murky yellows/greens/browns
    brass: p5Color(180, 170, 45),
    wasabi: p5Color(127, 140, 50),
    // intense warm
    pumpkin: p5Color(255, 120, 40),
    // pinks
    fuchsia: p5Color(245, 0, 180),
    // blues/purples
    crystalBlue: p5Color(100, 175, 250),
    lavenderBlue: p5Color(127, 130, 233),
  };

  // sets up a "record" button and records the canvas
  // https://stackoverflow.com/questions/42437971/exporting-a-video-in-p5-js
  GLOBALS.setupRecorder = function () {
    const container = document.createElement("div");
    container.style = "position: absolute; top: 0; left: 0;";

    const btn = document.createElement("button");
    btn.textContent = "start recording";
    document.body.append(container);
    container.append(btn);

    btn.onclick = () => {
      chunks = [];
      chunks.length = 0;

      const stream = document.querySelector("canvas").captureStream(60);
      const recorder = new MediaRecorder(stream, {
        mimeType: "video/mp4",
        videoBitsPerSecond: 12,
      });

      recorder.ondataavailable = (e) => {
        if (e.data.size) {
          chunks.push(e.data);
        }
      };

      btn.onclick = () => {
        recorder.stop();
        btn.textContent = "start recording";
        btn.onclick = record;
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });

        const vid = document.createElement("video");
        vid.style = "width: 100%";
        vid.controls = true;
        vid.src = URL.createObjectURL(blob);
        container.append(vid);

        // document.body.style.overflow = "auto";
      };

      recorder.start();
      btn.textContent = "stop recording";
    };
  };
})();
