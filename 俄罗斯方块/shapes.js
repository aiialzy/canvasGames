const map = [];
for (let x=0; x<20; x++) {
    let tem = [];
    for (let y=0; y<20; y++) {
        tem.push(false);
    }
    map.push(tem);
}

function shapeIsCrash(map, tem) {
    let x = 0;
    let y = 0;
    for (let i=0; i<tem.length; i++) {
        x = tem[i][0];
        y = tem[i][1];
        if (map[x][y]) {
            return true;
        } else if (y >= 19) {
            return true;
        }
    }
    return false;
}

let shape1 = {
    backups:[
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0],
    ],

    body: [
        [8, 0],
        [9, 0],
        [10, 0],
        [11, 0],
    ],

    color: "#00F0F0",
    
    currentShape: 0,

    chshape: function() {
        let tem = tem_copy(this.body);
        switch(this.currentShape) {
            case 0:
                for (let i=0; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }
                tem[0][1] = tem[2][1]-2;
                tem[1][1] = tem[2][1]-1;
                tem[3][1] = tem[2][1]+1;
                break;
            
            case 1:
                for (let i=0; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }
                tem[0][0] = tem[2][0]-2;
                tem[1][0] = tem[2][0]-1;
                tem[3][0] = tem[2][0]+1;
                break;
        }
        if (!shapeIsCrash(map, tem)) {
            this.body = tem.slice(0);
            this.currentShape += 1;
            this.currentShape %= 2;
        }
    },
}

let shape2 = {
    backups:[
        [8, -1],
        [8, 0],
        [9, 0],
        [10, 0],
    ],

    body: [
        [8, -1],
        [8, 0],
        [9, 0],
        [10, 0],
    ],

    color: "#0000F0",

    currentShape: 0,

    chshape: function() {
        let tem = tem_copy(this.body);
        switch(this.currentShape) {
            case 0:
                tem[0][0] = tem[2][0] + 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }
                tem[0][1] = tem[2][1] - 1; 
                tem[1][1] = tem[2][1] - 1; 
                tem[3][1] = tem[2][1] + 1; 
                break;

            case 1:
                tem[0][1] = tem[2][1] + 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }
                tem[0][0] = tem[2][0] + 1;
                tem[1][0] = tem[2][0] + 1;
                tem[3][0] = tem[2][0] - 1;
                break;

            case 2:
                tem[0][0] = tem[2][0] - 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }
                tem[0][1] = tem[2][1] + 1; 
                tem[1][1] = tem[2][1] + 1; 
                tem[3][1] = tem[2][1] - 1; 
                break;

            case 3:
                tem[0][1] = tem[2][1] - 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }
                tem[0][0] = tem[2][0] - 1;
                tem[1][0] = tem[2][0] - 1;
                tem[3][0] = tem[2][0] + 1;
                break;
        }
        if (!shapeIsCrash(map, tem)) {
            this.body = tem.slice(0);
            this.currentShape += 1;
            this.currentShape %= 4;
        }
    }
}

let shape3 = {
    backups:[
        [10, -1],
        [8, 0],
        [9, 0],
        [10, 0],
    ],

    body: [
        [10, -1],
        [8, 0],
        [9, 0],
        [10, 0],
    ],

    color: "#F0A100",

    currentShape: 0,

    chshape: function() {
        let tem = tem_copy(this.body);
        switch(this.currentShape) {
            case 0:
                tem[0][0] = tem[2][0] + 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }
                tem[0][1] = tem[2][1] + 1; 
                tem[1][1] = tem[2][1] - 1; 
                tem[3][1] = tem[2][1] + 1; 
                break;

            case 1:
                tem[0][1] = tem[2][1] + 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }
                tem[0][0] = tem[2][0] - 1;
                tem[1][0] = tem[2][0] + 1;
                tem[3][0] = tem[2][0] - 1;
                break;

            case 2:
                tem[0][0] = tem[2][0] - 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }
                tem[0][1] = tem[2][1] - 1; 
                tem[1][1] = tem[2][1] + 1; 
                tem[3][1] = tem[2][1] - 1; 
                break;

            case 3:
                tem[0][1] = tem[2][1] - 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }
                tem[0][0] = tem[2][0] + 1;
                tem[1][0] = tem[2][0] - 1;
                tem[3][0] = tem[2][0] + 1;
                break;
        }
        if (!shapeIsCrash(map, tem)) {
            this.body = tem.slice(0);
            this.currentShape += 1;
            this.currentShape %= 4;
        }
    }
}

let shape4 = {
    backups: [
        [9, -1],
        [10, -1],
        [9, 0],
        [10, 0],
    ],

    body: [
        [9, -1],
        [10, -1],
        [9, 0],
        [10, 0],
    ],

    color: "#F0F000",

    currentShape: 0,

    chshape: function() {

    }
}

let shape5 = {
    backups: [
        [8, 0],
        [9, 0],
        [9, -1],
        [10, -1],
    ],

    body: [
        [8, 0],
        [9, 0],
        [9, -1],
        [10, -1],
    ],

    color: "#00F000",

    currentShape: 0,

    chshape: function() {
        let tem = tem_copy(this.body);
        switch(this.currentShape) {
            case 0:
                tem[0][0] = tem[1][0];
                tem[0][1] = tem[1][1] - 1;

                tem[2][0] = tem[1][0] + 1;
                tem[2][1] = tem[1][1];

                tem[3][0] = tem[1][0] + 1;
                tem[3][1] = tem[1][1] + 1;
                break;

            case 1:
                tem[0][0] = tem[1][0] - 1;
                tem[0][1] = tem[1][1];

                tem[2][0] = tem[1][0];
                tem[2][1] = tem[1][1] - 1;

                tem[3][0] = tem[1][0] + 1;
                tem[3][1] = tem[1][1] - 1;
                break;
        }
        if (!shapeIsCrash(map, tem)) {
            this.body = tem.slice(0);
            this.currentShape += 1;
            this.currentShape %= 2;
        }
    }
}

let shape6 = {
    backups: [
        [9, -1],
        [8, 0],
        [9, 0],
        [10, 0],
    ],

    body: [
        [9, -1],
        [8, 0],
        [9, 0],
        [10, 0],
    ],

    color: "#A100F0",

    currentShape: 0,

    chshape: function() {
        let tem = tem_copy(this.body);
        switch(this.currentShape) {
            case 0:
                tem[0][0] = tem[2][0] + 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }

                tem[0][1] = tem[2][1];
                tem[1][1] = tem[2][1] - 1;
                tem[3][1] = tem[2][1] + 1;
                break;

            case 1:
                tem[0][1] = tem[2][1] + 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }

                tem[0][0] = tem[2][0];
                tem[1][0] = tem[2][0] - 1;
                tem[3][0] = tem[2][0] + 1;
                break;

            case 2:
                tem[0][0] = tem[2][0] - 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][0] = tem[2][0];
                }

                tem[0][1] = tem[2][1];
                tem[1][1] = tem[2][1] - 1;
                tem[3][1] = tem[2][1] + 1;
                break;
                
            case 3:
                tem[0][1] = tem[2][1] - 1;
                for (let i=1; i<tem.length; i++) {
                    tem[i][1] = tem[2][1];
                }

                tem[0][0] = tem[2][0];
                tem[1][0] = tem[2][0] - 1;
                tem[3][0] = tem[2][0] + 1;
                break;
        }
        if (!shapeIsCrash(map, tem)) {
            this.body = tem.slice(0);
            this.currentShape += 1;
            this.currentShape %= 4;
        }
    }

}

let shape7 = {
    backups: [
        [8, -1],
        [9, 0],
        [9, -1],
        [10, 0],
    ],

    body: [
        [8, -1],
        [9, 0],
        [9, -1],
        [10, 0],
    ],

    color: "#F00000",

    currentShape: 0,

    chshape: function() {
        let tem = tem_copy(this.body);
        switch(this.currentShape) {
            case 0:
                tem[0][0] = tem[1][0] - 1;
                tem[0][1] = tem[1][1] + 1;

                tem[2][0] = tem[1][0] - 1;
                tem[2][1] = tem[1][1];

                tem[3][0] = tem[1][0];
                tem[3][1] = tem[1][1] - 1;
                break;

            case 1:
                tem[0][0] = tem[1][0] - 1;
                tem[0][1] = tem[1][1] - 1;

                tem[2][0] = tem[1][0];
                tem[2][1] = tem[1][1] - 1;

                tem[3][0] = tem[1][0] + 1;
                tem[3][1] = tem[1][1];
                break;
        }
        if (!shapeIsCrash(map, tem)) {
            this.body = tem.slice(0);
            this.currentShape += 1;
            this.currentShape %= 2;
        }
    }
}

let shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];