const c = document.getElementsByClassName('playground')[0];
const header = document.getElementsByTagName('header')[0]
const healthBar = document.getElementById('healthBar');

// kő blokkolja a karaktereket
// pontrendszer
// távoli támadás, tűzlabda
// felszedhető elemek, pont kétszerező, karakter gyorsító, fegyver, pont
// PvP
// rekord tábla

let controller = null;

function start(){
    controller = new Controller(c, header, healthBar);
    controller.startInterval();
}

class Controller{
    constructor(c, header, healthBar){
        this._canvas = new Canvas(c, innerWidth, innerHeight-header.offsetHeight-5);
        this._zombieService = new ZombieService(this._canvas);
        this._heroService = new HeroService(this._canvas);
        this._heroService.heroFactory
        (
            "./assets/mage_left.png", 
            "./assets/mage_right.png", 
            "./assets/lightning_left.png", 
            "./assets/lightning_right.png",
            healthBar,
        )
        this._barrierService = new BarrierService();
        this._barrierService.rockFactory(100, './assets/rock.png');
        this._interval = null;
    }
    render(component){
        this._canvas.ctx.drawImage(component.image, component.x, component.y, component.width, component.height);
    }
    collision(component1, component2){
        if(
            (
                (component1.x <= component2.x && (component1.x+component1.width) >= component2.x) || 
                (component1.x <= (component2.x+component2.width) && (component1.x+component1.width) >= (component2.x+component2.width))
            ) 
            &&
            (
                (component1.y <= component2.y && (component1.y + component1.height) >= component2.y) || 
                (component1.y <= (component2.y + component2.height) && (component1.y + component1.height) >= (component2.y + component2.height))
            )
        ){
            return true;
        }
        return false;
    }
    startInterval(){
        this._interval = setInterval(()=>{
            this.onTimerTick()
        }, 17);
    }
    onTimerTick(){
        this._heroService.detectKeys();
        this._canvas.ctx.clearRect(this._canvas.translateX, this._canvas.translateY, this._canvas.width, this._canvas.height);
        this._zombieService.stainCounter();
        this._zombieService.zombieSpone();
        this._zombieService.zombieMove(this._heroService.hero, this.collision, this._barrierService.freeToMove);
        this._heroService.heroMovement();
        this._heroService.heroAttack(this._zombieService, this.collision);
        this.display()
        this._heroService.removeKeys();
        
        if(this._heroService.hero.hp < 1){
            this.end();
        }
    }
    display(){
        // stains
        this._zombieService.fadeStain.map(stain =>{
            this.render(stain);
        })
        this._zombieService.stains.map(stain =>{
            this.render(stain);
        })
        // zombies
        this._zombieService.zombies.map(zombie =>{
            this.render(zombie)
        })
        // hero
        this.render(this._heroService.hero);
        // rocks
        this._barrierService.rocks.map(rock =>{
            this.render(rock);
        })
        // attack
        if(this._heroService.hero.attackDelay !== 0){
            this.render(this._heroService.hero.renderedLightning);
        }
        if(this._heroService.keys.includes('y') && this._heroService.hero.attackDelay === 0){
            this.render(this._heroService.hero.lightning);
        }
    }
    end(){
        clearInterval(this._interval);
        this._zombieService = new ZombieService(this._canvas);
        this._canvas.ctx.font = "4em Arial";
        this._canvas.ctx.fillStyle = "red";
        this._canvas.ctx.textAlign = "center";
        this._canvas.ctx.fillText("Your brain has been devoured", this._canvas.width/2, this._canvas.height/2);
    }
}