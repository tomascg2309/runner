class PlatformManager{
	
	constructor(canvas){
		this.width = canvas.width;
		this.height = 65;
		this.default_position = {
			x: 0, 
			y: canvas.height - this.height
		};
		this.playerOnGame = false;
	}

	draw(ctx,opacity = 1){		
		ctx.fillStyle = 'rgba(255,0,0,'+opacity+')';
		ctx.fillRect(this.default_position.x,this.default_position.y,this.width,this.height);
	}

	playerOnGame(){
		this.playerOnGame = true;
	}
}

export default PlatformManager;