import PhysicalObject from '../Physics/PhysicalObject.js'
import GameAsset from '../GameAsset.js'

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
	}
	
	getSkin(){
		return this.skins.find(e => e.id === this.action);
	}
	
	draw(ctx){
		let skin = this.getSkin();
		ctx.drawImage(skin.image,this.position.x,this.position.y);
	}

	addSkin(skin){
		this.skins.push(new GameAsset(skin.id,skin.image_source));
	}

	move(){
		super.uarm();
	}

	land(){
		this.jumps = 0;
		this.frame_impulse = 0;
		this.setAction('hover');
		this.affectedByGravity = false;
		super.stop('y');
	}

	jump(){
		this.setAction('jump');
		this.affectedByGravity = true;
		super.setSpeed(this.speed.x,this.jump_speed);
		super.setAcceleration(this.acceleration.x,this.gravity.y);
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

	breakFrameImpulse(){
		this.frame_impulse++;
		return this.frame_impulse > this.frame_impulse_limit;
	}

	collisionWith(obj){
		var skin = this.getSkin();

		//No colisión con plataforma de Arriba hacia Abajo
		if((this.position.y + skin.image.height) < obj.position.y){return false}

		//No colisión con plataforma de Abajo hacia Arriba
		if(this.position.y > (obj.position.y + obj.height)){return false}

		//No colisión con plataforma de Izquierda a Derecha
		if((this.position.x + skin.image.width) < obj.position.x){return false}

		//No colisión con plataforma de Derecha a Izquierda
		if(this.position.x > (obj.position.x + obj.width)){return false}

		return true;
	}
}

export default Player;