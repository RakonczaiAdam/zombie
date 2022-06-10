class Character extends Component{
    constructor(x, y, width, height, imageLeft, imageRight, speed, hp){
        super(x, y, width, height, imageLeft)
        this._imageLeft = imageLeft;
        this._imageRight = imageRight;
        this._side = "left";
        this._speed = speed;
        this._hp = hp;
    }
    moveUp(){
        this._y = this._y - this._speed;
    }
    moveDown(){
        this._y = this._y + this._speed;
    }
    moveLeft(){
        this._side = "left";
        this._image = this._imageLeft;
        this._x = this._x - this._speed;
    }
    moveRight(){
        this._side = "right";
        this._image = this._imageRight;
        this._x = this._x + this._speed;
    }
    setHp(hp){
        this._hp = hp;
    }
    get side(){
        return this._side;
    }
    get hp(){
        return this._hp;
    }
    get speed(){
        return this._speed;
    }
}