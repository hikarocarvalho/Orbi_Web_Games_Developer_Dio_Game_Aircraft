import Game from "./../js/Game.js";

class Script{
    constructor(){
        this._play = true;
        this._menu = document.getElementById("start");
    }

    play(){
        if(this._play){
            this._play = false;
            let game = new Game();
            this.getPressed(game);
            game.setGameComponents();
            game.controllers();
            this.createDisplays(game);
            game.start();
            let gameOverVerify = window.setInterval(()=>{
            if(game._gameInterval === null){
                window.clearInterval(gameOverVerify);
                gameOverVerify = null;
                game = {};
                this._menu.style.display = "flex";
            }},30);
        }
    }

    createDisplays(game){
        let displayPoint = document.createElement("article");
        displayPoint.classList.add("displayPoint");
        displayPoint.id = "displayPoint";

        let displayLife = document.createElement("article");
        displayLife.classList.add("displayLife");
        displayLife.id = "displayLife";

        let displaySafe = document.createElement("article");
        displaySafe.classList.add("displaySafe");
        displaySafe.id = "displaySafe";

        let displays = document.createElement("section");
        displays.classList.add("displays");
        displays.id = "displays";

        displays.appendChild(displayLife);
        displays.appendChild(displayPoint);
        displays.appendChild(displaySafe);

        game._gameElement.appendChild(displays);
        game.displayElement = document.getElementById("displays");

    }

    restart(){

    }

    getPressed(game){
        $(document).keydown(function(e){
            game._pressed[e.which] = true;
        });
        
        $(document).keyup(function(e){
            game._pressed[e.which] = false;
        });
    }

    load(){
        this._menu.addEventListener("click",()=>{
            this._menu.style.display = "none";
            this.play();
        });
    }
}

const script = new Script();
script.load();