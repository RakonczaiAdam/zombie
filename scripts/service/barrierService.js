class BarrierService{
    constructor(){
        this._rocks = [];
    }
    rockFactory(number, image){
        for(let i = 0; i<number; i++){
            const x = Math.floor(Math.random() *4000) + 1 - 2000;
            const y = Math.floor(Math.random() *4000) + 1 - 2000;
            const w = Math.floor(Math.random() *20) + 1 + 40;
            const img = new Image();
            img.src = image;
            img.alt = "image";
            const rock = new Rock(x, y, w, 60, img);
            this._rocks.push(rock);
        }
    }
    freeToMove(character, collision){
        this._rocks.map(rock =>{
            if(collision(character, rock)){
                return false;
            }
        })
        return true;
    }
    get rocks(){
        return this._rocks;
    }
}