import PhysicalVector from './PhysicalVector.js'

class PhysicalObject{
    constructor(position,speed,acceleration,teta,angular_velocity,motion_radius){
        this.position = new PhysicalVector(position||{x:0,y:0}) ;
        this.speed = new PhysicalVector(speed||{x:0,y:0});
        this.acceleration = new PhysicalVector(acceleration||{x:0,y:0});
        this.teta = teta||0;
        this.motion_radius = motion_radius||0;
        this.angular_velocity = angular_velocity||0;     
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
        this.position.x += this.motion_radius*Math.cos(this.teta);
        this.position.y += this.motion_radius*Math.sin(this.teta);
    }

    // Simple Harmonic Motion
    shm(axis){
        this.teta += this.angular_velocity;
        switch(axis){
            case 'x': this.position.x += this.motion_radius*Math.cos(this.teta); break;
            case 'y': this.position.y += this.motion_radius*Math.sin(this.teta); break;
        }
    }

    // Stop
    stop(){
        this.speed = new PhysicalVector({x:0,y:0});
        this.acceleration = new PhysicalVector({x:0,y:0});
        this.angular_velocity = 0;
    }
}

export default PhysicalObject;