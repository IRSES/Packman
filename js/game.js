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
let score = 0;
let pacman;
let ghosts = [];

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;
let lives = 3;
const entrance1 = { x: 0, y: oneBlockSize * 12 };
const entrance2 = { x: oneBlockSize * 24, y: oneBlockSize * 12 };

let ghostCount = 3;
let ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
];


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
};

map = rotateMap90DegreesRight(map);

let randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
        x: (map[0].length - 2) * oneBlockSize,
        y: (map.length - 2) * oneBlockSize,
    },
];


let gameLoop = () => {
    draw();
    update();
};

let onGhostCollision = () => {
    restartPacmanAndGhosts();
    if (lives == 0) {
    }
};

let restartPacmanAndGhosts = () => {
    createNewPacman();
    createGhosts();
    lives--;
    if (lives == 0) {
        gameOver();
    }
};

let update = () => {
    pacman.moveProcess();
    pacman.eat();
    updateGhosts();
    if (reachedEntrance(entrance1) || reachedEntrance(entrance2)) {
        teleportToOtherEntrance();
    }
    if (pacman.checkGhostCollision(ghosts)) {
        onGhostCollision();
    }
    if (score >= 290) {
        drawWin();
        clearInteval(gameInterval)
    }
};

let drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 0) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    "#FEB897"
                );
            }
        }
    }
};

let gameOver = () => {
    clearInterval(gameInterval);
    drawGameOver();
}

let drawGameOver = () => {
    canvasContext.font = "60px Impact, fantasy";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Game Over!", 110, 275)
}

let drawWin = () => {
    canvasContext.font = "60px Impact, fantasy";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Winner!", 150, 275)
}

let drawRemainingLives = () => {
    canvasContext.font = "40px Impact, fantasy";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Lives: ", 240, oneBlockSize * (map.length + 2));

    for (let i = 0; i < lives; i++) {
        canvasContext.drawImage(
            pacmanFrames,
            2 * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            350 + i * oneBlockSize,
            oneBlockSize * map.length + 18,
            oneBlockSize,
            oneBlockSize
        );
    }
};

let drawScore = () => {
    canvasContext.font = "40px Impact, fantasy";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
        "Score: " + score,
        0,
        oneBlockSize * (map.length + 2)
    );
};

let draw = () => {  
    canvasContext.clearRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height, "black"); 
    drawWalls();
    drawFoods();
    pacman.draw();
    drawGhosts();
    drawScore();
    drawRemainingLives();
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

let createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < ghostCount * 2; i++) {
        let newGhost = new Ghost(
            11 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            12 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostImageLocations[i % 4].x,
            ghostImageLocations[i % 4].y,
            124,
            116,
            6 + i
        );
        ghosts.push(newGhost);
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

let reachedEntrance = (entrance) => {
    if (
        pacman.x >= entrance.x &&
        pacman.x + pacman.width <= entrance.x + oneBlockSize &&
        pacman.y >= entrance.y &&
        pacman.y + pacman.height <= entrance.y + oneBlockSize
    ) {
        return true;
    }
    return false;
};

let teleportToOtherEntrance = () => {
    if (reachedEntrance(entrance1)) {
        pacman.x = entrance2.x;
        pacman.y = entrance2.y;
    } else if (reachedEntrance(entrance2)) {
        pacman.x = entrance1.x;
        pacman.y = entrance1.y;
    }
};

createNewPacman();
createGhosts();
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
