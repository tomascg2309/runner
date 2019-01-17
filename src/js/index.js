import Game from './Game/Game.js'
import Setup from './Game/Setup.js'

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var lvl = 1;
var max_lvl = 3;
var configuration;
var game;
var flag;

var gameaux = {
	start: function(){
		configuration = new Setup(lvl,canvas).getConfiguration();
		game = new Game(configuration, lvl);
		game.listenEvents();
	},
	time: function(){
		game.render(ctx);
		game.set();
		flag = game.end();
		switch(flag) {
			case 0: break; // On game
			case 1: // Restart
				// Try again window
				gameaux.start(); 
				break;
			case 2: // Level complete
			if(lvl<max_lvl) {
				// Previous window
				lvl ++;
				gameaux.start();
			}else{
				console.log("thanks for playing");
				// End screen
			}
			break;
		}
		frame(gameaux.time);
	}
}

gameaux.start();
gameaux.time();