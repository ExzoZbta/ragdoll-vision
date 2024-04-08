let detections = {};
const videoElement = document.getElementsByClassName("input__video")[0];

function getHands(results) {
  detections = results;
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  },
});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});
hands.onResults(getHands);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});

function showHands(multiHandLandmarks, p5Instance) {
  for (const landmarks of multiHandLandmarks) {
    for (const [i, landmark] of landmarks.entries()) {
      const x = landmark.x * p5Instance.width;
      const y = landmark.y * p5Instance.height;
      p5Instance.fill(255);
      p5Instance.noStroke();
      p5Instance.ellipse(x, y, 10, 10);
    }
  }
}

function getIndexFingerTip(multiHandLandmarks, p5Instance) {
  if (multiHandLandmarks.length === 0) {
    return null;
  }
  const indexFingerLandmarks = multiHandLandmarks[0].slice(5, 9);
  const indexFingerTip = indexFingerLandmarks[3];
  return {
    x: indexFingerTip.x * p5Instance.width,
    y: indexFingerTip.y * p5Instance.height,
  };
}

camera.start();
