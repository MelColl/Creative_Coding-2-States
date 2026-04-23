// teachable machine classifiers
let classifier;
// Model URL
let imageMode1URL = './teachablemachine';

//sound
let pikachuSound, bulbasaurSound;
let currentState = "";

//images classifiers
let img_1;
let img_2;
let img_3;


//stability classifiers
let stableLabel = "";
let candidateLabel = "";
let labelTimer = 0;
let holdTime = 20; // frames (~0.25 sec) // holds image for a little longer 


// video classifiers
let video;
let flippedVideo;
// to store the classification
let label = "";


// preloads the teachable machine model first, uses classifiers to load correct images
function preload() {
  classifier = ml5.imageClassifier('./teachablemachine/model.json');
  img_1 = loadImage('images/pikachu.jpeg');
  img_2 = loadImage('images/bulbasaur.jpeg'); 
  img_3 = loadImage('images/idle.jpeg');
  pikachuSound = loadSound('sounds/pikachumusic.mp3');
  bulbasaurSound = loadSound ('sounds/idlemusic.mp3');

  }
//set up canvas and video capture
function setup() {
  createCanvas(800, 800);
  userStartAudio();
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
 if (stableLabel !== currentState) {

  currentState = stableLabel;

  // should prevent overlap issues I had - Got help from ChatGPT 
  pikachuSound.stop();
  bulbasaurSound.stop();

  if (currentState === "pikachu") {
    pikachuSound.play();
  }
  else if (currentState === "bulbasaur") {
    bulbasaurSound.play();
  }
}
  // draw the video and adds own images 
  imageMode(CENTER);
  if (stableLabel == "bulbasaur") {
    image(img_2, width/2, height/2, 800, 800); // NEW
    }
else if (stableLabel == "pikachu") {
   image(img_1, width/2, height/2, 800, 800); // NEW
    }
else  {
   image(img_3, width/2, height/2, 800, 800); // NEW
  } 
  
}

  

// get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// when we get a result
function gotResult(error, results) {
  // if there is an error
  if (error) {
    console.error(error);
    return;
  }

  if (results[0]. confidence > 0.8) {
    label = results [0].label;
  }
  let newLabel = results[0].label;

  // if model suggests same label, increases timer - Used ChatGPT
  if (newLabel === candidateLabel) {
    labelTimer++;
  } else {
    candidateLabel = newLabel;
    labelTimer = 0;
  }

  // only accept if stable long enough
  if (labelTimer > holdTime) {
    stableLabel = candidateLabel;
  }

  else {
    stableLabel = "idle";
  }
  // the results are in an array ordered by confidence
  console.log(results);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
