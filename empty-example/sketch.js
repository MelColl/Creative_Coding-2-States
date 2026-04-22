// Classifier Variable
let classifier;
// Model URL
let imageMode1URL = './teachablemachine';

//images
let img_1;
let img_2;
let img_3;

//stability
let stableLabel = "";
let candidateLabel = "";
let labelTimer = 0;
let holdTime = 20; // frames (~0.25 sec)


// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


// Load the model first
function preload() {
  classifier = ml5.imageClassifier('./teachablemachine/model.json');
  img_1 = loadImage('images/pikachu.jpeg');
  img_2 = loadImage('images/bulbasaur.jpeg'); 
  img_3 = loadImage('images/idle.jpeg');
  idleSound = loadSound('sounds/idlemusic.mp3');
  }

function setup() {
  createCanvas(600, 600);
 // imageModeURL(CENTER);
  // Create the video
  video = createCapture(VIDEO);
  video.size(600, 600);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
 // imageMode1URL(CORNER);
  // Draw the video
  imageMode(CENTER);
  if (stableLabel == "bulbasaur") {
    image(img_2, width/2, height/2, 600, 600); // NEW
    }
else if (stableLabel == "pikachu") {
   image(img_1, width/2, height/2, 600, 600); // NEW
    }
else  {
   image(img_3, width/2, height/2, 600, 600); // NEW
  } 
}

  

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  if (results[0]. confidence > 0.8) {
    label = results [0].label;
  }
  let newLabel = results[0].label;

  // If model suggests same label, increase timer
  if (newLabel === candidateLabel) {
    labelTimer++;
  } else {
    candidateLabel = newLabel;
    labelTimer = 0;
  }

  // Only accept if stable long enough
  if (labelTimer > holdTime) {
    stableLabel = candidateLabel;
  }

  else {
    stableLabel = "idle";
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
