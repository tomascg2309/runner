class Game {

    constructor(opt) {
        this.environment = opt.environment;
        this.player = opt.player;
        this.hudManager = opt.hudManager;
        this.backgroundManager = opt.backgroundManager;
        this.platformManager = opt.platformManager;
        this.obstacleManager = opt.obstacleManager;
        this.collectibleManager = opt.collectibleManager;
        this.controllers = {
            keyboard: [32, 38, 87],
            mouse: [0],
        };
        this.canvas = opt.canvas;
    }

    listenEvents() {
        document.addEventListener("keydown", this.press);
        document.addEventListener("keyup", this.release);
        document.addEventListener("mousedown", this.press);
        document.addEventListener("mouseup", this.release);
    }

    press(event) {
        event.preventDefault();

        let tap = function () {
            if (event.hasOwnProperty("keyCode")) {
                if (this.controllers.keyboard.indexOf(event.keyCode) >= 0) {
                    return true;
                }
            }
            if (event.hasOwnProperty("button")) {
                if (this.controllers.mouse.indexOf(event.button) >= 0) {
                    return true;
                }
            }
        }

        if (tap) {
            this.environment.jump = true;
        }
    }

    release(event) {
        event.preventDefault();

        let free = function () {
            if (event.hasOwnProperty("keyCode")) {
                if (this.controllers.keyboard.indexOf(event.keyCode) >= 0) {
                    return true;
                }
            }
            if (event.hasOwnProperty("button")) {
                if (this.controllers.mouse.indexOf(event.button) >= 0) {
                    return true;
                }
            }
        }

        if (free) {
            this.environment.jump = false;
            player.jumpPerformed();
        }
    }

    onScreen(object, object_image) {
        return object.position.x <= this.canvas.width || object.position.x + object_image.width <= 0;
    }

    test(){
        console.log("aaaaa");
    }

    drawOnCanvas(ctx) {
        ctx.fillStyle = 'red';
		ctx.fillRect(100,100,100,100);
        /*
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.backgroundManager.show(this.environment.lvl, ctx, this.canvas);
        this.platformManager.draw(ctx, 0);
        this.player.animation();
        this.player.draw(ctx);
        this.obstacleManager.obstacles.forEach(function (obstacle) {
            if (this.onScreen(obstacle.obj, obstacle.image)) {
                this.obstacleManager.draw(obstacle, ctx);
            }
        },this);
        this.collectibleManager.collectibles.forEach(function (collectible) {
            if (this.onScreen(collectible.obj, collectible.image)) {
                this.collectibleManager.draw(collectible, ctx);
            }
        },this);
        this.hudManager.show(this.environment.lvl, ctx);
        */
    }

    time(frame,ctx) {
        this.drawOnCanvas(ctx);
        /*
        if (this.environment.frames < 59) {
            this.environment.frames++;
        } else {
            this.environment.time++;
            this.environment.frames = 0;
        }

        if (this.player.collisionWith(this.platformManager)) {
            this.player.land(this.platformManager);
        }

        if (this.environment.jump) {
            this.player.impulseJump();
            if (!this.player.breakFrameImpulse() && this.player.canJump()) {
                this.player.jump();
            }
        }

        if (this.player.isOnGame()) {
            if (this.environment.playerMovesOnScreen) {
                this.player.setSpeed(this.environment.speed.x * (-1), this.player.getSpeed().y);
                this.backgroundManager.setSpeed(0, this.backgroundManager.getSpeed().y);
                this.obstacleManager.obstacles.forEach(function (obstacle) {
                    obstacle.obj.setSpeed(0, this.backgroundManager.getSpeed().y);
                },this);
                this.collectibleManager.collectibles.forEach(function (collectible) {
                    collectible.obj.setSpeed(0, this.collectibleManager.getSpeed().y);
                },this);
            } else {
                this.backgroundManager.setSpeed(this.environment.speed.x, this.environment.speed.y);
                this.player.setSpeed(0, this.player.getSpeed().y);
                this.obstacleManager.obstacles.forEach(function (obstacle) {
                    obstacle.obj.setSpeed(this.environment.speed.x, this.environment.speed.y);
                },this);
                this.collectibleManager.collectibles.forEach(function (collectible) {
                    collectible.obj.setSpeed(this.environment.speed.x, this.environment.speed.y);
                },this);
            }
        }

        this.player.move();
        if (this.player.isOnGame()) {
            this.backgroundManager.move();
            this.obstacleManager.move();
            this.collectibleManager.move();
        }

        // 
        */
       frame(this.time(ctx));
    }
   
}

export default Game;