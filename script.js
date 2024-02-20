const mainDino = document.getElementById("main_dino");
const dinosaur = document.getElementById("dino");
const startButton = document.getElementById("start");
const UP_KEY = 38;
const DOWN_KEY = 40;
let upKeyPress = false;
let downKeyPress = false;
let time = 0;
let screenEnd = 710;
let intervalIdTime;
let intervalIdFirstObstacle;
let intervalIdSecondObstacle;
let firstObstacle = document.createElement("div");
let secondObstacle = document.createElement("div");

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
    intervalIdTime = setInterval(function () {
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
        dinosaur.style.width = "70px";
    }
}

function getUp() {
    setTimeout(function () {
        if (!downKeyPress) {
            dinosaur.style.height = "70px";
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

const obstacles = [
    {width: 30, height: 30, bottomPos: 19, rightPos: 0},
    {width: 30, height: 30, bottomPos: 80, rightPos: 0},
    {width: 30, height: 60, bottomPos: 19, rightPos: 0},
    {width: 60, height: 30, bottomPos: 90, rightPos: 0},
    {width: 60, height: 60, bottomPos: 19, rightPos: 0},
    {width: 60, height: 60, bottomPos: 70, rightPos: 0}
];

function createObstacle(name, obstacleInfo) {
    name.style.width = `${obstacleInfo.width}px`;
    name.style.height = `${obstacleInfo.height}px`;
    name.style.backgroundColor = "red";
    name.style.position = "absolute";
    name.style.bottom = `${obstacleInfo.bottomPos}px`;
    name.style.right = `${obstacleInfo.rightPos}px`;
    mainDino.appendChild(name);
}

function generateRandomFirstObstacle() {
    let obstacleInfo = obstacles[Math.floor(Math.random() * obstacles.length)];
    createObstacle(firstObstacle, obstacleInfo);
}

function generateRandomSecondObstacle() {
    let obstacleInfo = obstacles[Math.floor(Math.random() * obstacles.length)];
    createObstacle(secondObstacle, obstacleInfo);
}

function obstacleMovement() {
    let rightPosFirstObstacle = 0;
    let rightPosSecondObstacle = 0;
    generateRandomFirstObstacle();
    intervalIdFirstObstacle = setInterval(function () {
        rightPosFirstObstacle += 1;
        firstObstacle.style.right = `${rightPosFirstObstacle}px`;
        if (rightPosFirstObstacle === screenEnd) {
            rightPosFirstObstacle = 0;
            generateRandomFirstObstacle();
        }
        collision();
    }, 5);
    setTimeout(function () {
        generateRandomSecondObstacle();
        intervalIdSecondObstacle = setInterval(function () {
            rightPosSecondObstacle += 1;
            secondObstacle.style.right = `${rightPosSecondObstacle}px`;
            if (rightPosSecondObstacle === screenEnd) {
                rightPosSecondObstacle = 0;
                generateRandomSecondObstacle();
            }
        }, 5);
    }, 2000);
}

function collisionFirstObs() {
    let dinoRect = dinosaur.getBoundingClientRect();
    let firstObstacleRect = firstObstacle.getBoundingClientRect();
    if (dinoRect.bottom > firstObstacleRect.top
        && dinoRect.top < firstObstacleRect.bottom
        && dinoRect.right > firstObstacleRect.left
        && dinoRect.left < firstObstacleRect.right) {
        gameOver();
    }
}

function collisionSecondObs() {
    let dinoRect = dinosaur.getBoundingClientRect();
    let secondObstacleRect = secondObstacle.getBoundingClientRect();
    if (dinoRect.bottom > secondObstacleRect.top
        && dinoRect.top < secondObstacleRect.bottom
        && dinoRect.right > secondObstacleRect.left
        && dinoRect.left < secondObstacleRect.right) {
        gameOver();
    }
}

function collision() {
    collisionFirstObs();
    collisionSecondObs();
}

function gameOver() {
    clearInterval(intervalIdTime);
    clearInterval(intervalIdFirstObstacle);
    clearInterval(intervalIdSecondObstacle);
    let container = document.querySelector('.container');
    let message = document.createElement('p');
    message.innerText = "GAME OVER!!!";
    message.style.fontSize = "4rem";
    message.style.position = "absolute";
    message.style.top = "30%";
    message.style.left = "50%";
    message.style.transform = "translate(-50%, -50%)";
    message.style.textAlign = "center";
    container.appendChild(message);
}

