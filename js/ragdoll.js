var Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;
    Events = Matter.Events;

var engine, world;
var walls = [];
var objects = [];
var mouse, mConstraint;

// collision sound file URLs
var collisionSounds = [
    'https://cdn.glitch.global/f512b06f-0d41-4765-b06d-0091bdd1fa5e/slam.mp3?v=1712163641936',
    'https://cdn.glitch.global/f512b06f-0d41-4765-b06d-0091bdd1fa5e/slam2.mp3?v=1712168397967',
    'https://cdn.glitch.global/f512b06f-0d41-4765-b06d-0091bdd1fa5e/scream.mp3?v=1712168403306',
    'https://cdn.glitch.global/f512b06f-0d41-4765-b06d-0091bdd1fa5e/oof.mp3?v=1712168410128',
    'https://cdn.glitch.global/f512b06f-0d41-4765-b06d-0091bdd1fa5e/scream2.mp3?v=1712168425672',
];

// play a random collision sound from collisionSounds
function playRandomCollisionSound() {
    var randomIndex = Math.floor(Math.random() * collisionSounds.length);
    var randomSound = new Audio(collisionSounds[randomIndex]);
    randomSound.play();
}

// create the head + body + neck + hips + legs + shoulders + arms + hands
// of the ragdoll
function makeRagdoll() {
  var head = new Circle(200, 100, 25, false);
  var body = new Rectangle(200, 200, 50, 75, false, true);
  var offsetA = {
    x: 0,
    y: -62.5
  };
  var offsetB = {
    x: 0,
    y: 0
  }
  var neck = new Connection(body, head, offsetA, offsetB);
  var leftLeg = new Rectangle(200, 200, 15, 45, false, true);
  offsetA = {
    x: -15,
    y: 60
  };
  offsetB = {
    x: 0,
    y: 0
  }
  var leftHip = new Connection(body, leftLeg, offsetA, offsetB);
  var rightLeg = new Rectangle(200, 200, 15, 45, false, true);
  offsetA = {
    x: 15,
    y: 60
  };
  offsetB = {
    x: 0,
    y: 0
  }
  var rightHip = new Connection(body, rightLeg, offsetA, offsetB);
  var leftHand = new Rectangle(200, 200, 45, 15, false, true);
  offsetA = {
    x: -45,
    y: -30
  };
  offsetB = {
    x: 0,
    y: 0
  }
  var leftShoulder = new Connection(body, leftHand, offsetA, offsetB);
  var rightHand = new Rectangle(200, 200, 45, 15, false, true);
  offsetA = {
    x: 45,
    y: -30
  };
  offsetB = {
    x: 0,
    y: 0
  }
  var rightShoulder = new Connection(body, rightHand, offsetA, offsetB);
  objects = [head, body, leftLeg, rightLeg, leftHand, rightHand];
}


// defines the boundaries of the canvas, spawns in the ragdoll
function setup() {
  const canvas = createCanvas(windowWidth, windowHeight); // Setting canvas size to match window
  engine = Engine.create();
  world = engine.world;
  var ground = new Rectangle(width / 2, height - 5, width, 100, true, true);
  walls.push(ground);
  var ceiling = new Rectangle(width / 2, 25, width, 50, true, true);
  walls.push(ceiling);
  var leftWall = new Rectangle(10, height / 2, 20, height, true, true);
  walls.push(leftWall);
  var rightWall = new Rectangle(width - 10, height / 2, 20, height, true, true);
  walls.push(rightWall);
  
  makeRagdoll();
  
}

// Flag to track if collision sound is already playing
var isCollisionPlaying = false;

// draws ragdoll with position based on user index finger, checks for collisions
function draw() {
    background(0);
    Engine.update(engine);

    var isColliding = false;
    for (var object of objects) {
        for (var wall of walls) {
            var objectBounds = object.body.bounds;
            var wallBounds = wall.body.bounds;
            if (objectBounds.min.x < wallBounds.max.x &&
                objectBounds.max.x > wallBounds.min.x &&
                objectBounds.min.y < wallBounds.max.y &&
                objectBounds.max.y > wallBounds.min.y) {
                console.log("Collision detected for", object, "with", wall);
                isColliding = true;
                break;
            }
        }
        if (isColliding) {
            break;
        }
    }

    // Play random collision sound if collision detected and sound is not already playing
    if (isColliding && !isCollisionPlaying) {
        console.log("Playing collision sound");
        playRandomCollisionSound();
        isCollisionPlaying = true;
    } else if (!isColliding && isCollisionPlaying) {
        console.log("Resetting collision sound flag");
        isCollisionPlaying = false;
    }

    // Draw walls
    for (var wall of walls) {
        wall.show();
    }

    // Draw ragdoll
    for (var object of objects) {
        object.show();
    }

    // Update ragdoll position based on index finger
    if (window.indexFingerPosition) {
        var centerX = width / 2;
        var centerY = height / 2;
        var indexFingerX = window.indexFingerPosition.x;
        var indexFingerY = window.indexFingerPosition.y;
        var distanceX = indexFingerX - centerX;
        var distanceY = indexFingerY - centerY;
        var ragdollX = centerX - distanceX;
        var ragdollY = centerY + distanceY;
        Body.setPosition(objects[1].body, { x: ragdollX, y: ragdollY });
    }
}

   

// var Engine = Matter.Engine,
//     World = Matter.World,
//     Body = Matter.Body,
//     Bodies = Matter.Bodies,
//     Constraint = Matter.Constraint,
//     Mouse = Matter.Mouse,
//     MouseConstraint = Matter.MouseConstraint;

// var engine, world;
// var walls = [];
// var objects = [];
// var mouse, mConstraint;

// function makeRagdoll() {
//   var head = new Circle(200, 100, 25, false);
//   var body = new Rectangle(200, 200, 50, 75, false, true);
//   var offsetA = {
//     x: 0,
//     y: -62.5
//   };
//   var offsetB = {
//     x: 0,
//     y: 0
//   }
//   var neck = new Connection(body, head, offsetA, offsetB);
//   var leftLeg = new Rectangle(200, 200, 15, 45, false, true);
//   offsetA = {
//     x: -15,
//     y: 60
//   };
//   offsetB = {
//     x: 0,
//     y: 0
//   }
//   var leftHip = new Connection(body, leftLeg, offsetA, offsetB);
//   var rightLeg = new Rectangle(200, 200, 15, 45, false, true);
//   offsetA = {
//     x: 15,
//     y: 60
//   };
//   offsetB = {
//     x: 0,
//     y: 0
//   }
//   var rightHip = new Connection(body, rightLeg, offsetA, offsetB);
//   var leftHand = new Rectangle(200, 200, 45, 15, false, true);
//   offsetA = {
//     x: -45,
//     y: -30
//   };
//   offsetB = {
//     x: 0,
//     y: 0
//   }
//   var leftShoulder = new Connection(body, leftHand, offsetA, offsetB);
//   var rightHand = new Rectangle(200, 200, 45, 15, false, true);
//   offsetA = {
//     x: 45,
//     y: -30
//   };
//   offsetB = {
//     x: 0,
//     y: 0
//   }
//   var rightShoulder = new Connection(body, rightHand, offsetA, offsetB);
//   objects = [head, body, leftLeg, rightLeg, leftHand, rightHand];
// }

// function setup() {
//   const canvas = createCanvas(windowWidth, windowHeight); // Setting canvas size to match window
//   engine = Engine.create();
//   world = engine.world;
//   var ground = new Rectangle(width / 2, height - 5, width, 100, true, true);
//   walls.push(ground);
//   var ceiling = new Rectangle(width / 2, 25, width, 50, true, true);
//   walls.push(ceiling);
//   var leftWall = new Rectangle(10, height / 2, 20, height, true, true);
//   walls.push(leftWall);
//   var rightWall = new Rectangle(width - 10, height / 2, 20, height, true, true);
//   walls.push(rightWall);
  
//   mouse = Mouse.create(canvas.elt);
//   mouse.pixelRatio = pixelDensity();
//   var options = {
//     mouse: mouse
//   };
//   mConstraint = MouseConstraint.create(engine, options);
//   World.add(world, mConstraint);
//   makeRagdoll();
// }

// function draw() {
//   background(0);
//   Engine.update(engine);
//   for (var wall of walls) {
//     wall.show();
//   }
//   for (var object of objects) {
//     object.show();
//   }
//   // noLoop();
// }