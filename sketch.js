
let imageModelURL = './Model/'
// Classifier Variable
let classifier;
// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let texto = "";

// Load the model first
function preload() {
classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}
function setup() {
createCanvas(320, 260);
// Create the video
video = createCapture(VIDEO);
video.size(320, 240);
video.hide();

flippedVideo = ml5.flipImage(video);

// Start classifying
classifyVideo();
}

function draw() {
background(0);
// Draw the video
image(flippedVideo, 0, 0);
if (label === "Funko") {
  texto = "🤖"
} else if (label === "Juego de Xbox One") {
  texto = "🎮👾"
} else if (label === "Llavero de Casco de Darth Vader") {
  texto = "🚀🌌"
}

// Draw the label
fill(255);
textSize(16);
textAlign(CENTER);
text(texto, width /12 , height -4);
text(label, width / 1.8, height - 4);
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
// console.log(results[0]);
label = results[0].label;
// Classifiy again!
classifyVideo();
}