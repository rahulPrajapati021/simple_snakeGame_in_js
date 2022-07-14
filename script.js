const box = document.getElementById("box"); //grabing the main container, i dont think i used them anywhere
const snake = document.getElementById("snake"); //its snake element div
const fruit = document.getElementById("fruit"); // fruit element
const restartBtn = document.getElementById("restartBtn"); // restart btn is at last in the html page
const speedRange = document.getElementById("speed"); // this is for future updates, stay tune 
const msg = document.getElementById("msg"); // msg element for very important status of game

let snakeTail = document.getElementsByClassName("snakeTail"); // yeah its not const because i will change its value, yeah i m dumb
let snakeTailBox = document.querySelector(".snakeTailBox"); //rista bahi soch nayi, could not add the tail in box or inside snake element cause fo some bug 

const width = 300; // this is the replacement of canvas, no its not, yeah these value will help us alot
const height = 300; // so the width of main container/display is 300px so kind of mapping i gave width and hight as same

let fruitX = (Math.round(Math.random() * 24) + 2) * 10; // so random will give a random and ((* 24 + 2) * 10) is a limit that means it will generate number btw 20 to 260
let fruitY = (Math.round(Math.random() * 24) + 2) * 10; // upper one is x cordinate and this one is y cordinate

let snakeX = width / 2; //yeah so here it will be clear to you snake's x cordinate is width half, so width and height are used as map
let snakeY = height / 2; // similarly this one

let dir = "stop"; // dir object tells about the direction snake is moving in so default is stop

let score = 0; // whats the point of a game if you dont have score, althought i didn't displayed it 

let gameOver = false; // yeah to stop the logic, a gameover flag

let tail = 0; // this specifies the number of tail we have initially 0 

let prevX = snakeX; // these element store the previous x and y cordinates of snake;
let prevY = snakeY; // again y cordinate

let tailX = []; // so tailX will store the previous values of snakeX 
let tailY = []; // and tailY will store y cordinates, these array of cordinate will be used for tail as cordinates

function setValues() { // this function set the values to snake, fruit and snakeTail
    snake.style.left = `${snakeX}px`; // so we need to set left and top values only for functioning
    snake.style.top = `${snakeY}px`;

    fruit.style.left = `${fruitX}px`; // this is for fruit
    fruit.style.top = `${fruitY}px`;
    for (let k = 0; k < tail; k++) { // so here we are using loop that will loop through snakeTail and tailX and Y, iteration count is number of tails
        snakeTail[k].style.left = `${tailX[k]}px`; // 
        snakeTail[k].style.top = `${tailY[k]}px`;
    }
}

function resetValues() { // this function is used by restart function, this resets the variables to initial values
    fruitX = (Math.round(Math.random() * 24) + 2) * 10; // generating the fruit at random location 20 < x < 260 px
    fruitY = (Math.round(Math.random() * 24) + 2) * 10;

    snakeX = width / 2; // setting snake head (x and y) as half of width and height
    snakeY = height / 2;

    dir = "stop"; // initial position or status of snake

    score = 0;

    gameOver = false; 

    tail = 0; // number of tail will become zero

    prevX = snakeX; 
    prevY = snakeY;

    tailX = [];
    tailY = [];
    
    msg.innerText = ""; // initially the msg will be empty it will be set once the game ends

    snakeTailBox.innerHTML = ""; // so tails are html entities that are stored inside snakeTailBox so before restarting the game we need to remove all the tail elements
}

//input area 

function setDir(direction) { // this function invokes through the arrow key btn provided on page
    switch (direction) { // the direction is provided by the html document
        case 'a':
            dir = "left"; // according to the case we assign the direction to dir variable
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

window.addEventListener("keypress", (e) => { // this is for pc, i mean in pc you can directly control the snake using w a s d keys 
    switch (e.key) { // the callback is invoked when we press the following key, (event)
        case 'a':
            dir = "left"; // same as the upper part, we assign the dir according to the case
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

function logic() { // this is the main function for the game 
    if (!gameOver) { //so it will check if the game is over
        switch (dir) { // so according to direction we move the snake element
            case "left":
                snakeX = snakeX - 10; // first i typed it as snake-- but its too slow and snakeX -= 10 was not working right so i just wrote it in brief manner
                break;
            case "right":
                snakeX = snakeX + 10; // explanation - the left top corner is 0,0  cordinate and as we move forward the cordinate increase
                break;                // so if we move up we are decreasing y, as we move down we are increasing y, same with x 
            case "up":                // when moving left we are decresing x, and when moving right we are increasing x
                snakeY = snakeY - 10;
                break;
            case "down":
                snakeY = snakeY + 10;
                break;
            case "stop":
                snakeX; // i didn't know what to do when dir is stop 
                snakeY; // so i just wrote snakex and y, this case can we empty 
                break;
        };
        // upper switch case was assigning values to snake, this is to assign values to tail
        if (prevX != snakeX || prevY != snakeY) { 
            // so first we will compare the prev and snakeX, at the starting we assigned prevX/Y as snakeX/Y so the initial value is stored in them
            // now when the snake moves the snakeX/Y changes. these changes will be observed by this comparison
            tailX.unshift(prevX); // first we are updating the first index of tailX and Y 
            tailY.unshift(prevY); // this is similar to tailX[0] and tailY[0] = prevX and y
            prevX = snakeX; // now we are reassigning the prev variables with current cordinates
            prevY = snakeY;
            //the idea behind this is that we record the changed cordinates
            //if we dont compare but assign then the same values will be stored for many index
        }
        
        // now we will check if we crossed the border, if did then its game over
        if (snakeX == width || snakeX == 0 && snakeY == height || snakeY == 0) {
            gameOver = true; // right now it will be gameover, but crossing through the border feature will be added soon
            msg.innerText = "Gameover"; // if we crossed the border then msg will updated and gameOver flag will be true
        }
        // now check if we ate the food
        if (snakeX == fruitX && snakeY == fruitY) { // if the cordinates of snake head (X and Y) is same as fruit (X and Y) then we ate the food
            score++; // first increment the score
            fruitX = (Math.round(Math.random() * 24) + 2) * 10; // change the cordinates of fruit 
            fruitY = (Math.round(Math.random() * 24) + 2) * 10; // same code at the starting.
            tail++; // now we ate a fruit so we need to add a tail so increment the number of tail
            let snakeHtml = "<div class='snakeTail'></div>"; // now this html element will be added to the tail box
            snakeTailBox.innerHTML += snakeHtml; // so we are appedning a new tail everytime we eat a fruit
        }
        //now check whether we ate the tail
        //to check this we need to loop through all the cordinates the tail elements have
        for (let i = 0; i < tail; i++) {
            let snakeTailX = snakeTail[i].style.left; // i was unable to check this using the tailX and Y arrays
            let snakeTailY = snakeTail[i].style.top; // so i directly the grab the cordinates the tail have and started looping through them
            if (snakeTailX == `${snakeX}px` && snakeTailY == `${snakeY}px`) { 
                // in snakeTailX and Y we will be get values as 120px, 230px etc so we need to remove px or either compare along with them 
                gameOver = true; // so yeah if tail and snake head collide then gameOver
                msg.innerText = "Gameover you ate yourself"; 
            }
        }
        setValues(); // so after completion of complete logic part we need to update the values on display/html
    }
}

setInterval(logic, 100); // i was unable to call logic function inside while loop so i did this

setValues(); // here this function is kind of setUp function, means we need to set values to fruit and snake for the first time.
