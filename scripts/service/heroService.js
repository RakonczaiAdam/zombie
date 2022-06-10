class HeroService{
    constructor(canvas){
        this._canvas = canvas;
        this._keys = [];
        this._lajos = null;
    }
    heroFactory(left, right, attackLeft, attackRight, healthBar){
        const imageLeft = new Image(40, 40)
        imageLeft.src = left
        imageLeft.alt= "image"
        const imageRight = new Image(40, 40)
        imageRight.src = right
        imageRight.alt= "image"
        const lajos = new Hero(600, 250, 40, 40, imageLeft, imageRight, attackLeft, attackRight, healthBar);
        this._lajos = lajos;
    }
    detectKeys(){
        onkeydown = (e) =>{
            this._keys.includes(e.key) ? null : this._keys.push(e.key)
        }
    }
    removeKeys(){
        onkeyup = (e) =>{
            this.removeKey(e.key)
        }
    }
    removeKey(remove){
        this._keys = this._keys.filter((key)=>{
            return key != remove;
        })
    }
    heroMovement(barrierService){
        if(this._keys.includes("ArrowUp")){
            if(this._lajos.y > -2000){
                this._lajos.moveUp();
                if(this._lajos.y < this._canvas.translateY+80){
                    this._canvas.setTranslateY(this._canvas.translateY-this._lajos.speed);
                    this._canvas.ctx.translate(0, this._lajos.speed);
                }
            }
        } 
        if(this._keys.includes("ArrowDown")){
            if(this._lajos.y < 2000){
                this._lajos.moveDown();
                if(this._lajos.y > this._canvas.translateY+this._canvas.height-80){
                    this._canvas.setTranslateY(this._canvas.translateY+this._lajos.speed);
                    this._canvas.ctx.translate(0, -this._lajos.speed);
                }
            }
        } 
        if(this._keys.includes("ArrowLeft")){
            if(this._lajos.x > -2000){
                this._lajos.moveLeft();
                if(this._lajos.x < this._canvas.translateX+80){
                    this._canvas.setTranslateX(this._canvas.translateX-this._lajos.speed);
                    this._canvas.ctx.translate(this._lajos.speed, 0);
                }
            }
        } 
        if(this._keys.includes("ArrowRight")){
            if(this._lajos.x < 2000){
                this._lajos.moveRight();
                if(this._lajos.x > this._canvas.translateX+this._canvas.width-80){
                    this._canvas.setTranslateX(this._canvas.translateX+this._lajos.speed);
                    this._canvas.ctx.translate(-this._lajos.speed, 0);
                }
            }
        }
    }
    heroAttack(zombieService, collision){
        if(this._lajos.attackDelay > 4){
            this.removeKey("y")
            this._lajos.setAttackDelay(0)
        }else if(this._lajos.attackDelay !== 0){
            this._lajos.setAttackDelay(this._lajos.attackDelay+1)
        }
        if(this._keys.includes("y") && this._lajos.attackDelay === 0){
            const zombies = zombieService.zombies.filter(zombie=>{
                if(collision(this._lajos.lightning, zombie)){
                    zombie.setHp(zombie.hp-this._lajos.lightning.damage)
                    if(zombie.hp < 1){
                        zombie.destroyed();
                        zombieService.stains.push(zombie);
                        return false;
                    }else{
                        zombie.sufferDamage();
                    }
                }
                return true;
            })
            zombieService.setZombies(zombies);
            this._lajos.setAttackDelay(this._lajos.attackDelay+1)
        }
    }
    get hero(){
        return this._lajos;
    }
    get keys(){
        return this._keys;
    }
}