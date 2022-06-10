class Component{
    constructor(x, y, width, height, image){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._image = image;
    }
    get x(){
        return this._x;
    }
    get y(){
        return this._y;
    }
    get width(){
        return this._width;
    }
    get height(){
        return this._height;
    }
    get image(){
        return this._image;
    }
}