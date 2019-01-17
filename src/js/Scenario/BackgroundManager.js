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

	show(id,ctx,canvas,opacity = 1){
		let background = this.getBackgroundImage(id);
		ctx.globalAlpha = opacity;

		let fixed_x = this.position.x % canvas.width; // For sliding backgrounds
		let support_x = canvas.width - Math.abs(fixed_x);
		if(fixed_x<=0){
			// Left Background
			ctx.drawImage(background,-fixed_x,0,support_x,background.height,this._position.x,this._position.y,support_x,background.height);
			// Right Background
			ctx.drawImage(background,0,0,-fixed_x,background.height,support_x,this._position.y,-fixed_x,background.height);   
		}else{
			// Left Background
			ctx.drawImage(background,support_x,0,fixed_x,background.height,this._position.x,this._position.y,fixed_x,background.height);
			// Right Background
			ctx.drawImage(background,0,0,support_x,background.height,fixed_x,this._position.y,support_x,background.height);
		}
		
		ctx.globalAlpha = 1;
	}
	
	addBackground(background){
		this.backgrounds.push(new GameAsset(background.id,background.image_source));
	}

	move(){
		super.urm();
	}

	getDistance(){
		return this.position.add(this._position.multiply(-1)).module();
	}
}

export default BackgroundManager;