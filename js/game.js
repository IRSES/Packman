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

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

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

function rotateMap90DegreesRight(map) {
    const numRows = map.length;
    const numCols = map[0].length;

    const rotatedMap = new Array(numCols).fill(null).map(() => new Array(numRows));

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            rotatedMap[col][numRows - 1 - row] = map[row][col];
        }
    }

    return rotatedMap;
}

map = rotateMap90DegreesRight(map);


let gameLoop = () => {
    update();
    draw();
};

let update = () => {
    //todo
    pacman.moveProcess();
};

let draw = () => {  
    canvasContext.clearRect(0, 0, canvas.width, canvas.height, "black"); 
    drawWalls();
    canvasContext.restore();
    pacman.draw();
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

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );
};

createNewPacman();
gameLoop();

window.addEventListener("keydown", (event) => {
    let key = event.key;

    if (key === "ArrowLeft" || key === "a") {
        // left arrow or "a"
        pacman.nextDirection = DIRECTION_LEFT;
    } else if (key === "ArrowUp" || key === "w") {
        // up arrow or "w"
        pacman.nextDirection = DIRECTION_UP;
    } else if (key === "ArrowRight" || key === "d") {
        // right arrow or "d"
        pacman.nextDirection = DIRECTION_RIGHT;
    } else if (key === "ArrowDown" || key === "s") {
        // bottom arrow or "s"
        pacman.nextDirection = DIRECTION_BOTTOM;
    }
});
