const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const height = 600;
const width = 600;

let control = true;

let who = false;

const board = [];
for (let i=0; i<15; i++) {
    board[i] = [];
    for (let o=0; o<15; o++) {
        board[i][o] = 0;
    }
}

const w = height / 15;

function drawQipan() {
    ctx.lineWidth = "1";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    for (let i=0; i<15; i++) {
        for (let o=0; o<15; o++) {
            ctx.moveTo(w, i*w+w);
            ctx.lineTo(o*w+w, i*w+w);
        }
    }

    for (let i=0; i<15; i++) {
        for (let o=0; o<15; o++) {
            ctx.moveTo(i*w+w, w);
            ctx.lineTo(i*w+w, o*w+w);
        }
    }
    ctx.stroke();
}

function init() {
    ctx.fillStyle = "yellow";
    ctx.rect(0, 0, 700, 700);
    ctx.fill();
    drawQipan();
}

function getMousePos(event) {
    if (!control) {
        return;
    }
    const e = event || window.event;
    const scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    let x = e.pageX || e.clientX + scrollX;
    let y = e.pageY || e.clientY + scrollY;

    const rx = x;
    const ry = y;

    x = Math.floor(x/40-1);
    y = Math.floor(y/40-1);
    if (x<0 || y<0 || x>14 || y>14) {
        return;
    }

    const nums = [[x, y], [x+1, y], [x, y+1], [x+1, y+1]];
    let min = 1000000;
    let index = 0;
    for (let i=0; i<4; i++) {
       let tem = Math.sqrt(Math.pow(rx-nums[i][0]*40-40, 2) + Math.pow(ry-nums[i][1]*40-40, 2));
       if (tem < min) {
           min = tem;
           index = i;
       }
    }

    if (board[nums[index][0]][nums[index][1]] !== 0) {
        return;
    }

    putChess(nums[index][0], nums[index][1]);
    if (who) {
        board[nums[index][0]][nums[index][1]] = 1;
    } else {
        board[nums[index][0]][nums[index][1]] = 2;
    }
    who = !who;

    panduan(nums[index][0], nums[index][1]);
}

function panduan(x, y) {
    let n = 0;
    if (!who) {
        n = 1;
    } else {
        n = 2;
    }
    let r = 0;
    let c = 0;
    for (let i=0; i<15; i++) {
        if (board[i][y] === n) {
            c++;
            if (c >= 5) {
                break;
            }
        } else {
            c = 0;
        }
        if (board[x][i] === n) {
            r++;
            if (r >= 5) {
                break;
            }
        } else {
            r = 0;
        }
    }

    if (r >= 5 || c>=5) {
        setResult();
        return;
    }

    let a = x;
    let b = y;
    while (a!=0 && b!=0) {
        a -= 1;
        b -= 1;
    }

    let count = 0;
    while (a!=15 && b!=15) {
        if (board[a][b] === n) {
            count += 1;
            if (count >= 5) {
                break;
            }
        } else {
            count = 0;
        }
        a += 1;
        b += 1;
    }

    if (count >= 5) {
        setResult();
        return;
    }

    a = x;
    b = y;
    while (a!=0 && b!=14) {
        a -= 1;
        b += 1;
    }

    count = 0;
    while (a!=15 && b!=-1) {
        if (board[a][b] === n) {
            count += 1;
            if (count >= 5) {
                break;
            }
        } else {
            count = 0;
        }
        a += 1;
        b -= 1;
    }

    if (count >= 5) {
        setResult();
    }
}

function putChess(x, y) {
    let turn = document.getElementById("turn");
    if (who) {
        ctx.fillStyle = "white";

        ctx.strokeStyle = "gray";
        ctx.beginPath();
        ctx.arc(x*w + w, y*w + w, 20, 0, 2*Math.PI);
        ctx.stroke();

        turn.innerText = "轮到黑子下棋";
    } else {
        ctx.fillStyle = "black";
        turn.innerText = "轮到白子下棋";
    }
    ctx.beginPath();
    ctx.arc(x*w + w, y*w + w, 20, 0, 2*Math.PI);
    ctx.fill();
}

function setResult() {
    const p = document.getElementById("result");
    if (who) {
        p.innerText = "黑子获胜";
    } else {
        p.innerText = "白子获胜";
    }
    control = false;
}

init();