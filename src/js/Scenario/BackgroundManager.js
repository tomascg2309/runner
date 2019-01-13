import PhysicalObject from '../Physics/PhysicalObject.js'
import GameLayer from '../GameLayer.js'

class BackgroundManager extends PhysicalObject{
	
	constructor(opt){
		super(opt.position, opt.speed)
		this.backgrounds = [];
	}

	show(id,ctx,opacity = 1){
		let background = this.backgrounds.find(e => e.id === id);
		ctx.globalAlpha = opacity;
		ctx.drawImage(background.image,this.position.x,this.position.y);
		ctx.globalAlpha = 1;
	}
	
	addBackground(background){
		this.backgrounds.push(new GameLayer(background.id,background.image_source));
	}
}

export default BackgroundManager;