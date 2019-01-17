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
	inmortality: false,
	goal: 3,
	map_size: 2200
};

/* HUD CONFIGURATION */

var hud_options = {
	position: {x:0,y:0}
}

var hudManager = new HudManager(hud_options);

hudManager.addHud({id:'level-1',image_source:'src/img/screen/screen-level-1.png'});
hudManager.addHud({id:'level-2',image_source:'src/img/screen/screen-level-2.png'});
hudManager.addHud({id:'level-3',image_source:'src/img/screen/screen-level-3.png'});

/* BACKGROUND CONFIGURATION */

var background_options = {
	position: {x:0,y:64}
}

var backgroundManager = new BackgroundManager(background_options);

backgroundManager.addBackground({id:'level-1',image_source:'src/img/background/bg-green.png'});
backgroundManager.addBackground({id:'level-2',image_source:'src/img/background/bg-purple.png'});
backgroundManager.addBackground({id:'level-3',image_source:'src/img/background/bg-red.png'});

/* PLATFORM CONFIGURATION */

var platform_initial_state = {
	position: {x:0,y:canvas.height-65},
	height:65,
	width:canvas.width
}

var platformManager = new PlatformManager(platform_initial_state);

/* PLAYER CONFIGURATION */

var player_initial_state = {
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
	movesOnScreen: environment.playerMovesOnScreen,
	life: 3
};

var player = new Player (player_initial_state);

player.addSkin({id:'hover',image_source:'src/img/player/player-hover.png'});
player.addSkin({id:'jump',image_source:'src/img/player/player-jump.png'});

/* OBSTACLE CONFIGURATION */

var obstacleManager = new ObstacleManager();

obstacleManager.addObstacleImage({id:'column',image_source:'src/img/obstacles/column.png'});
obstacleManager.addObstacleImage({id:'rock',image_source:'src/img/obstacles/rock.png'});

obstacleManager.addObstacleToGame({id:'rock',position:{x:500,y:250},collidable:!environment.inmortality});
obstacleManager.addObstacleToGame({id:'column',position:{x:600,y:180},collidable:!environment.inmortality});
obstacleManager.addObstacleToGame({id:'column',position:{x:700,y:180},collidable:!environment.inmortality});

/* OBSTACLE CONFIGURATION */

var collectibleManager = new CollectibleManager();

collectibleManager.addCollectibleImage({id:'clue-1',image_source:'src/img/clues/clue-1.png'});
collectibleManager.addCollectibleImage({id:'clue-2',image_source:'src/img/clues/clue-2.png'});
collectibleManager.addCollectibleImage({id:'clue-3',image_source:'src/img/clues/clue-3.png'});

collectibleManager.addCollectibleToGame({id:'clue-1',position:{x:1200,y:250},value:1});
collectibleManager.addCollectibleToGame({id:'clue-2',position:{x:1600,y:180},value:1});
collectibleManager.addCollectibleToGame({id:'clue-3',position:{x:2000,y:250},value:1});

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
}

var game = new Game(configuration);

var gameaux = {
	time: function(){
		game.render(ctx);
		game.set();
		frame(gameaux.time);
	}
}

game.listenEvents();
gameaux.time();