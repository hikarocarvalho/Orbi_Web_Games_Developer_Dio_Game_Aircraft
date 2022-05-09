import Player from "./../js/Player.js";
import Enemy from "./Enemy.js";
import Friend from "./Friend.js";

class Game{
    constructor(){
        this._screenWidthSize = window.screen.width-320;
        this._screenHeightSize = window.screen.height-350;
        this._gameElement = document.getElementById("game");
        this.displayElement = null;
        this._gameInterval = null;
        this._elements = [];
        this._saveFriend = 0;
        this._points = 0;
        this._backgroundSound = document.getElementById("musica");
        this._gameOverSound = document.getElementById("somGameover");
        this._pressed = [];
        this._control = {
            W: 87,
            S: 83,
            D: 68,
            A: 65,
            F: 70
        }
    }

    gameLoop(){
        this.controllers();
        this.moveBackground();
        this._elements[1].move(this._screenWidthSize);
        this._elements[2].move();
        this._elements[3].move();
        this.verifyColigions();
        this.setDisplays(); 
        this.gameOver();
    }

    setGameComponents(){
        this._elements.push(new Player(0,this._screenHeightSize/2, 5, this._screenWidthSize, this._screenHeightSize));
        this._elements.push(new Friend(0, this._screenHeightSize, 1, this._screenWidthSize, this._screenHeightSize));
        this._elements.push(new Enemy(this._screenWidthSize+256, this._screenHeightSize,4,"truck", this._screenWidthSize,this._screenHeightSize,true))        
        this._elements.push(new Enemy(this._screenWidthSize+256, this._screenHeightSize/2, 5, "helicopter", this._screenWidthSize,this._screenHeightSize,false));

        this._elements.forEach((element,index)=>{
            element.createElement(this._gameElement);
            element.setAssetPosition();
        });

    }

    controllers(){  
            if(this._pressed[this._control.W]){
                this._elements[0].moveUp();
            }
            if( this._pressed[this._control.S]){

                this._elements[0].moveDown();
            }
            if(this._pressed[this._control.A]){
                this._elements[0].moveBackward();
            }
            if(this._pressed[this._control.D]){
                this._elements[0].moveFoward();
            }
            if(this._pressed[this._control.F]){
                this._elements[0].shoot(this._gameElement,this._screenWidthSize);
            } 
    }

    moveBackground(){
        let left = this._gameElement.style.backgroundPositionX;
        if(left === ''){
            left = 0;
        }else{
            left = parseInt(left.replace("px"));
        }
        this._gameElement.style.backgroundPositionX = left - 3 + "px";
    }
    
    verifyColigions(){
        if($("#player").collision($("#helicopter")).length > 0){
            this._elements[3].explosion(this._gameElement);
            this._elements[0].lostLife(10);
        }
        if($("#player").collision($("#truck")).length > 0){
            this._elements[2].explosion(this._gameElement);
            this._elements[0].lostLife(5);
        }
        if($("#friend").collision($("#truck")).length > 0){
            this._elements[1].death(this._gameElement);
            this._elements[0].lostLife(3);
        }
        if($("#player").collision($("#friend")).length > 0){
            this._elements[1].save(this._gameElement);
        }
        if($("#shoot")){
            if($("#shoot").collision($("#helicopter")).length > 0){
                this._elements[3].explosion(this._gameElement);
                this._points += 5;
                $("#shoot").remove();
            }
            if($("#shoot").collision($("#truck")).length > 0){
                this._elements[2].explosion(this._gameElement);
                this._points += 5;
                $("#shoot").remove();
            }
        }
    }

    start(){
        this._backgroundSound.play();
        this._gameInterval = setInterval(()=>this.gameLoop(),30);
    }

    setDisplays(){
        this.displayElement.children[1].innerHTML = "Points :" + this._points;
        this.displayElement.children[0].innerHTML = "HP: " + this._elements[0].getLifeSize(); 
        this.displayElement.children[2].innerHTML = "Saved Friend: " + this._elements[1].getSaved(); 
    }

    pause(){

    }

    destroyComponents(){
        this._elements.forEach((element)=>{
            if(element.getElement()){
                element.getElement().remove();
            }
        })
    }

    gameOver(){
        if(this._elements[0].getLifeSize()<=0){
            this._gameOverSound.play();
            window.clearInterval(this._gameInterval);
            this._gameInterval = null;
            this.destroyComponents();
        };
    }
}

export default Game;