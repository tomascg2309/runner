import Player from './Player.js'
import HudManager from './Scenario/HudManager.js'
import BackgroundManager from './Scenario/BackgroundManager.js'
import PlatformManager from './Scenario/PlatformManager.js'
import PhysicalVector from './Physics/PhysicalVector.js'

/*=============================================
ANIMACION REQUEST ANIMATION FRAME
=============================================*/

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var hudManager = new HudManager();
var backgroundManager = new BackgroundManager();
var platformManager = new PlatformManager(canvas);

var game_variables = {
	jump: false,
	gravity: new PhysicalVector({x:0,y:0.25}),
	game_speed: 15,
	time: 0,
	frames: 0
};

const player_initial_state = {
	position: new PhysicalVector ({x:100,y:120}), // y: 235,
	speed: new PhysicalVector({x:0,y:0}),
	acceleration: game_variables.gravity,
	on_air: true,
	width: 40,
    height: 60,
	image_source: "src/img/player/player-hover.png"
};

var player = new Player (player_initial_state);

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
		
		console.log(player.speed.y);
		if(game_variables.frames < 59){
			game_variables.frames ++;
		}else{
			game_variables.time ++;
			game_variables.frames = 0;
			//player = new Player (player_initial_state);
		}

		if(player.position.y>=235){
			player.speed.y = -7.5;
			// player.on_air = false;
		}	
		player.move();

		frame(game.time)
   	},

   canvas: function(){

	    ctx.clearRect(0,0,canvas.width,canvas.height);
	   	backgroundManager.show(ctx,'level-1',0.5);
		platformManager.draw(ctx,0);
		player.draw(ctx);
		hudManager.show(ctx,'level-1',0.5);

   }

}

game.keyboard();
game.time();