class ZombieService{
    constructor(canvas){
        this._zombies = [];
        this._stains = [];
        this._fadeStain = [];
        this._zombieDelay = 0;
        this._canvas = canvas;
    }
    zombieFactory(left, right, blood, bloodFade, leftDamaged, rightDamaged){
        const imageLeft = new Image()
        imageLeft.src = left;
        imageLeft.alt = "image";
        const imageRight = new Image()
        imageRight.src = right;
        imageRight.alt = "image";
        const bloodImage = new Image()
        bloodImage.src = blood;
        bloodImage.alt = "image";
        const fadedBloodImage = new Image()
        fadedBloodImage.src = bloodFade;
        fadedBloodImage.alt = "image";
        const imageLeftDamaged = new Image()
        imageLeftDamaged.src = leftDamaged;
        imageLeftDamaged.alt = "image";
        const imageRightDamaged = new Image()
        imageRightDamaged.src = rightDamaged;
        imageRightDamaged.alt = "image";
        let x = 0;
        let y = 0;
        switch(Math.floor(Math.random() * 4) + 1){
            case 1:
                x = (Math.floor(Math.random() * (this._canvas.width-1)) + 1) + this._canvas.translateX;
                y = this._canvas.translateY;
                break;
            case 2:
                x = (Math.floor(Math.random() * (this._canvas.width-1)) + 1) + this._canvas.translateX;
                y = this._canvas.translateY+this._canvas.height;
                break;
            case 3:
                x = this._canvas.translateX;
                y = (Math.floor(Math.random() * (this._canvas.height-1)) + 1) + this._canvas.translateY;
                break;
            case 4:
                x = this._canvas.translateX+this._canvas.width;
                y = (Math.floor(Math.random() * (this._canvas.height-1)) + 1) + this._canvas.translateY;
                break;
        }
        const zombie = new Zombie(x, y, 40, 40, imageLeft, imageRight, bloodImage, fadedBloodImage, imageLeftDamaged, imageRightDamaged);
        return zombie;
    }
    zombieSpone(){
        if(this._zombieDelay++ > 30){
            this._zombies.push(this.zombieFactory
                (
                    "./assets/zombie_1_left.png", 
                    "./assets/zombie_1_right.png", 
                    "./assets/blood.png", 
                    "./assets/blood_pale.png",
                    "./assets/zombie_1_left_damaged.png",
                    "./assets/zombie_1_right_damaged.png"
                )
            )
            this._zombieDelay = 0;
        }
    }
    stainCounter(){
        if(this._stains.length > 10){
            const s = this._stains.shift();
            s.fadeBlood();
            this._fadeStain.push(s);
        }
        if(this._fadeStain.length > 10){
            const s = this._fadeStain.shift()
        }
    }
    zombieMove(lajos, collision, freeToMove){
        this._zombies.map(zombie=>{
            zombie.move(lajos);
            if(collision(lajos, zombie)){
                if(!zombie.colliding){
                    zombie.setColliding(true);
                    lajos.setHp(lajos.hp-zombie.dealsDamage)
                }
            }else{
                zombie.setColliding(false);
            }
        })
    }
    setZombies(zombies){
        this._zombies = zombies;
    }
    get zombies(){
        return this._zombies;
    }
    get stains(){
        return this._stains;
    }
    get fadeStain(){
        return this._fadeStain;
    }
}