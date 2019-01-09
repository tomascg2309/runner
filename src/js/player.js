class Player{
	
	constructor(params){
		this.x = params.x;
		this.y = params.y;
		this.width = params.width;
		this.height = params.height;
		this.image = new Image();
		this.image.src = params.image_source;
	}
	
	draw(ctx){
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}
}

export default Player;