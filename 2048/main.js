const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let map = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

let buffer = [];
copyNums();


function addNumber() {
    //检查是否还有空格子
    let flag = false;
    for (let x=0; x<4; x++) {
        for (let y=0; y<4; y++) {
            if (map[x][y] === 0) {
                flag = true;
            }
        }
        if (flag) {
            break;
        }
    }

    //如果有空格子就随机找一个进行添加
    if (flag) {
        let px = 0;
        let py = 0;
        do {
            px = Math.floor(Math.random() * 4);
            py = Math.floor(Math.random() * 4);
        }
        while (map[py][px] !== 0);
        if (Math.floor(Math.random() * 10) === 4) {
            map[py][px] = 4;
        } else {
            map[py][px] = 2;
        }
    }
}

function drawNumber() {
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            if (buffer[x][y] !== 0) {
                let offset_x = 0;
                let offset_y = 0;
                switch (Math.floor(Math.log10(buffer[x][y]))) {
                    case 0:
                        ctx.font = "90px Arial";
                        offset_x = 45;
                        offset_y = 105;
                        break;
                    case 1:
                        ctx.font = "85px Arial";
                        offset_x = 30;
                        offset_y = 103;
                        break;
                    case 2:
                        ctx.font = "80px Arial";
                        offset_x = 5;
                        offset_y = 103;
                        break;
                    case 3:
                        ctx.font = "65px Arial";
                        offset_x = 3;
                        offset_y = 99;
                        break;
                }
                ctx.fillText(buffer[x][y], y * 150 + offset_x, x * 150 + offset_y);
            }
        }
    }
}

function draw() {
    //主绘图逻辑

    //清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //画格子
    drawGrid(ctx, canvas.width, canvas.height, 4, 4, 1, "#000");
    //画数字
    drawNumber();
}

function control(e) {
    /*
    * 如果两个数是连在一块的,则在前面的数翻倍，当前的数变为0
    * 如果前面那个数是0则把当前的数挪到前面
    */
    let nums = [0, 0, 0, 0];
    switch (e.keyCode) {
        case 119:
            //向上
            //nums数组用于防止游戏出现数字连续翻倍的情况
            /*
            *   2, ...
            *   2, ...
            *   0, ...
            *   4, ...
            * 
            *   变成
            * 
            *   8, ...
            *   0, ...
            *   0, ...
            *   0, ...
            */
            for (let i=0; i<4; i++) {
                nums[i] = 0;
            }
            for (let x = 1; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    let tem = x;
                    while (tem != 0) {
                        if (tem>=nums[y] && map[tem][y] === map[tem - 1][y]) {
                            map[tem - 1][y] *= 2;
                            map[tem][y] = 0;
                            nums[y] = tem;
                            break;
                        } else if (map[tem - 1][y] === 0) {
                            map[tem - 1][y] = map[tem][y];
                            map[tem][y] = 0;
                        }
                        tem -= 1;
                    }
                }
            }
            break;

        case 115:
            //向下
            for (let i=0; i<4; i++) {
                nums[i] = 3;
            }
            for (let x = 2; x >= 0; x--) {
                for (let y = 0; y < 4; y++) {
                    let tem = x;
                    while (tem != 3) {
                        if (tem<=nums[y] && map[tem][y] === map[tem + 1][y]) {
                            map[tem + 1][y] *= 2;
                            map[tem][y] = 0;
                            nums[y] = tem;
                            break;
                        } else if (map[tem + 1][y] === 0) {
                            map[tem + 1][y] = map[tem][y];
                            map[tem][y] = 0;
                        }
                        tem += 1;
                    }
                }
            }
            break;

        case 97:
            //向左
            for (let i=0; i<4; i++) {
                nums[i] = 0;
            }
            for (let y = 1; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    let tem = y;
                    while (tem !== 0) {
                        if (tem>=nums[x] && map[x][tem] === map[x][tem - 1]) {
                            map[x][tem - 1] *= 2;
                            map[x][tem] = 0;
                            nums[x] = tem;
                            break;
                        } else if (map[x][tem - 1] === 0) {
                            map[x][tem - 1] = map[x][tem];
                            map[x][tem] = 0;
                        }
                        tem -= 1;
                    }
                }
            }
            break;

        case 100:
            //向右
            for (let i=0; i<4; i++) {
                nums[i] = 0;
            }
            for (let y = 2; y >= 0; y--) {
                for (let x = 0; x < 4; x++) {
                    let tem = y;
                    while (tem !== 3) {
                        if (tem<=nums[x] && map[x][tem] === map[x][tem + 1]) {
                            map[x][tem + 1] *= 2;
                            map[x][tem] = 0;
                            nums[x] = tem;
                            break;
                        } else if (map[x][tem + 1] === 0) {
                            map[x][tem + 1] = map[x][tem];
                            map[x][tem] = 0;
                        }
                        tem += 1;
                    }
                }
            }
            break;
    }
    if (e.which===119 || e.which===115 || e.which===97 || e.which===100) {
        main();
    }
}

function isWin() {
    //有2048就ok了
    for (let x=0; x<4; x++) {
        for (let y=0; y<4; y++) {
            if (map[x][y] === 2048) {
               return true; 
            }
        }
    }
    return false;
}

function isLose() {
    //如果每个数上下左右都没有空的或者相同的就GG了
    for (let x=0; x<4; x++) {
        for (let y=0; y<4; y++) {
            if (x>=1 && (map[x-1][y]===0 || map[x-1][y]===map[x][y])) {
               return false; 
            }
            if (x<=2 && (map[x+1][y]===0 || map[x+1][y]===map[x][y])) {
               return false; 
            }
            if (y>=1 && (map[x][y-1]===0 || map[x][y-1]===map[x][y])) {
               return false; 
            }
            if (y<=2 && (map[x][y+1]===0 || map[x][y+1]===map[x][y])) {
               return false; 
            }
        }
    }
    return true;
}

function isSame() {
    //检查map是否有变化
    for (let x=0; x<4; x++) {
        for (let y=0; y<4; y++) {
            if (map[x][y] !== buffer[x][y]) {
                return false;
            }
        }
    }
    return true;
}

function copyNums() {
    //数组深复制
    buffer = [];
    for (let i=0; i<4; i++) {
        buffer.push(map[i].slice(0));
    }
}

function main() {
    //游戏主逻辑

    //判断输赢
    if (isWin()) {
        draw();
        document.body.removeEventListener("keypress", control);
        document.body.addEventListener("keypress", newGame);
        document.getElementById("content").innerText = "你赢了";
        document.getElementById("result").style="display:block";
        return;
    }
    if (isLose()) {
        draw();
        document.body.removeEventListener("keypress", control);
        document.body.addEventListener("keypress", newGame);
        document.getElementById("content").innerText = "你输了";
        document.getElementById("result").style="display:block";
        return;
    }
    //如果数字有变化就添加一个数字
    if (!isSame()) {
        const count = 1 + Math.floor(Math.random()*1.5);
        for (let i=0; i<count; i++) {
            addNumber();
        }
    }
    copyNums();
    //重新绘图
    draw();
}

function newGame(e) {
    //回车后开始新的一局
    if (e.which===13) {
        document.getElementById("result").style="display:none";
        document.body.removeEventListener("keypress", this);
        for (let x=0; x<4; x++) {
            for (let y=0; y<4; y++) {
                map[x][y] =0; 
            }
        }
        init();
    }
}

//游戏初始化
function init() {
    const count = 1 + Math.floor(Math.random() * 2);
    for (let i=0; i<count; i++) {
        addNumber();
    }
    document.body.addEventListener("keypress", control);
    main();
}

init();