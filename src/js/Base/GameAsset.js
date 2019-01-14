class GameAsset{
	
	constructor(id,source){
		this.id = id;
		this.image = new Image();
		this.image.src = source;
	}
}

export default GameAsset;