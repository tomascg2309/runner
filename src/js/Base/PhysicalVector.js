class PhysicalVector{
    constructor(vector){
        this.x = vector.x || 0;
        this.y = vector.y || 0;
    }
    
    add(vector2) {
        return new PhysicalVector({x: this.x + vector2.x, y: this.y + vector2.y});
    }
    
    addTo(vector2){
        this.x += vector2.x;
        this.y += vector2.y;
    }

    multiply(scalar) {
        return new PhysicalVector({x: this.x*scalar, y: this.y*scalar});
    }
    
    multiplyBy(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }

    module(){
        return Math.sqrt(this.x**2 + this.y**2);
    }
}

export default PhysicalVector;