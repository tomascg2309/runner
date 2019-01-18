class Game {

    constructor(opt, persistentEnvironment) {
        
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
        this.has_end = false;
        this.persistentEnvironment = persistentEnvironment;
    }

    listenEvents() {
        // Listen keyboard events
        document.addEventListener("keydown", this.press.bind(this));
        document.addEventListener("keyup", this.release.bind(this));
        // Listen mouse events
        document.addEventListener("mousedown", this.press.bind(this));
        document.addEventListener("mouseup", this.release.bind(this));
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
                    console.log("click");
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
            this.player.jumpPerformed();
        }
    }

    onScreen(object, object_image) {
        return object.position.x <= this.canvas.width || object.position.x + object_image.width <= 0;
    }

    render(ctx) {
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
            if (this.onScreen(collectible.obj, collectible.image) && !collectible.collected) {
                this.collectibleManager.draw(collectible, ctx);
            }
        },this);
        this.hudManager.show(this.environment.lvl, ctx);
    }

    moveScreen() {
        if (this.player.isOnGame()) {
            if (this.environment.playerMovesOnScreen) {
                this.player.setSpeed(this.environment.speed.x * (-1), this.player.getSpeed().y);
                this.backgroundManager.setSpeed(0, this.backgroundManager.getSpeed().y);
                this.obstacleManager.obstacles.forEach(function (obstacle) {
                    obstacle.obj.setSpeed(0, 0);
                },this);
                this.collectibleManager.collectibles.forEach(function (collectible) {
                    collectible.obj.setSpeed(0, 0);
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
    }

    runStopwatch() {
        if (this.environment.frames < 59) {
            this.environment.frames++;
        } else {
            this.environment.time++;
            this.environment.frames = 0;
        }
    }

    resetStopwatch() {
        this.environment.frames = 0;
        this.environment.time = 0;
    }

    moveAll() {
        this.player.move();
        if (this.player.isOnGame()) {
            this.backgroundManager.move();
            this.obstacleManager.move();
            this.collectibleManager.move();
        }
    }

    handleInteractions() {
        if (this.player.collisionWith(this.platformManager,this.platformManager.image)) {
            this.player.land(this.platformManager);
        }
        
        let aux = 0;
        
        this.obstacleManager.obstacles.forEach(function (obstacle) {
            if (this.onScreen(obstacle.obj, obstacle.image) && this.player.collisionWith(obstacle.obj, obstacle.image) && !obstacle.was_hit) {
                if(!this.environment.inmortality) {
                    this.player.receiveDamage(obstacle.damage);
                    // console.log("ouch! remaining life:", this.player.life);
                }else{
                    console.log("LOL! NO DAMAGE ;) lifes:", this.player.life);
                }
                this.obstacleManager.hitBy(aux);
            }
            aux++;
        },this);

        aux = 0;
        
        this.collectibleManager.collectibles.forEach(function (collectible) {
            if (this.onScreen(collectible.obj, collectible.image) && this.player.collisionWith(collectible.obj, collectible.image) && !collectible.collected) {
                this.player.collect();
                this.player.increaseScore();
                this.collectibleManager.collect(aux);
                // console.log("great! collected:", this.player.collected);
            }
            aux++;
        },this);
    }

    usePlayer() {
        if (this.environment.jump && this.player.canJump()) {
            this.player.impulseJump();
            if (!this.player.breakFrameImpulse()) {
                this.player.jump();
            }
        }
    }

    score() {
        // Depending on the kind of game, this method should be reworked
        this.player.score = this.player.collected;
        this.persistentEnvironment.best = Math.max(this.player.score,this.persistentEnvironment.best);
    }

    breakScreen() {
        if(this.backgroundManager.getDistance() + this.canvas.width >= this.environment.map_size) {
            this.environment.playerMovesOnScreen = true;
        }
    }

    end() { 
        if(this.player.getLife() == 0) {
            this.resetStopwatch();
            return 1;  // restart
        }else if (this.player.getPosition().x >= this.canvas.width*0.8) {
            if(!this.has_end){
                if(this.player.getScore() == this.environment.goal && !this.has_end) {
                    // console.log("end");
                    this.has_end = true;
                    return 2;
                }else{
                    // console.log("restart");
                    this.resetStopwatch();
                    return 1; // restart
                }
            } 
        }

        if(this.player.getPosition().x >= this.canvas.width + 2*this.player.getSkinImage().width){
            this.player.stop('x');
        }

        return 0;
    }

    run() {
        this.runStopwatch();
        this.handleInteractions();
        this.score();
        this.usePlayer();
        this.breakScreen();
        this.moveScreen();
        this.moveAll();
    }

    play(ctx) {
        this.render(ctx);
		this.run();
		return this.end();
    }

    runTransition(ctx,num) {
        this.runStopwatch();
        this.renderTransition(ctx,num);
        if(this.environment.frames == num % 60 && this.environment.time == Math.trunc(num/60)) {
            return true;
        }
        return false;
    }

    renderTransition(ctx,num) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let alpha = 0.5+(this.environment.frames-1)/(num-1);
        ctx.fillStyle = "rgba(0,0,0,"+alpha.toString()+")";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Game;