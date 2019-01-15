import PhysicalObject from '../Base/PhysicalObject.js'
import GameAsset from '../Base/GameAsset.js'

class CollectibleManager{
	
	constructor(){
		this.collectibles = [];
		this.collectibles_images = [];
		this.collected = 0;
	}

	getCollectibleImage(id){
        return this.collectibles_images.find(e => e.id === id).image;
	}

	draw(collectible,ctx,opacity = 1){
		ctx.globalAlpha = opacity;
		ctx.drawImage(collectible.image,collectible.obj.position.x,collectible.obj.position.y);
		ctx.globalAlpha = 1;
	}
	
	addCollectibleImage(collectible){
		this.collectibles_images.push(new GameAsset(collectible.id,collectible.image_source));
	}

	addCollectibleToGame(opts){
		this.collectibles.push({image: this.getCollectibleImage(opts.id), 
								obj: new PhysicalObject(opts.position,null,null,0,Math.PI/30,2),
								collected:false
							    });
	}

	move(){
		this.collectibles.forEach(function(collectible){
            collectible.obj.urm();
            collectible.obj.shm('y');
		});
	}
	
	collect(){
		this.collected++;
	}
}

export default CollectibleManager;