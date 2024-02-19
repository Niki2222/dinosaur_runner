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
let intervalIdObstacle;
let intervalIdObstacleBird;
let newObstacle = document.createElement("div");
let newObstacleBird = document.createElement("div");

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
    let rightPosGround = 0;
    let rightPosBird = 0;
    setTimeout(function () {
        createObstacle(newObstacleBird, 30, 30, 60, 0);
        intervalIdObstacleBird = setInterval(function () {
        rightPosBird += 1;
        newObstacleBird.style.right = `${rightPosBird}px`;
        if (rightPosBird === screenEnd) {
            rightPosBird = 0;
        }
        }, 5);
    }, 2000);
    createObstacle(newObstacle, 30, 30, 19, 0);
    intervalIdObstacle = setInterval(function () {
        rightPosGround += 1;
        newObstacle.style.right = `${rightPosGround}px`;
        if (rightPosGround === screenEnd) {
            rightPosGround = 0;
        }
        collision();
    }, 5);
}

function collisionGroundObs() {
    let dinoRect = dinosaur.getBoundingClientRect();
    let obstacleGroundRect = newObstacle.getBoundingClientRect();
    if (dinoRect.bottom > obstacleGroundRect.top
        && dinoRect.top < obstacleGroundRect.bottom
        && dinoRect.right > obstacleGroundRect.left
        && dinoRect.left < obstacleGroundRect.right) {
        gameOver();
    }
}

function collisionBirdObs() {
    let dinoRect = dinosaur.getBoundingClientRect();
    let obstacleBirdRect = newObstacleBird.getBoundingClientRect();
    if (dinoRect.bottom > obstacleBirdRect.top
        && dinoRect.top < obstacleBirdRect.bottom
        && dinoRect.right > obstacleBirdRect.left
        && dinoRect.left < obstacleBirdRect.right) {
        gameOver();
    }
}

function collision() {
    collisionGroundObs();
    collisionBirdObs();
}

function gameOver() {
    clearInterval(intervalIdTime);
    clearInterval(intervalIdObstacle);
    clearInterval(intervalIdObstacleBird);
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

