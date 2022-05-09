class Asset{
    constructor(positionX,positionY,name,maxHorizontal,maxVertical){
        this._positionX = positionX;
        this._positionY = positionY;
        this._startPostion = [positionX,positionY];
        this._element = null;
        this._name = name;
        this._hasExploded = false;
        this._explosionSound = document.getElementById("somExplosao");
        this._maxHorizontal = maxHorizontal;
        this._maxVertical = maxVertical;
    }

    setPositionX(newPosition){
        this._positionX = newPosition;
    }

    setPositionY(newPosition){
        this._positionY = newPosition;
    }

    createElement(gameElement){
        this.setStartPosition();
        this._element = document.createElement("article");
        this._element.classList.add(this._name);
        this._element.id = this._name;
        this._element.style.top = this._startPostion[1];
        this._element.style.left = this._startPostion[0];
        gameElement.appendChild(this._element);
    }

    setAssetPosition(){
        document.getElementById(this._name).style.top = this._positionY + "px";
        document.getElementById(this._name).style.left = this._positionX + "px";
    }

    setStartPosition(){
        this._positionX = this._startPostion[0];
        this._positionY = this._startPostion[1];
    }

    getElement(){
        this._element = document.getElementById(this._name)
        return this._element;
    }

    moveHorizontal(range){
        if(!this._hasExploded){
            this.setPositionX(this._positionX+range);
            this.setAssetPosition();
        }
    }

    moveVertical(range){
        if(!this._hasExploded){
            this.setPositionY(this._positionY+range);
            this.setAssetPosition();
        }
    }

    explosion(gameElement){
        if(!this._hasExploded){
            this.getElement().remove();
            this._hasExploded = true;
            let explosion = document.createElement("div");
            explosion.classList.add("explosion");
            explosion.id = "explosion";

            explosion.style.left = this._positionX + "px";
            explosion.style.top = this._positionY + "px";
            
            gameElement.appendChild(explosion);
            this._explosionSound.play();
            $("#explosion").animate({
                width:250, height:87, opacity:0.8	
            }, "fast");

            var explosionTime = window.setInterval(()=>{
                explosion = document.getElementById("explosion");
                explosion.remove();

                this.createElement(gameElement);
                this.setStartPosition();
                this.setAssetPosition();

                window.clearInterval(explosionTime);
                explosionTime = null;
                this._hasExploded = false;
            }, 1000);
        }
    }
}

export default Asset;