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

class Slider extends Support {
    constructor(x, y, angle) {
        super("tileFloatCenter.png", x, y);
        this.name = 'A Sliding Support';
        this.angle = angle;
        this.speed = 48;
    }
    
    handleGameLoop {
        if (this.x > game.displayWidth)
        
    }
}

new Slider(startPlatformExtension.x + 48 * 3, startPlatformExtension.y + 48, 0);
new Slider(finishPlatform.x - 48 * 5, finishPlatform.y + 48, 180);