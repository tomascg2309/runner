import Player from './player.js'

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
	y: 340,
	width: 60,
    height: 60,
    image_source: "src/img/player/player-hover.png"
})

console.log("player.x: ",player.x);
console.log("player.y: ",player.y);
console.log("player.width: ",player.width);
console.log("player.height: ",player.height);
console.log("player.image: ",player.image);

player.draw(ctx);