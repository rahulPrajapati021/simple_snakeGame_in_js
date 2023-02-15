const box = document.getElementById("box");
const snake = document.getElementById("snake");
const fruit = document.getElementById("fruit");
const restartBtn = document.getElementById("restartBtn");
const speedRange = document.getElementById("speed");
const msg = document.getElementById("msg");

let snakeTail = document.getElementsByClassName("snakeTail");
let snakeTailBox = document.querySelector(".snakeTailBox");

const width = 300;
const height = 300;

let score = 0;
let scoreBoard = document.getElementById("scoreBoard");



let fruitX = (Math.round(Math.random() * 24) + 2) * 10;
let fruitY = (Math.round(Math.random() * 24) + 2) * 10;

let snakeX = width / 2;
let snakeY = height / 2;

let dir = "stop";


let gameOver = false;

let tail = 0;

let prevX = snakeX;
let prevY = snakeY;

let tailX = [];
let tailY = [];


function setValues() {
    snake.style.left = `${snakeX}px`;
    snake.style.top = `${snakeY}px`;

    fruit.style.left = `${fruitX}px`;
    fruit.style.top = `${fruitY}px`;
    for (let k = 0; k < tail; k++) {
        snakeTail[k].style.left = `${tailX[k]}px`;
        snakeTail[k].style.top = `${tailY[k]}px`;
    }
}

function removeMsg() {
    document.getElementById('msgBox').style.display = 'none';
}

function resetValues() {
    fruitX = (Math.round(Math.random() * 24) + 2) * 10;
    fruitY = (Math.round(Math.random() * 24) + 2) * 10;

    snakeX = width / 2;
    snakeY = height / 2;

    dir = "stop";

    score = 0;

    gameOver = false;

    tail = 0;

    prevX = snakeX;
    prevY = snakeY;

    tailX = [];
    tailY = [];

    msg.innerText = "";

    snakeTailBox.innerHTML = "";
    removeMsg();
}

//input 

function setDir(direction) {
    switch (direction) {
        case 'a':
            dir = "left";
            break;
        case 'd':
            dir = "right";
            break;
        case 'w':
            dir = "up";
            break;
        case 's':
            dir = "down";
            break;
        case 'x':
            dir = "stop";
            break;
    }
}

window.addEventListener("keypress", (e) => {
    switch (e.key) {
        case 'a':
            dir = "left";
            break;
        case 'd':
            dir = "right";
            break;
        case 'w':
            dir = "up";
            break;
        case 's':
            dir = "down";
            break;
        case 'x':
            dir = "stop";
            break;
    }
});

function logic() {
    if (!gameOver) {
        switch (dir) {
            case "left":
                snakeX = snakeX - 10;
                break;
            case "right":
                snakeX = snakeX + 10;
                break;
            case "up":
                snakeY = snakeY - 10;
                break;
            case "down":
                snakeY = snakeY + 10;
                break;
            case "stop":
                snakeX;
                snakeY;
                break;
        };
        if (prevX != snakeX || prevY != snakeY) {
            tailX.unshift(prevX);
            tailY.unshift(prevY)
            prevX = snakeX;
            prevY = snakeY;
        }
        if (snakeX >= width || snakeX <= 0 || snakeY >= height || snakeY <= 0) {
            gameOver = true;
            setTimeout(() => {
                msg.innerHTML = `
                Gameover score : ${score}
                <br> 
                <input type="button" id="restartBtn" onclick="resetValues()" value="Restart">
                `;
                document.getElementById("msgBox").style.display = 'flex';    
            }, 500);
        }

        if (snakeX == fruitX && snakeY == fruitY) {
            fruitX = (Math.round(Math.random() * 24) + 2) * 10;
            fruitY = (Math.round(Math.random() * 24) + 2) * 10;
            tail++;
            let snakeHtml = "<div class='snakeTail'></div>";
            snakeTailBox.innerHTML += snakeHtml;
            score++;
            scoreBoard.innerText = score;
        }

        for (let i = 0; i < tail; i++) {
            let snakeTailX = snakeTail[i].style.left;
            let snakeTailY = snakeTail[i].style.top;
            if (snakeTailX == `${snakeX}px` && snakeTailY == `${snakeY}px`) {
                gameOver = true;
                setTimeout(() => {
                    msg.innerHTML = `
                    Gameover you ate yourself score : ${score}
                    <br> 
                    <input type="button" id="restartBtn" onclick="resetValues()" value="Restart">
                    `;
                    document.getElementById("msgBox").style.display = 'flex';    
                }, 500);
            }
        }
        setValues();
    }
}

setInterval(logic, 100);

setValues();
