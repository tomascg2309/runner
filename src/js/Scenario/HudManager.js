import GameLayer from '../GameLayer.js'

class HudManager{
	
	constructor(){
		this.screens = [
			new GameLayer('level-1','src/img/screen/screen-level-1.png'),
		];
		this.default_position = {x:0, y:0};
	}

	show(ctx,screen_id,opacity = 1){		
		let screen = this.screens.find(function(e){
			return e.id = screen_id;
		});
		ctx.globalAlpha = opacity;
		ctx.drawImage(screen.image,this.default_position.x,this.default_position.y);
		ctx.globalAlpha = 1;
	}
}

export default HudManager;