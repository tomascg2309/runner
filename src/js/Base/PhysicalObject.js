import PhysicalVector from './PhysicalVector.js'

class PhysicalObject{
    constructor(position,speed,acceleration,teta,angular_velocity,motion_radius){
        this.position = new PhysicalVector(position||{x:0,y:0});
        this._position = new PhysicalVector(position||{x:0,y:0});
        this.speed = new PhysicalVector(speed||{x:0,y:0});
        this.acceleration = new PhysicalVector(acceleration||{x:0,y:0});
        this.teta = teta||0;
        this.motion_radius = motion_radius||0;
        this.angular_velocity = angular_velocity||0;     
    }

    setPosition(x,y){
        this.position.x = x;
        this.position.y = y;
    }

    setSpeed(x,y){
        this.speed.x = x;
        this.speed.y = y;
    }

    setAcceleration(x,y){
        this.acceleration.x = x;
        this.acceleration.y = y;
    }

    getPosition(x,y){
        return this.position;
    }

    getSpeed(x,y){
        return this.speed;
    }

    getAcceleration(x,y){
        return this.acceleration;
    }
    
    // Uniformly Accelerated Rectilinear Motion
    uarm(){
        this.speed.addTo(this.acceleration);
		this.position.addTo(this.speed);
    }

    // Uniform Rectilinear Motion
    urm(){
        this.position.addTo(this.speed);
    }

    // Uniform Circular Motion
    ucm(){
        this.teta += this.angular_velocity;
        this.position.x = this._position.x + this.motion_radius*Math.cos(this.teta);
        this.position.y = this._position.y + this.motion_radius*Math.sin(this.teta);
    }

    // Simple Harmonic Motion
    shm(axis){
        this.teta += this.angular_velocity;
        switch(axis){
            case 'x': this.position.x = this._position.x + this.motion_radius*Math.cos(this.teta); break;
            case 'y': this.position.y = this._position.y + this.motion_radius*Math.sin(this.teta); break;
        }
    }

    // Stop
    stop(axis){
        switch(axis){
            case 'x': this.speed.x = 0; this.acceleration.x = 0; break;
            case 'y': this.speed.y = 0; this.acceleration.y = 0; break;
        }
        this.angular_velocity = 0;
    }
}

export default PhysicalObject;