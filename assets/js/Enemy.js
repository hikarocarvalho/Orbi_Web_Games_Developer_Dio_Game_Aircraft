import Asset from "./../js/Asset.js";

class Enemy extends Asset{
    constructor(positionX,positionY,velocity,name,maxHorizontal,maxVertical,stayVertical){
        super(positionX,positionY,name,maxHorizontal,maxVertical);
        this._velocity = velocity;
        this._stayVertical = stayVertical;
    }

    setStartPosition(){
        this._positionX = this._startPostion[0];
        if(this._stayVertical===false){
            this.setPositionY(Math.floor(Math.random() * (this._maxVertical-100))+50);
        }else{
            this._positionY = this._startPostion[1];
        }
    }

    move(){
        this.moveHorizontal(-this._velocity);
        if(this._positionX <= -parseInt(this._element.offsetWidth)){
            this.setPositionX();
            this.setStartPosition(this._maxVertical);
            this.setAssetPosition();
        }
    }

}

export default Enemy;