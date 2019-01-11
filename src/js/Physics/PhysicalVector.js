class PhysicalVector{
    constructor(vector){
        this.x = vector.x;
        this.y = vector.y;
    }
    
    addTo(vector2){
        this.x += vector2.x;
        this.y += vector2.y;
    }
}

export default PhysicalVector;