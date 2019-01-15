class PhysicalVector{
    constructor(vector){
        this.x = vector.x || 0;
        this.y = vector.y || 0;
    }
    
    addTo(vector2){
        this.x += vector2.x;
        this.y += vector2.y;
    }

    multiplyBy(scalar){
        this.x *= scalar;
        this.y *= scalar;
    }
}

export default PhysicalVector;