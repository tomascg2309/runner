import Game from './Game/Game.js'
import Setup from './Game/Setup.js'

var frame = window.requestAnimationFrame || 
		    window.mozRequestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.msRequestAnimationFrame;

var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

var lvl = 2;
var max_lvl = 3;
var configuration;
var game;
var flag = 0;
let aux_transition;

var gameaux = {
	start: function(){
		configuration = new Setup(lvl,canvas).getConfiguration();
		game = new Game(configuration, lvl);
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
				/*
				aux_transition = game.runTransition(ctx,30);
				if(aux_transition){	
					gameaux.start(); 
				}
				*/
				gameaux.start(); 
				break; 
			case 2: // Level complete
				if(lvl<max_lvl) {
					// Previous window
					lvl ++;
					gameaux.start();
				}else{
					flag = game.play(ctx);
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