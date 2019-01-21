import Game from './Game/Game.js'
import Setup from './Game/Setup.js'

const font8b = new FontFace('8bit');

font8b.load().then(function(font){

	// with canvas, if this is ommited won't work
	document.fonts.add(font);
  
	console.log('Font loaded');
  
  });

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var lvl = 2;
var max_lvl = 3;
var configuration = {};
var persistentEnvironment = {};
var game = {};
var flag = 0;
let aux_transition = false;

var main = {
	start: function(){
		var setup = new Setup(lvl,canvas);
		configuration = setup.getSetupConfiguration();
		if(flag != 1){
			persistentEnvironment = setup.getPersistentEnvironment();
		}
		game = new Game(configuration,persistentEnvironment);
		aux_transition = false;
		flag = 0;
		game.listenEvents();
	},
	time: function(){
		switch(flag) {
			case 0: // On game
				flag = game.play(ctx);
				break; 
			case 1: // Restart
				// Try again window	
				
				aux_transition = game.runTransition(ctx,20);
				if(aux_transition){	
					main.start(); 
					flag = 0;
				}
				break; 
			case 2: // Level complete
				if(lvl<max_lvl) {
					// Previous window
					lvl ++;
					main.start();
				}else{
					flag = game.play(ctx);
					console.log("Thanks for playing");
					// End screen
				}
				break;
		}
		frame(main.time);
	}
}

main.start();
main.time();