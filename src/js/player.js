import PhysicalVector from './Physics/PhysicalVector.js'

class Player{
	
	constructor(params){
		// Physical Magnitudes
		this.position = new PhysicalVector(params.position);
		this.speed = new PhysicalVector(params.speed);
		this.acceleration = new PhysicalVector(params.acceleration);
		this.on_air = params.on_air;
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
		if(!this.on_air){
			this.speed.y = 0;
		}
		this.speed.addTo(this.acceleration);
		this.position.addTo(this.speed);
	}
}

export default Player;