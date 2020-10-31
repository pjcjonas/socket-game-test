import { IPlayerData, IPlayerMovement } from "../server/interfaces/index";
import { GameWorld } from "./modules/world/index";

// @ts-ignore
var socket = io("http://localhost:3000");
let movement: IPlayerMovement = {
    up: false,
    down: false,
    left: false,
    right: false
}

let myPlayer: IPlayerData;
let otherPlayers: IPlayerData[] = [];

class Game {
    constructor() {
        this.connectPlayer();
        this.getMyPlayerConnection();
        this.onBeforCloseEvent();
        this.setKeboardEvents();
        this.loadGameWorld();
    }

    private loadGameWorld = () => {
        const config = {
            type: Phaser.AUTO,
            backgroundColor: '#125555',
            width: 800,
            height: 600,
            scene: GameWorld
        };
        
        const game = new Phaser.Game(config);
    }

    private connectPlayer = () => {
        socket.emit('new player');
    }

    private getMyPlayerConnection = () => {
        socket.on('connection info', (data: IPlayerData) => {
            myPlayer = data;
            console.log("MY PLAYER", myPlayer);
        });

        socket.on('other players', (data: IPlayerData[]) => {
            otherPlayers = data;
            console.log("MY OPPONENTS", otherPlayers);
        });
    }

    private setKeboardEvents = () => {
        this.keyEvents('keyup', false);
        this.keyEvents('keydown', true);

        setInterval(() => {
            socket.emit('player movement', movement);
        }, 1000 / 60);
    }

    private keyEvents = (direction: string, active: boolean) => {
        document.addEventListener(direction, (event) => {
            // @ts-ignore
            switch (event.keyCode) {
                case 65:
                    movement.left = active;
                    break;
                case 87:
                    movement.up = active;
                    break;
                case 68:
                    movement.right = active;
                    break;
                case 83:
                    movement.down = active;
                    break;
            }
        });
    }

    private onBeforCloseEvent = () => {
        window.addEventListener("beforeunload", function(e){
            socket.emit("user disconnected");
         }, false);
    }
}

new Game();