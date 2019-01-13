import PhysicalObject from './Physics/PhysicalObject.js'

class Player extends PhysicalObject{
	
	constructor(params){
		// Physical Magnitudes
		super(params.position,params.speed,params.acceleration);
		// super(params.position,params.speed,params.acceleration,0,0.25,Math.PI/30);
		this.affectedByGravity = params.affectedByGravity;
		// Character attributes
		this.width = params.width;
		this.height = params.height;
		this.image = new Image();
		this.image.src = params.image_source;
	}
	
	draw(ctx){
		ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
	}

	move(){
		if(!this.affectedByGravity){
			this.speed.y = 0;
		}
		super.uarm();
	}
}

export default Player;