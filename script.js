const mainDino = document.getElementById("main_dino");
const dinosaur = document.getElementById("dino");
const startButton = document.getElementById("start");
const UP_KEY = 38;
const DOWN_KEY = 40;
let upKeyPress = false;
let downKeyPress = false;
let time = 0;

function startGame() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    startButton.disabled = true;
    startButton.style.backgroundColor = "darkblue";
    startButton.style.borderColor = "gray";
    startButton.style.color = "gray";
    obstacleMovement();
    createTrack();
    updateTime();
}

function updateTime() {
    let intervalIdTime = setInterval(function () {
        ++time;
        document.getElementById("score").innerHTML = time;
    }, 1000);
}

function keyPressed(event) {
    if (event.keyCode === UP_KEY) {
        upKeyPress = true;
    }
    if (event.keyCode === DOWN_KEY) {
        downKeyPress = true;
    }
    jumpUp();
    bendDown();
}

function keyReleased(event) {
    if (event.keyCode === UP_KEY) {
        upKeyPress = false;
    }
    if (event.keyCode === DOWN_KEY) {
        downKeyPress = false;
    }
    jumpBackDown();
    getUp();
}

function jumpUp() {
    if (upKeyPress) {
        dinosaur.style.bottom = "120px";
    }
}

function jumpBackDown() {
    setTimeout(function () {
        if (!upKeyPress) {
            dinosaur.style.bottom = "20px";
        }
    }, 400);
}

function bendDown() {
    if (downKeyPress) {
        dinosaur.style.height = "30px";
        dinosaur.style.width = "60px";
    }
}

function getUp() {
    setTimeout(function () {
        if (!downKeyPress) {
            dinosaur.style.height = "60px";
            dinosaur.style.width = "30px";
        }
    }, 400);
}

function createTrack() {
    let newTrack = document.createElement("div");
    newTrack.style.borderBottom = "1px solid black";
    newTrack.style.width = "100%";
    newTrack.style.position = "absolute";
    newTrack.style.bottom = "19px";
    newTrack.style.right = "0px";
    mainDino.appendChild(newTrack);
}

let newObstacle = document.createElement("div");
let newObstacleBird = document.createElement("div");
function createObstacle(name, width, height, bottomPos, rightPos) {
    name.style.width = `${width}px`;
    name.style.height = `${height}px`;
    name.style.backgroundColor = "red";
    name.style.position = "absolute";
    name.style.bottom = `${bottomPos}px`;
    name.style.right = `${rightPos}px`;
    mainDino.appendChild(name);
}

function obstacleMovement() {
    let position1 = 0;
    let rightPosBird = 0;
    createObstacle(newObstacle, 30, 30, 19, 0);
    setTimeout(function () {
        createObstacle(newObstacleBird, 30, 30, 60, 0);
        let intervalIdObstacleBird = setInterval(function () {
        rightPosBird += 1;
        newObstacleBird.style.right = `${rightPosBird}px`;
        if (rightPosBird === 710) {
            rightPosBird = 0;
        }
        }, 5);
    }, 2000);
    let intervalIdObstacle = setInterval(function () {
        position1 += 1;
        newObstacle.style.right = `${position1}px`;
        if (position1 === 710) {
        position1 = 0;
        }
    }, 5);
}

function gameOver() {
    
}

