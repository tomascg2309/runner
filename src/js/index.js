import Player from './Player.js'
import HudManager from './Scenario/HudManager.js'
import BackgroundManager from './Scenario/BackgroundManager.js'
import PlatformManager from './Scenario/PlatformManager.js'
import Gravity from './Physics/Gravity.js'

/*=============================================
ANIMACION REQUEST ANIMATION FRAME
=============================================*/

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var player = new Player ({
    x: 100,
	y: 120,
	// y: 235,
	width: 40,
    height: 60,
	image_source: "src/img/player/player-hover.png",
	movement_x: 0,
	movement_y: 0
})

var hudManager = new HudManager();
var backgroundManager = new BackgroundManager();
var platformManager = new PlatformManager(canvas);

var global = {
	jump: false,
	gravity: new Gravity(),
	time: 0,
	frames: 0
};

var game = {

	keyboard: function(){
	   document.addEventListener("keydown", game.press)
	   document.addEventListener("keyup", game.release)
	},

	press: function(key){
		key.preventDefault();
		switch(key.keyCode){
			case 38: global.jump = true; break;
			case 32: global.jump = true; break;
		}
	},

	release: function(key){
		key.preventDefault();
		switch(key.keyCode){
			case 38: global.jump = false; break;
			case 32: global.jump = false; break;
		}
	},

	time: function(){
		if(global.frames < 59){
			global.frames ++;
		}else{
			global.time ++;
			global.frames = 0;
		}
		
		game.canvas();
		console.log(global.time);
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