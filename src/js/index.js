import Player from './GameObject/Player.js'
import HudManager from './Scenario/HudManager.js'
import BackgroundManager from './Scenario/BackgroundManager.js'
import PlatformManager from './Scenario/PlatformManager.js'
import ObstacleManager from './GameObject/ObstacleManager.js'
import CollectibleManager from './GameObject/CollectibleManager.js'
import Game from './Game/Game.js'

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

/* GAME ENVIRONMENT VARIABLES */

var environment = {
	jump: false,
	gravity: {x:0,y:0.25},
	time: 0,
	frames: 0,
	lvl: 'level-2',
	speed: {x:-4,y:0},
	playerMovesOnScreen: false,
	inmortality: false
};

/* HUD CONFIGURATION */

const hud_options = {
	position: {x:0,y:0}
}

var hudManager = new HudManager(hud_options);

hudManager.addHud({id:'level-1',image_source:'src/img/screen/screen-level-1.png'});
hudManager.addHud({id:'level-2',image_source:'src/img/screen/screen-level-2.png'});
hudManager.addHud({id:'level-3',image_source:'src/img/screen/screen-level-3.png'});

/* BACKGROUND CONFIGURATION */

const background_options = {
	position: {x:0,y:64}
}

var backgroundManager = new BackgroundManager(background_options);

backgroundManager.addBackground({id:'level-1',image_source:'src/img/background/bg-green.png'});
backgroundManager.addBackground({id:'level-2',image_source:'src/img/background/bg-purple.png'});
backgroundManager.addBackground({id:'level-3',image_source:'src/img/background/bg-red.png'});

/* PLATFORM CONFIGURATION */

const platform_initial_state = {
	position: {x:0,y:canvas.height-65},
	height:65,
	width:canvas.width
}

var platformManager = new PlatformManager(platform_initial_state);

/* PLAYER CONFIGURATION */

const player_initial_state = {
	position: {x:100,y:120}, // y: 235,
	speed: {x:0,y:0},
	acceleration: environment.gravity,
	gravity: environment.gravity,
	affectedByGravity: true,
	action: "hover",
	frame_impulse: 0,
	frame_impulse_limit: 15,
	jumps: 1,
	jump_limit: 1,
	jump_speed: -6,
	movesOnScreen: environment.playerMovesOnScreen
};

var player = new Player (player_initial_state);

player.addSkin({id:'hover',image_source:'src/img/player/player-hover.png'});
player.addSkin({id:'jump',image_source:'src/img/player/player-jump.png'});

/* OBSTACLE CONFIGURATION */

const obstacleManager = new ObstacleManager();

obstacleManager.addObstacleImage({id:'column',image_source:'src/img/obstacles/column.png'});
obstacleManager.addObstacleImage({id:'rock',image_source:'src/img/obstacles/rock.png'});

obstacleManager.addObstacleToGame({id:'rock',position:{x:1000,y:250}});
obstacleManager.addObstacleToGame({id:'column',position:{x:1400,y:180}});
obstacleManager.addObstacleToGame({id:'column',position:{x:1400,y:180}});

/* OBSTACLE CONFIGURATION */

const collectibleManager = new CollectibleManager();

collectibleManager.addCollectibleImage({id:'clue-1',image_source:'src/img/clues/clue-1.png'});
collectibleManager.addCollectibleImage({id:'clue-2',image_source:'src/img/clues/clue-2.png'});
collectibleManager.addCollectibleImage({id:'clue-3',image_source:'src/img/clues/clue-3.png'});

collectibleManager.addCollectibleToGame({id:'clue-1',position:{x:1200,y:250},collidable:!environment.inmortality});
collectibleManager.addCollectibleToGame({id:'clue-2',position:{x:1600,y:180},collidable:!environment.inmortality});
collectibleManager.addCollectibleToGame({id:'clue-3',position:{x:2000,y:250},collidable:!environment.inmortality});

/* GAME */

var configuration = {
	environment: environment,
	player: player,
	hudManager: hudManager,
	backgroundManager: backgroundManager,
	platformManager: platformManager,
	obstacleManager: obstacleManager,
	collectibleManager: collectibleManager,
	canvas: canvas,
	ctx: ctx
}

var game = new Game(configuration);
/*
var game = {

	controllers: function(){
	   document.addEventListener("keydown", game.press);
	   document.addEventListener("keyup", game.release);
	   document.addEventListener("mousedown",game.press);
	   document.addEventListener("mouseup",game.release);
	},

	press: function(event){
		let keyboard_controllers = [32,38,87];
		let mouse_controllers = [0];
		event.preventDefault();

		let tap = function(){
			if(event.hasOwnProperty("keyCode")){
				if(keyboard_controllers.indexOf(event.keyCode)>=0){ 
					return true;
				}
			}
			if(event.hasOwnProperty("button")){
				if(mouse_controllers.indexOf(event.button)>=0){ 
					return true;
				}
			}
		}

		if(tap){ 
			environment.jump = true; 
		}
		
	},

	release: function(event){
		let keyboard_controllers = [32,38,87];
		let mouse_controllers = [0];
		
		event.preventDefault();

		let free = function(){
			if(event.hasOwnProperty("keyCode")){
				if(keyboard_controllers.indexOf(event.keyCode)>=0){ 
					return true;
				}
			}
			if(event.hasOwnProperty("button")){
				if(mouse_controllers.indexOf(event.button)>=0){ 
					return true;
				}
			}
		}

		if(free){ 
			environment.jump = false; 
			player.jumpPerformed();
		}
	},

	onScreen: function(object,object_image,canvas){
		return object.position.x <= canvas.width || object.position.x + object_image.width <= 0;
	},

	// Define movement type

	time: function(){
		game.canvas();
		
		if(environment.frames < 59){
			environment.frames ++;
		}else{
			environment.time ++;
			environment.frames = 0;
		}

		if(player.collisionWith(platformManager)){
			player.land(platformManager);
		}

		if(environment.jump){
			player.impulseJump();
			if(!player.breakFrameImpulse() && player.canJump()){
				player.jump();
			}
		}

		if(player.isOnGame()){
			if(environment.playerMovesOnScreen){
				player.setSpeed(environment.speed.x*(-1),player.getSpeed().y);
				backgroundManager.setSpeed(0,backgroundManager.getSpeed().y);
				obstacleManager.obstacles.forEach(function(obstacle){
					obstacle.obj.setSpeed(0,backgroundManager.getSpeed().y);
				});
				collectibleManager.collectibles.forEach(function(collectible){
					collectible.obj.setSpeed(0,collectibleManager.getSpeed().y);
				});
			}else{
				backgroundManager.setSpeed(environment.speed.x,environment.speed.y);
				player.setSpeed(0,player.getSpeed().y);
				obstacleManager.obstacles.forEach(function(obstacle){
					obstacle.obj.setSpeed(environment.speed.x,environment.speed.y);
				});
				collectibleManager.collectibles.forEach(function(collectible){
					collectible.obj.setSpeed(environment.speed.x,environment.speed.y);
				});
			}
		}

		player.move();
		if(player.isOnGame()){
			backgroundManager.move();
			obstacleManager.move();
			collectibleManager.move();
		}

		frame(game.time);
   	},

   	canvas: function(){

	    ctx.clearRect(0,0,canvas.width,canvas.height);
	   	backgroundManager.show(environment.lvl,ctx,canvas);
		platformManager.draw(ctx,0);
		player.animation();
		player.draw(ctx);
		obstacleManager.obstacles.forEach(function(obstacle){
			if(game.onScreen(obstacle.obj,obstacle.image,canvas)){
				obstacleManager.draw(obstacle,ctx);
			}
		});
		
		collectibleManager.collectibles.forEach(function(collectible){
			if(game.onScreen(collectible.obj,collectible.image,canvas)){
				
				collectibleManager.draw(collectible,ctx);
			}
		});
		hudManager.show(environment.lvl,ctx,0.5);
   }

}
*/
game.listenEvents();
game.time(frame,ctx);