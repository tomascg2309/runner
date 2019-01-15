import PhysicalObject from '../Base/PhysicalObject.js'
import GameAsset from '../Base/GameAsset.js'

class HudManager extends PhysicalObject{
	
	constructor(opt){
		super(opt.position)
		this.huds = [];
	}

	getHudImage(id){
		return this.huds.find(e => e.id === id).image;
	}
	
	show(id,ctx,opacity = 1){
		let hud = this.getHudImage(id);
		ctx.globalAlpha = opacity;
		ctx.drawImage(hud,this.position.x,this.position.y);
		ctx.globalAlpha = 1;
	}

	addHud(hud){
		this.huds.push(new GameAsset(hud.id,hud.image_source));
	}
}

export default HudManager;