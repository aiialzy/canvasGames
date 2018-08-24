const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const preview = document.getElementById("preview");
const pctx = preview.getContext("2d");

const content = document.getElementById("score");

let wh = drawGrid(ctx, canvas.width, canvas.height, 20, 20);
let activeShape = null;
let nextShape = null;

let goFlag = null;
let drawFlag = null;

let addFlag = 0;

let score = 500;

function drawMap() {
    ctx.fillStyle = "gray";
    for (let x=0; x<map.length; x++) {
        for (let y=0; y<map[0].length; y++) {
            if (map[x][y]) {
                ctx.fillRect(x*wh.wg_size, y*wh.hg_size, wh.wg_size, wh.hg_size);
            }
        }
    }
}


function drawShape() {
    ctx.fillStyle = activeShape.color;
    for (let i=0; i<activeShape.body.length; i++) {
        ctx.fillRect(activeShape.body[i][0]*wh.wg_size, activeShape.body[i][1]*wh.hg_size, wh.wg_size, wh.hg_size);
    }
}


function control(e) {
    switch(e.which) {
        case 32:
        case 119:
            activeShape.chshape();
            break;
        
        case 115:
            falldown()
            break;

        case 97:
            moveLeft();
            break;

        case 100:
            moveRight();
            break;
    }
}

function moveLeft() {
    let tem = tem_copy(activeShape.body);
    for (let i=0; i<tem.length; i++) {
        tem[i][0] -= 1;
    }
    if (!isLRCrash(tem)) {
        activeShape.body = tem.slice(0);
    }
}

function moveRight() {
    let tem = tem_copy(activeShape.body);
    for (let i=0; i<tem.length; i++) {
        tem[i][0] += 1;
    }
    if (!isLRCrash(tem)) {
        activeShape.body = tem.slice(0);
    }
}

function isLRCrash(tem) {
    let x = 0;
    let y = 0;
    for (let i=0; i<tem.length; i++) {
        x = tem[i][0];
        y = tem[i][1];
        if (x>=20 || x<0 || map[x][y]) {
            return true;
        }
    }
    return false;
}

function tem_copy(body) {
    let tem = [];
    for (let i=0; i<body.length; i++) {
        let t = [];
        for (let o=0; o<body[0].length; o++) {
            t.push(body[i][o]);
        }
        tem.push(t);
    }
    return tem;
}

function falldown() {
    if (isDownCrash(activeShape.body)) {
        crash();
        return true;
    } else {
        for (let i=0; i<activeShape.body.length; i++) {
            activeShape.body[i][1] += 1;
        }
    }
    return false;
}

function isDownCrash(tem) {
    let x = 0;
    let y = 0;
    for (let i=0; i<tem.length; i++) {
        x = tem[i][0];
        y = tem[i][1] + 1;
        if (y>=0 && y<20 && map[x][y]) {
            return true;
        } else if (y >= 20) {
            return true;
        }
    }
}

function crash() {
    let x = 0;
    let y = 0;
    let tem = activeShape.body;
    for (let i=0; i<activeShape.body.length; i++) {
        x = tem[i][0];
        y = tem[i][1];
        if (y === -1) {
            gg();
        }
        map[x][y] = true;
    }

    removeLine();
    createShape();
}

function gg() {
    clearInterval(goFlag);
    clearInterval(drawFlag);
    document.getElementById("content").style = "visibility: visible";
    document.body.removeEventListener("keypress", control);
    document.body.addEventListener("keypress", nextGame);
}

function createShape() {
    activeShape = nextShape;
    nextShape = shapes[Math.floor(Math.random()*7)];
    for (let i=0; i<activeShape.body.length; i++) {
        activeShape.body[i][0] = activeShape.backups[i][0];
        activeShape.body[i][1] = activeShape.backups[i][1];
    }
    pctx.fillStyle = nextShape.color;
    pctx.clearRect(0, 0, preview.width, preview.height);
    for (let i=0; i<nextShape.backups.length; i++) {
        pctx.fillRect((nextShape.backups[i][0]-8)*wh.wg_size, (nextShape.backups[i][1]+1)*wh.hg_size, wh.wg_size, wh.hg_size);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, canvas.width, canvas.height, 20, 20);
    drawMap();
    drawShape();
}



function init() {
    for (let x=0; x<20; x++) {
        for (let y=0; y<20; y++) {
            map[x][y] = false;
        }
    }
    document.removeEventListener("keypress", nextGame);
    document.body.addEventListener("keypress", control);
    document.getElementById("content").style = "visibility: hidden";
    nextShape = shapes[Math.floor(Math.random()*7)];
    goFlag = setInterval(falldown, 500);
    drawFlag = setInterval(draw, 15);
    createShape();
    score = 0;
    addFlag = 0;
    document.getElementById("score").innerText = "得分: " + score;
}

init();

function removeLine() {
    let flag = true;
    let count = 0;

    for (let x=0; x<map.length; x++) {
        flag = true;
        for (let y=0; y<map.length; y++) {
            if (!map[y][x]) {
                flag = false;
                break;
            }
        } 
        if (flag) {
            for (let i=x; i>0; i--) {
                for (let y=0; y<map[0].length; y++) {
                    map[y][i] = map[y][i-1];
                }
            }
            for (let y=0; y<map[0].length; y++) {
                map[y][0] = false;
            }
            count += 1;
        }
    }
    for (let i=1; i<=count; i++) {
        score += i*100;
    }
    if (Math.floor(score/500) > addFlag) {
        addBlock();
        addFlag = Math.floor(score/500);
    }
    document.getElementById("score").innerText = "得分: " + score;
}

function addBlock() {
    for (let y=0; y<map[0].length-1; y++) {
        for (let x=0; x<map.length; x++) {
            map[x][y] = map[x][y+1];
        }
    }
    for (let x=0; x<map[0].length; x++) {
        map[x][map[0].length-1] = Math.floor(Math.random()*10)>=4 ? true : false;
    }
}

function nextGame(e) {
    if (e.which === 13) {
        init();
    }
}