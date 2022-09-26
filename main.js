rightwristX = 0;
rightwristY = 0;
leftwristX = 0;
leftwristY = 0;

song = "";
song1 = "";
song1_status = "";
song2_status = "";
scoreleftwrist = 0;
function preload() {
song = loadSound("music.mp3");
song1 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.position(400,200);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {

    if (results.length > 0) {

        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("Score of left wrist is " + scoreleftwrist);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("left wrist coordinates x= " + leftwristX + " y = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("right wrist coordinates x= " + rightwristX + " y = " + rightwristY);
    }

}

function draw() {
    image(video,0,0,500,500);

    stroke("red");
    fill("red");

    song1_status = song.isPlaying();
    song2status = song.isPlaying();

    if (scoreleftwrist > 0.2) { 
        circle(leftwristX, leftwristY, 20);
        song.stop();
        document.getElementById("song_name").innerHTML = "Playing Peter Pan";
    }
}



function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}




