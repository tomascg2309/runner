import PhysicalObject from '../Base/PhysicalObject.js'
import GameAsset from '../Base/GameAsset.js'

class BackgroundManager extends PhysicalObject{
	
	constructor(opt){
		super(opt.position, opt.speed)
		this.backgrounds = [];
	}

	getBackgroundImage(id){
		return this.backgrounds.find(e => e.id === id).image;
	}

	show(id,ctx,opacity = 1){
		ctx.globalAlpha = opacity;
		ctx.drawImage(this.getBackgroundImage(id),this.position.x,this.position.y);
		ctx.globalAlpha = 1;
	}
	
	addBackground(background){
		this.backgrounds.push(new GameAsset(background.id,background.image_source));
	}

	move(){
		super.urm();
	}
}

export default BackgroundManager;