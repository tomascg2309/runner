import PhysicalObject from '../Base/PhysicalObject.js'

class PlatformManager extends PhysicalObject{
	
	constructor(opt){
		super(opt.position)
		this.image = {
			width: opt.width,
			height: opt.height
		}
		this.playerOnGame = false;
	}

	draw(ctx,opacity = 1){		
		ctx.fillStyle = 'rgba(255,0,0,'+opacity+')';
		ctx.fillRect(this.position.x,this.position.y,this.image.width,this.image.height);
	}

	playerOnGame(){
		this.playerOnGame = true;
	}
}

export default PlatformManager;