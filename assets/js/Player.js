import Asset from "./../js/Asset.js";

class Player extends Asset{
    constructor(positionX,positionY,velocity,maxHorizontal,maxVertical){
        super(positionX,positionY,"player",maxHorizontal,maxVertical);
        this.velocity = velocity;
        this.shootVelocity = 10;
        this._canShoot = true;
        this._life = 100;
        this._shootSound = document.getElementById("somDisparo");
    }

    moveFoward(){
        if(this._positionX < (this._maxHorizontal - 66)){
            this.setPositionX(this._positionX + this.velocity);
            this.setAssetPosition();
        }
    }

    moveBackward(){
        if(this._positionX > 0){
            this.setPositionX(this._positionX - this.velocity);
            this.setAssetPosition();
        }
    }

    moveUp(){
        if(this._positionY >= 66){
            this.setPositionY(this._positionY - this.velocity);
            this.setAssetPosition();
        }
    }

    moveDown(){
        if(this._positionY < (this._maxVertical)){
            this.setPositionY(this._positionY + this.velocity);
            this.setAssetPosition();
        }
    }

    shoot(gameElement, maxLeft){
        if(this._canShoot){
            this._canShoot = false;
            this._shootSound.play();
            let shootElement = document.createElement("div");
            shootElement.classList.add("shoot");
            shootElement.id = "shoot";
            gameElement.appendChild(shootElement);

            shootElement = document.getElementById("shoot");
            shootElement.style.top = (this._positionY + 40) + "px";
            shootElement.style.left = (this._positionX + 170)+ "px";

            let shootTime = window.setInterval(()=>{      
                shootElement.style.left = (parseInt(shootElement.style.left.replace("px","")) + this.shootVelocity) + "px";
                if(parseInt(shootElement.style.left.replace("px",""))>(maxLeft+200)){
                    shootElement.remove();
                    window.clearInterval(shootTime);
                    shootTime = null;
                    this._canShoot = true;
                }
            },5);
        }
    }

    lostLife(damage){
        this._life -= damage;
    }

    getLifeSize(){
        return this._life;
    }
}

export default Player;