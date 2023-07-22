const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghost");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};
let fps = 30;
let oneBlockSize = 20;
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";

let map = [ 
    [1,1,1,1,1, 1,1,1,1,1, 1,1,0,1,1, 1,1,1,1,1, 1,1,1,1,1],
    [1,0,0,0,0, 0,0,0,1,1, 1,0,0,0,1, 1,1,0,0,0, 0,0,0,0,1],
    [1,0,1,1,0, 1,1,0,1,1, 0,0,1,0,0, 1,1,0,1,1, 0,1,1,0,1],
    [1,0,1,1,0, 0,1,0,1,1, 0,1,1,1,0, 1,1,0,1,0, 0,1,1,0,1],
    [1,0,0,0,1, 0,1,0,0,0, 0,1,1,1,0, 0,0,0,1,0, 1,0,0,0,1],
    [1,0,1,1,0, 0,1,0,1,1, 0,1,1,1,0, 1,1,0,1,0, 0,1,1,0,1],
    [1,0,1,1,0, 1,1,0,1,1, 0,1,1,1,0, 1,1,0,1,1, 0,1,1,0,1],
    [1,0,0,0,0, 0,0,0,1,1, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1],
    [1,0,1,0,1, 1,1,0,0,0, 0,1,1,1,1, 0,1,1,1,0, 1,1,1,0,1],
    [1,1,1,0,1, 1,0,0,1,1, 0,0,0,0,0, 0,0,0,0,0, 1,1,1,1,1],
    [1,0,1,0,1, 1,0,1,1,1, 0,1,1,1,1, 0,1,1,1,0, 1,1,1,0,1],
    [1,0,0,0,0, 0,0,0,0,1, 0,1,0,0,1, 0,1,0,0,0, 0,0,0,0,1],
    [1,0,1,1,1, 1,0,1,1,1, 0,0,0,0,1, 0,1,1,1,1, 1,1,1,0,1],
    [1,0,0,0,0, 0,0,0,0,1, 0,1,0,0,1, 0,1,0,0,0, 0,0,0,0,1],
    [1,0,1,0,1, 1,0,1,1,1, 0,1,1,1,1, 0,1,1,1,0, 1,1,1,0,1],
    [1,1,1,0,1, 1,0,0,1,1, 0,0,0,0,0, 0,0,0,0,0, 1,1,1,1,1],
    [1,0,1,0,1, 1,1,0,0,0, 0,1,1,1,1, 0,1,1,1,0, 1,1,1,0,1],
    [1,0,0,0,0, 0,0,0,1,1, 0,0,0,0,0, 0,0,0,0,0, 0,0,0,0,1],
    [1,0,1,1,0, 1,1,0,1,1, 0,1,1,1,0, 1,1,0,1,1, 0,1,1,0,1],
    [1,0,1,1,0, 0,1,0,1,1, 0,1,1,1,0, 1,1,0,1,0, 0,1,1,0,1],
    [1,0,0,0,1, 0,1,0,0,0, 0,1,1,1,0, 0,0,0,1,0, 1,0,0,0,1],
    [1,0,1,1,0, 0,1,0,1,1, 0,1,1,1,0, 1,1,0,1,0, 0,1,1,0,1],
    [1,0,1,1,0, 1,1,0,1,1, 0,0,1,0,0, 1,1,0,1,1, 0,1,1,0,1],
    [1,0,0,0,0, 0,0,0,1,1, 1,0,0,0,1, 1,1,0,0,0, 0,0,0,0,1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,0,1,1, 1,1,1,1,1, 1,1,1,1,1],
];

let gameLoop = () => {
    update();
    draw();
};

let update = () => {
    // todo
};

let draw = () => { // I had some difficulty with the canvas, so I unwrapped it manually.
    canvasContext.save(); 
    canvasContext.clearRect(0, 0, canvas.width, canvas.height, "black"); 
    canvasContext.translate(canvas.width, 0);
    canvasContext.rotate(Math.PI / 2);
    drawWalls();
    canvasContext.restore();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    "#5555ff"
                );
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }

                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
            }
        }
    }
};
