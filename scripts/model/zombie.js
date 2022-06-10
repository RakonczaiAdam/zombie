class Zombie extends Character{
    constructor(x, y, width, height, imageLeft, imageRight, bloodImage, fadedBloodImage, imageLeftDamaged, imageRightDamaged){
        super(x, y, width, height, imageLeft, imageRight, 1, 100)
        this._bloodImage = bloodImage
        this._fadedBloodImage = fadedBloodImage;
        this._imageLeftDamaged = imageLeftDamaged;
        this._imageRightDamaged = imageRightDamaged;
        this._dealsDamage = 20;
        this._colliding = false;
    }
    move(lajos){
        let proportion = 1;
        const distanceX = Math.abs(lajos.x-this._x);
        const distanceY = Math.abs(lajos.y-this._y);
        if(distanceX >= distanceY){
            proportion = distanceY/distanceX;
            if(lajos.x > this._x){
                this._image = this._imageRight
                this._x = this._x + this._speed;
            }
            if(lajos.x < this._x){
                this._image = this._imageLeft;
                this._x = this._x - this._speed;
            }
            if(lajos.y > this._y){
                this._y = this._y + this._speed*proportion;
            }
            if(lajos.y < this._y){
                this._y = this._y - this._speed*proportion;
            }
        }else{
            proportion = distanceX/distanceY;
            if(lajos.x > this._x){
                this._image = this._imageRight
                this._x = this._x + this._speed*proportion;
            }
            if(lajos.x < this._x){
                this._image = this._imageLeft;
                this._x = this._x - this._speed*proportion;
            }
            if(lajos.y > this._y){
                this._y = this._y + this._speed;
            }
            if(lajos.y < this._y){
                this._y = this._y - this._speed;
            }
        }
    }
    sufferDamage(){
        this._imageLeft = this._imageLeftDamaged;
        this._imageRight = this._imageRightDamaged;
    }
    destroyed(){
        this._height = 20;
        this._image = this._bloodImage;
    }
    fadeBlood(){
        this._image = this._fadedBloodImage;
    }
    setColliding(colliding){
        this._colliding = colliding;
    }
    get dealsDamage(){
        return this._dealsDamage;
    }
    get colliding(){
        return this._colliding;
    }
}