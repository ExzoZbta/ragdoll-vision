
let canvas;
let sketch = function (p5Instance) {
  p5Instance.setup = function () {
    canvas = p5Instance.createCanvas(
      p5Instance.windowWidth,
      p5Instance.windowHeight
    );
    canvas.id("canvas");
    p5Instance.colorMode(p5Instance.HSB);
    p5Instance.pixelDensity(1);
  };

  p5Instance.draw = function () {
    p5Instance.clear();
    p5Instance.background(0, 0);

    p5Instance.translate(p5Instance.width, 0);
    p5Instance.scale(-1, 1);

    if (detections !== undefined) {
      if (detections.multiHandLandmarks) {
        const indexFingerTip = getIndexFingerTip(detections.multiHandLandmarks, p5Instance);
        if (indexFingerTip) {
          const { x, y } = indexFingerTip;
          window.indexFingerPosition = {x, y};
          // Draw index finger tip
          p5Instance.fill(120, 100, 100);
          p5Instance.noStroke();
          p5Instance.ellipse(x, y, 20, 20);
        }
      }
    }
  };

  p5Instance.windowResized = function () {
    p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
  };
};

let myp5 = new p5(sketch);




// let canvas;
// let sketch = function (p5Instance) {
//   p5Instance.setup = function () {
//     canvas = p5Instance.createCanvas(
//       p5Instance.windowWidth,
//       p5Instance.windowHeight
//     );
//     canvas.id("canvas");
//     p5Instance.colorMode(p5Instance.HSB);
//     p5Instance.pixelDensity(1);
//   };

//   p5Instance.draw = function () {
//     p5Instance.clear();
//     p5Instance.background(0);

//     p5Instance.translate(p5Instance.width, 0);
//     p5Instance.scale(-1, 1);

//     if (detections !== undefined) {
//       if (detections.multiHandLandmarks) {
//         showHands(detections.multiHandLandmarks, p5Instance);
//         const { x, y } = getIndexFingerTip(
//           detections.multiHandLandmarks,
//           p5Instance
//         ) || {
//           x: 0,
//           y: 0,
//         };

//         //Drawings go here.

//         p5Instance.fill(255);
//         p5Instance.noStroke();
//         p5Instance.ellipse(x, y, 20, 20);
//       }
//     }
//   };

//   p5Instance.windowResized = function () {
//     p5Instance.resizeCanvas(p5Instance.windowWidth, p5Instance.windowHeight);
//   };
// };

// let myp5 = new p5(sketch);
