import Asset from "./../js/Asset.js";

class Friend extends Asset{
    constructor(positionX,positionY,velocity, maxHorizontal,maxVertical){
        super(positionX,positionY,"friend",maxHorizontal,maxVertical);
        this._velocity = velocity;
        this._dead = false;
        this._saved = 0;
        this._isSaved = false;
        this._rescueSound = document.getElementById("somResgate");
        this._lostFriend = document.getElementById("somPerdido");
    }

    move(){
        if(!this._dead && !this._isSaved){
            if(this._positionX <= this._maxHorizontal + 180){
                this.moveHorizontal(this._velocity);
            }else{
                this.setPositionX(0);
                this.setAssetPosition();
            }
        }
    }

    death(gameElement){
        if(!this._dead){
            this._dead = true;
            let deathElement = document.createElement("div");
            deathElement.classList.add("death");
            deathElement.id = "death";
            
            deathElement.style.top = this._positionY + "px";
            deathElement.style.left = this._positionX + "px";
            this._lostFriend.play();
            gameElement.appendChild(deathElement);
            this.getElement().remove();

            let deathTime=window.setInterval(()=>{
                $("#death").remove();            
                window.clearInterval(deathTime);
                deathTime = null;
                this._positionX = this._startPostion[0];
                this._positionY = this._startPostion[1];
                this.createElement(gameElement);
                this._dead = false;
            }, 1000);
        }
    }

    save(gameElement){
        if(!this._isSaved){
            this._isSaved = true;
            this.getElement().remove();
            this._rescueSound.play();
            let savedTime = window.setInterval(()=>{
                window.clearInterval(savedTime);
                savedTime = null;
                this._saved += 5;
                this._isSaved = false;
                this.createElement(gameElement);
            }, 1000);
        }
    }

    getSaved(){
        return this._saved;
    }
}

export default Friend;