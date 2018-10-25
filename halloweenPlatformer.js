import { game, Sprite } from "./sgc/sgc.js";
game.setBackground("cemetery.png");

class Support extends Sprite {
    constructor(image, x, y) {
        super();
        this.x = x;
        this.y = y;
        this.setImage(image);
    }
}

class Platform extends Support {
    constructor(image, x, y) {
        super(image, x, y);
        this.name = "A Platform";
        this.accelerateOnBounce = false;
    }
}

let startPlatform = new Platform("tileFloatCenter.png", 0, 400);
let startPlatformExtension = new Platform("tileFloatRight.png", 127, 400);
let finishPlatform = new Platform("tileFloatLeft.png", game.displayWidth - 48 * 2, 400);
let float = new Platform("tileFloatCenter.png", 710, 100);

class Slider extends Support {
    constructor(x, y, angle) {
        super("tileFloatCenter.png", x, y);
        this.name = 'A Sliding Support';
        this.angle = angle;
        this.speed = 48;
        this.accelerateOnBounce = false;
    }

    handleGameLoop() {
        if (this.x < 128 + 128) {
            this.angle = 90;
        }

        if (this.y < 100) {
            this.angle = 0;
        }

    }

    handleCollision(otherSprite) {
        if (otherSprite == float) {
            this.angle = 270;
            this.accelerateOnBounce = false;
        }

        if (otherSprite == finishPlatform) {
            this.angle = 180;
            this.accelerateOnBounce = false;
        }
    }
}


new Slider(finishPlatform.x - 48 * 5, finishPlatform.y + 48, 180);


class Princess extends Sprite {
    constructor() {
        super();
        this.setImage("ann.png");
        this.x = 48;
        this.y = 300;
        this.speed = 0;
        this.speedWhenWalking = 125;
        this.defineAnimation('left', 9, 11);
        this.defineAnimation('right', 3, 5);
        this.isFalling = false;
    }

    handleLeftArrowKey() {
        this.angle = 180;
        this.speed = this.speedWhenWalking;
    }

    handleRightArrowKey() {
        this.angle = 0;
        this.speed = this.speedWhenWalking;
    }

    handleSpacebar() {
        if (!this.isFalling) {
            this.y = this.y - 4 * this.height; // jump
        }
    }

    handleGameLoop() {
        if (this.angle === 0 && this.speed > 0) {
            this.playAnimation('right');
        }

        if (this.angle === 180 && this.speed > 0) {
            this.playAnimation('left');
        }

        this.x = Math.max(5, this.x);
        this.isFalling = false; // assume she is not falling unless proven otherwise
        // check directly below princess for supports
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 5, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true;
            this.y = this.y + 4; // gravity
        }
        if (supports.length > 0) this.y = supports[0].y - 48;

        this.speed == 0;
    }
    
    handleBoundaryContact() {
        game.end('Better Luck Next Time');
    }
}

let ann = new Princess();

class Door extends Sprite {
    constructor() {
        super();
        this.setImage("door.png");
        this.x = game.displayWidth - 48;
        this.y = finishPlatform.y - 2 * 48;
        this.accelerateOnBounce = false;
    }

    handleCollision(otherSprite) {
        if (otherSprite === ann) {
            game.end('Congratulations!');
        }
    }
}

let exit = new Door();

class Crate extends Sprite {
    constructor() {
        super();
        this.setImage("crate.png");
        this.x = 100;
        this.y = startPlatformExtension.y - 2 * 48;
        this.accelerateOnBounce = true;
    }

    handleGameLoop() {
        this.speed == 0;
        let supports = game.getSpritesOverlapping(this.x, this.y + this.height, this.width, 5, Support);
        if (supports.length === 0 || supports[0].y < this.y + this.height) {
            this.isFalling = true;
            this.y = this.y + 4; // gravity
        }
        
        if (supports.length > 0) this.y = supports[0].y - 48; 
    }

}

let crate = new Crate();
