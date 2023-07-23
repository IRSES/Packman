class Pacman {
    constructor (x, y, width, height, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction; 
        this.currentFrame = 1;
        this.frameCount = 7;

        setInterval(() => {
            this.changeAnimation();
        }, 100)
    };
    
    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
            this.direction = this.nextDirection; 
        }
    }
    
    eat() {

    };

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT: // Right
                this.x -= this.speed;
                break;
            case DIRECTION_UP: // Up
                this.y += this.speed;
                break;
            case DIRECTION_LEFT: // Left
                this.x += this.speed;
                break;
            case DIRECTION_BOTTOM: // Bottom
                this.y -= this.speed;
                break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed;
                break;
        }
    }

    // checkCollision() { // todo
    //     let x = Math.floor(this.x / oneBlockSize);
    //     let y = Math.floor(this.y / oneBlockSize);

    //     if (
    //         y < 0 ||
    //         y >= map.length ||
    //         x < 0 ||
    //         x >= map[0].length ||
    //         map[y][x] === 1 ||
    //         (y + 1 < map.length && map[y + 1][x] === 1) ||
    //         (x + 1 < map[0].length && map[y][x + 1] === 1) ||
    //         (y + 1 < map.length && x + 1 < map[0].length && map[y + 1][x + 1] === 1)
    //     ) {
    //         return true;
    //     }
    //     return false;
    // }

    checkCollision() {
        if (
            map[this.getMapY()][this.getMapX()] == 1 ||
            map[this.getMapYRightSide()][this.getMapX()] == 1 ||
            map[this.getMapY()][this.getMapXRightSide()] == 1 ||
            map[this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ) {
            return true;
        }
        return false;
    };

    checkGhostCollision() {
        //todo
    };

    changeDirectionIfPossible() {
        if (this.direction == this.nextDirection) return;
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
    }    

    changeAnimation(){
        this.currentFrame = 
        this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    };

    draw() {
        canvasContext.save();
        canvasContext.translate(
            this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2
        ); 
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
        canvasContext.translate(
            -this.x - oneBlockSize / 2,
            -this.y - oneBlockSize / 2
        ); 
        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            this.x,
            this.y,
            this.width,
            this.height,
        );
        canvasContext.restore();
    }

    getMapX(){
        let mapX = parseInt(this.x / oneBlockSize);
        return mapX;
    }
    getMapY(){
        let mapY = parseInt(this.y / oneBlockSize);
        return mapY;
    }
    getMapXRightSide(){
        let mapX = parseInt((this.x * 0.99 + oneBlockSize) / oneBlockSize);
        return mapX;
    }
    getMapYRightSide(){
        let mapY = parseInt((this.y * 0.99 + oneBlockSize) / oneBlockSize);
        return mapY;
    }
}