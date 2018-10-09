var canvas = document.getElementById('canvas');
console.table(canvas);
var ctx = canvas.getContext('2d');

const height = 600;
const width = 600;

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
    ctx.rect(0, 0, 800, 800);
    ctx.fill();
    drawQipan();
}

function getMousePos(event) {
    var e = event || window.event;
    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX + scrollX;
    var y = e.pageY || e.clientY + scrollY;
    console.log('x: ' + x + '\ny: ' + y);

    panduan(x, y);
}

function panduan(x, y) {

}

let p1_cs = [];
let p2_cs = [];

function putChess(x, y, who) {
    ctx.fillStyle = "black";
    if (who) {
        ctx.fillStyle = "white";
    }
    ctx.beginPath();
    ctx.arc(x*w + w, y*w + w, 20, 0, 2*Math.PI);
    ctx.fill();
}

init();
putChess(0, 0, true);
putChess(1, 0, false);
putChess(0, 1, false);
putChess(1, 1, true);