// Classifier Variable
let classifier;
// Model URL
let imageModelURL = './teachablemachine/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

//images
let img_1; 
let img_2;
let img_3;



// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  img_1 = loadImage(
    'images/PikachuState.jpeg',
    () => console.log("loaded pikachu"),
    () => console.log("FAILED pikachu")
   ); // NEW
  img_2 = loadImage('images/BulbasaurState.jpeg'); // NEW
  img_3 = loadImage('images/IdleState.jpeg'); // NEW
}

function setup() {
  console.log("running setup");
  createCanvas(600, 600);
  imageModelURL(CENTER);
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
  imageModelURL(img_1, width/2, height/2, 250, 250);
  // Draw the video
  //image(flippedVideo, 0, 0);

  // Draw the label
  //fill(255);
  //textSize(16);
  //textAlign(CENTER);
  //text(label, width / 2, height - 4);

  //if (label == "bulbasaur") {
  //image(img_2, width/2, height/2, 250, 250); // NEW
//}
//else if (label == "pikachu") {
 // image(img_1, width/2, height/2, 250, 250); // NEW
//}
//else {
  //image(img_3, width/2, height/2, 250, 250); // NEW
//} 
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
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
