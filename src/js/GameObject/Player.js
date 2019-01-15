import PhysicalObject from '../Base/PhysicalObject.js'
import GameAsset from '../Base/GameAsset.js'

class Player extends PhysicalObject{
	
	constructor(opt){
		// Inherited physical attributes 
		super(opt.position,opt.speed,opt.acceleration);
		// Game configuration attributes
		this.affectedByGravity = opt.affectedByGravity;
		this.gravity = opt.gravity;
		this.frame_impulse_limit = opt.frame_impulse_limit;
		this.frame_impulse = opt.frame_impulse;
		// Character display attributes
		this.skins = [];
		this.action = opt.action;
		this.jumps = opt.jumps;
		this.jump_limit = opt.jump_limit;
		this.jump_speed = opt.jump_speed;
		this.onGame = false;
		this.movesOnScreen = opt.movesOnScreen;
	}
	
	isOnGame(){
		return this.onGame;
	}

	nowOnGame(){
		this.onGame = true;
	}
	
	getSkinImage(){
		// An action started with 'inv' is an 'x' rotated image of an original action
		if(this.action.substr(0,4) == 'inv-'){
			let original_action = this.action.substr(4,this.action.length-4);
			return this.skins.find(e => e.id === original_action).image;
		}else{
			return this.skins.find(e => e.id === this.action).image;
		}
	}
	
	draw(ctx){
		let skin = this.getSkinImage();
		ctx.save();
		if(this.action.substr(0,4) == 'inv-'){
			// To perform a rotation, we need to make a mirror on the canvas
			ctx.scale(-1,1); // -1 indicates a mirror on 'x' axis
			// Rules to draw the image also change
			ctx.drawImage(skin,-(this.position.x+skin.width),this.position.y);
			ctx.restore();
		}else{
			ctx.drawImage(skin,this.position.x,this.position.y);
		}
		
	}

	addSkin(skin){
		this.skins.push(new GameAsset(skin.id,skin.image_source));
	}

	move(){
		super.uarm();
	}

	land(platformManager){
		this.nowOnGame();
		this.jumps = 0;
		this.frame_impulse = 0;
		this.affectedByGravity = false;
		super.stop('y');
		let skin = this.getSkinImage();
		this.position.y = platformManager.position.y - skin.height;
	}

	jump(){
		this.affectedByGravity = true;
		super.setSpeed(this.speed.x,this.jump_speed);
		super.setAcceleration(this.acceleration.x,this.gravity.y);
	}

	animation(){
		if(this.breakFrameImpulse()){
			if(this.speed.y == 0){
				this.action = 'inv-jump';
			}else if(this.speed.y>=-this.jump_speed*0.5){
				this.action = 'jump';
			}
		}
		if(this.speed.y < 0){
			this.action = 'jump';
		}else if(this.speed.y>=-this.jump_speed*0.9){
			this.action = 'hover';
		}
	}
	
	jumpPerformed(){
		this.jumps++;
	}
	
	canJump(){
		return this.jumps < this.jump_limit;
	}

	setAction(action){
		this.action = action;
	}

	impulseJump(){
		this.frame_impulse++;
	}
	
	breakFrameImpulse(){
		return this.frame_impulse > this.frame_impulse_limit;
	}

	collisionWith(obj){
		var skin = this.getSkinImage();

		//No colisión con plataforma de Arriba hacia Abajo
		if((this.position.y + skin.height) < obj.position.y){return false}

		//No colisión con plataforma de Abajo hacia Arriba
		if(this.position.y > (obj.position.y + obj.height)){return false}

		//No colisión con plataforma de Izquierda a Derecha
		if((this.position.x + skin.width) < obj.position.x){return false}

		//No colisión con plataforma de Derecha a Izquierda
		if(this.position.x > (obj.position.x + obj.width)){return false}

		return true;
	}
}

export default Player;