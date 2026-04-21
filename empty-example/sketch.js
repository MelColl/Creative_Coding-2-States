// Classifier Variable
let classifier;
// Model URL
let imageMode1URL = './teachablemachine';

let img_1;
let img_2;
let img_3;

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";


// Load the model first
function preload() {
   console.log("PRELOAD IS RUNNING");
  classifier = ml5.imageClassifier('./teachablemachine/model.json');
  img_1 = loadImage('images/pikachu.jpeg',
    () => console.log("pikachu loaded"),
    () => console.log("pikachu FAILED")
    );
   // NEW
  img_2 = loadImage('images/bulbasaur.jpeg'); // NEW
  img_3 = loadImage('images/idle.jpeg'); // NEW
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
  //image(flippedVideo, 0, 0);
  imageMode(CENTER);
  

  console.log(label);

  // Draw the label
  //fill(255);
  //textSize(16);
  //textAlign(CENTER);
  //text(label, width / 2, height - 4);

  if (label == "bulbasaur") {
    image(img_2, width/2, height/2, 600, 600); // NEW
    }
else if (label == "pikachu") {
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
  // The results are in an array ordered by confidence.
  console.log(results);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}
