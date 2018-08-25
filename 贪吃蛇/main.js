const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const content = document.getElementById("score");

let wh = drawGrid(ctx, canvas.width, canvas.height, 20, 20);
let goFlag = null;
let drawFlag = null;
let score = 0;

let snake = {
    body: [],
    dir: "right",
    speed: 100,
    currentDir: "right",
    tail_x: 0,
    tail_y: 0,
}

let apple = {
    x: 0,
    y: 0,
}

let flags = {
    crashBody: true,
    crashWall: true,
    moveStyle: 2,
}

function drawSnake() {
    ctx.fillStyle = "blue";
    for (let i=1; i<snake.body.length; i++) {
        ctx.fillRect(snake.body[i].x * wh.wg_size, snake.body[i].y*wh.hg_size, wh.wg_size, wh.hg_size);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(snake.body[0].x * wh.wg_size, snake.body[0].y*wh.hg_size, wh.wg_size, wh.hg_size);
}

function move() {
    snake.tail_x = snake.body[snake.body.length-1].x;
    snake.tail_y = snake.body[snake.body.length-1].y;
    for (let i=snake.body.length-1; i>0; i--) {
        snake.body[i].x = snake.body[i-1].x;
        snake.body[i].y = snake.body[i-1].y;
    }
    switch (snake.dir) {
        case "up":
            if (snake.currentDir !== "down") {
                snake.body[0].y -= 1;
                snake.currentDir = "up";
            } else {
                snake.body[0].y += 1;
            }
            break;

        case "down":
            if (snake.currentDir !== "up") {
                snake.body[0].y += 1;
                snake.currentDir = "down"
            } else {
                snake.body[0].y -= 1;
            }
            break;

        case "left":
            if (snake.currentDir !== "right") {
                snake.body[0].x -= 1;
                snake.currentDir = "left";
            } else {
                snake.body[0].x += 1;
            }
            break;
            

        case "right":
            if (snake.currentDir !== "left") {
                snake.body[0].x += 1;
                snake.currentDir = "right";
            } else {
                snake.body[0].x -= 1;
            }
            break;
    }
    if (flags.crashBody && isCrashBody()) {
        gg();
    } else if (flags.crashWall && isCrashWall()) {
        gg();
    } else {
        moveOStyle();
        if (isEatApple()) {
            eatApple();
        }
    }
}

function eatApple() {
    snake.body.push({
        x: snake.tail_x,
        y: snake.tail_y,
    });
    createApple();
    score += 1;
    clearInterval(goFlag);
    snake.speed -= 1;
    goFlag = setInterval(move, snake.speed);
    content.innerText = "速度: " + (1000/snake.speed) + "    得分:" + score;
}

function moveOStyle() {
    switch (flags.moveStyle) {
        case 1:
            if (snake.body[0].x === -1) {
                snake.body[0].x = 19;
            } else if (snake.body[0].x === 20) {
                snake.body[0].x = 0;
            } else if (snake.body[0].y === -1) {
                snake.body[0].y = 19;
            } else if (snake.body[0].y === 20) {
                snake.body[0].y = 0;
            }
            break;
    }
}

function gg() {
    clearInterval(goFlag);
    clearInterval(drawFlag);
    document.getElementById("content").style = "visibility: visible";
    document.body.removeEventListener("keypress", chdir);
    document.body.addEventListener("keypress", nextGame);
}

function nextGame(e) {
    if (e.which === 13) {
        newGame();
    }
}

function chdir(e) {
    switch(e.which) {
        case 119:
            snake.dir = "up";
            break;

        case 115:
            snake.dir = "down";
            break;

        case 97:
            snake.dir = "left";
            break;

        case 100:
            snake.dir = "right";
            break;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height, 20, 20)
    drawSnake();
    drawApple();
}

function isCrashBody() {
    for (let i=3; i<snake.body.length; i++) {
        if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
            return true;
        }
    }
    return false;
}

function isCrashWall() {
    if (snake.body[0].x === 20 || snake.body[0].x === -1 || snake.body[0].y === 20 || snake.body[0].y === -1) {
        return true;
    }
    return false;
}

function isEatApple() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        return true;
    }
    return false;
}


function init() {
    score = 0;
    for (let i=4; i>=0; i--) {
        snake.body.push({
            x: i,
            y: 0,
        });
    }
    createApple();
    goFlag = setInterval(move, snake.speed);
    drawFlag = setInterval(draw, 15);
    document.body.addEventListener("keypress", chdir);
    content.innerText = "速度: " + (1000 / snake.speed) + "    得分:" + score;
}

document.getElementById("newGame").addEventListener("click", newGame);
function newGame() {
    snake = {
        body: [],
        dir: "right",
        speed: 100,
        currentDir: "right",
    }
    clearInterval(goFlag);
    clearInterval(drawFlag);
    document.body.removeEventListener("keypress", chdir);
    document.body.removeEventListener("keypress", nextGame);
    document.getElementById("content").style = "visibility: hidden";
    init();
}

function createApple() {
    if (snake.body.length >= 400) {
        return;
    }
    let flag = true;
    while(true) {
        apple.x = Math.floor(Math.random() * 20);
        apple.y = Math.floor(Math.random() * 20);
        flag = true;
        for (let i=0; i<snake.body.length; i++) {
            if (apple.x === snake.body[i].x && apple.y === snake.body[i].y) {
                flag = false;
                break;
            }
        }
        if (flag) {
            break;
        }
    } 
}

function drawApple() {
    ctx.fillStyle = "green";
    ctx.fillRect(apple.x * wh.wg_size, apple.y*wh.hg_size, wh.wg_size, wh.hg_size);
}

document.body.addEventListener("keypress", nextGame);

document.getElementById("crash_body").addEventListener("change", function(){
    flags.crashBody = this.checked;
});

document.getElementById("crash_wall").addEventListener("change", function(){
    flags.crashWall = this.checked;
});

document.getElementById("rev").addEventListener("change", function() {
    flags.moveStyle = parseInt(this.value);
});
document.getElementById("outside").addEventListener("change", function() {
    flags.moveStyle = parseInt(this.value);
});