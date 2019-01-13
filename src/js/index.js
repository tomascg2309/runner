import Player from './Player.js'
import HudManager from './Scenario/HudManager.js'
import BackgroundManager from './Scenario/BackgroundManager.js'
import PlatformManager from './Scenario/PlatformManager.js'
import PhysicalVector from './Physics/PhysicalVector.js'

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

/* GAME ENVIRONMENT VARIABLES */

var game_variables = {
	jump: false,
	gravity: new PhysicalVector({x:0,y:0.25}),
	time: 0,
	frames: 0,
	lvl: 'level-2'
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
	position: {x:0,y:64},
	speed: {x:5,y:0}
}

var backgroundManager = new BackgroundManager(background_options);

backgroundManager.addBackground({id:'level-1',image_source:'src/img/background/bg-green.png'});
backgroundManager.addBackground({id:'level-2',image_source:'src/img/background/bg-purple.png'});
backgroundManager.addBackground({id:'level-3',image_source:'src/img/background/bg-red.png'});

/* PLATFORM CONFIGURATION */

var platformManager = new PlatformManager(canvas);

/* PLAYER CONFIGURATION */

const player_initial_state = {
	position: new PhysicalVector ({x:100,y:120}), // y: 235,
	speed: new PhysicalVector({x:0,y:0}),
	acceleration: game_variables.gravity,
	affectedByGravity: true,
	width: 40,
    height: 60,
	image_source: "src/img/player/player-hover.png"
};

var player = new Player (player_initial_state);

/* GAME */

var game = {

	keyboard: function(){
	   document.addEventListener("keydown", game.press)
	   document.addEventListener("keyup", game.release)
	},

	press: function(key){
		key.preventDefault();
		switch(key.keyCode){
			case 38: game_variables.jump = true; break;
			case 32: game_variables.jump = true; break;
		}
	},

	release: function(key){
		key.preventDefault();
		switch(key.keyCode){
			case 38: game_variables.jump = false; break;
			case 32: game_variables.jump = false; break;
		}
	},

	time: function(){
		game.canvas();
		
		if(game_variables.frames < 59){
			game_variables.frames ++;
		}else{
			game_variables.time ++;
			game_variables.frames = 0;
		}

		if(player.position.y>=235){
			player.speed.y = -7.5;
		}	
		player.move();

		frame(game.time)
   	},

   canvas: function(){

	    ctx.clearRect(0,0,canvas.width,canvas.height);
	   	backgroundManager.show(game_variables.lvl,ctx,1);
		platformManager.draw(ctx,0);
		player.draw(ctx);
		hudManager.show(game_variables.lvl,ctx,0.5);
   }
   
}

game.keyboard();
game.time();