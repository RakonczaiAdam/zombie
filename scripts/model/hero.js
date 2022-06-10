class Hero extends Character{
    constructor(x, y, width, height, imageLeft, imageRight, lightningLeft, lightningRight, healthBar){
        super(x, y, width, height, imageLeft, imageRight, 3, 100)
        this._attack = Lightning.lightningFactory(lightningLeft, lightningRight)
        this._attackDelay = 0;
        this._healthBar = healthBar;
        this._healthBar.style.width = this._hp+"%";
        this._healthBar.innerHTML = this._hp+"%";
    }
    setAttackDelay(attackDelay){
        this._attackDelay= attackDelay;
    }
    setHp(hp){
        this._hp = hp;
        this._healthBar.style.width = hp+"%";
        this._healthBar.innerHTML = hp+"%";
    }
    get characterFront(){
        const front ={}
        front.y = this.y+(this.height/2);
        if(this.side === "left"){
            front.x = this.x;
        }else{
            front.x = this.x+ this.width;
        }
        return front
    }
    get attackDelay(){
        return this._attackDelay;
    }
    get lightning(){
        this._attack.coordinateAttack(this);
        return this._attack;
    }
    get renderedLightning(){
        return this._attack;
    }
}



