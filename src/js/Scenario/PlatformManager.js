import PhysicalObject from '../Physics/PhysicalObject.js'

class PlatformManager extends PhysicalObject{
	
	constructor(opt){
		super(opt.position)
		this.width = opt.width;
		this.height = opt.height;
		this.playerOnGame = false;
	}

	draw(ctx,opacity = 1){		
		ctx.fillStyle = 'rgba(255,0,0,'+opacity+')';
		ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
	}

	playerOnGame(){
		this.playerOnGame = true;
	}
}

export default PlatformManager;