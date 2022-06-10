class Canvas{
    constructor(canvas, width, height){
        this._canvas = canvas;
        this._width = width;
        this._height = height;
        this._ctx = this._canvas.getContext("2d"); 
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._translateX = 0;
        this._translateY = 0;
    }
    setTranslateX(translateX){
        this._translateX = translateX;
    }
    setTranslateY(translateY){
        this._translateY = translateY;
    }
    get translateX(){
        return this._translateX;
    }
    get translateY(){
        return this._translateY;
    }
    get ctx(){
        return this._ctx;
    }
    get width(){
        return this._width;
    }
    get height(){
        return this._height;
    }
}