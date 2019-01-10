import GameLayer from '../GameLayer.js'

class BackgroundManager{
	
	constructor(speed){
		this.backgrounds = [
			new GameLayer('level-1','src/img/background/bg-purple.png'),
		];
		this.default_position = {x:0, y:64};
		this.speed = 0;
		this.speedWhenStopped = speed;
	}

	show(ctx,screen_id,opacity = 1){		
		let background = this.backgrounds.find(function(e){
			return e.id = screen_id;
		});
		ctx.globalAlpha = opacity;
		ctx.drawImage(background.image,this.default_position.x,this.default_position.y);
		ctx.globalAlpha = 1;
	}

	changeMovement(){
		this.speed = this.speedWhenStopped;
		this.speedWhenStopped = this.speed;
	}
}

export default BackgroundManager;