import PhysicalObject from '../Physics/PhysicalObject.js'
import GameAsset from '../GameAsset.js'

class HudManager extends PhysicalObject{
	
	constructor(opt){
		super(opt.position)
		this.huds = [];
	}

	show(id,ctx,opacity = 1){		
		let hud = this.huds.find(e => e.id === id);
		ctx.globalAlpha = opacity;
		ctx.drawImage(hud.image,this.position.x,this.position.y);
		ctx.globalAlpha = 1;
	}

	addHud(hud){
		this.huds.push(new GameAsset(hud.id,hud.image_source));
	}
}

export default HudManager;