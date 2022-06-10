class Attack extends Component{
    constructor(x, y, width, height, imageLeft, imageRight, damage){
        super(x, y, width, height, imageLeft);
        this._imageLeft = imageLeft;
        this._imageRight = imageRight;
        this._damage = damage
    }
    coordinateAttack(hero){
        const front = hero.characterFront;
        this._y = front.y-(this._height/2)
        if(hero.side === "left"){
            this._image = this._imageLeft
            this._x = front.x-this._width;
        }else{
            this._image = this._imageRight
            this._x = front.x;
        }
    } 
    get damage(){
        return this._damage;
    }
}