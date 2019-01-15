import PhysicalObject from '../Base/PhysicalObject.js'
import GameAsset from '../Base/GameAsset.js'

class ObstacleManager{
	
	constructor(){
		this.obstacles = [];
		this.obstacles_images = [];
		this.beaten = 0;
	}

	getObstacleImage(id){
		return this.obstacles_images.find(e => e.id === id).image;
	}

	draw(obstacle,ctx,opacity = 1){
		ctx.globalAlpha = opacity;
		ctx.drawImage(obstacle.image,obstacle.obj.position.x,obstacle.obj.position.y);
		ctx.globalAlpha = 1;
	}
	
	addObstacleImage(obstacle){
		this.obstacles_images.push(new GameAsset(obstacle.id,obstacle.image_source));
	}

	addObstacleToGame(opts){
		this.obstacles.push({image: this.getObstacleImage(opts.id), 
							 obj: new PhysicalObject(opts.position),
							 collidable: opts.collidable,
							 beaten: false
							});
	}

	move(){
		this.obstacles.forEach(function(obstacle){
			obstacle.obj.urm();
		});
	}

	beat(){
		this.obstacles_beaten++;
	}
}

export default ObstacleManager;