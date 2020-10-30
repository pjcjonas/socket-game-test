"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var socket = io("http://localhost:3000");
var movement = {
    up: false,
    down: false,
    left: false,
    right: false
};
var myPlayer;
var otherPlayers = [];
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.connectPlayer = function () {
            socket.emit('new player');
        };
        this.getMyPlayerConnection = function () {
            socket.on('connection info', function (data) {
                myPlayer = data;
                console.log("MY PLAYER", myPlayer);
            });
            socket.on('other players', function (data) {
                otherPlayers = data;
                console.log("MY OPPONENTS", otherPlayers);
            });
        };
        this.setKeboardEvents = function () {
            _this.keyEvents('keyup', false);
            _this.keyEvents('keydown', true);
            setInterval(function () {
                socket.emit('player movement', movement);
            }, 1000 / 60);
        };
        this.keyEvents = function (direction, active) {
            document.addEventListener(direction, function (event) {
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
        };
        this.onBeforCloseEvent = function () {
            window.addEventListener("beforeunload", function (e) {
                socket.emit("user disconnected");
            }, false);
        };
        this.connectPlayer();
        this.getMyPlayerConnection();
        this.onBeforCloseEvent();
        this.setKeboardEvents();
    }
    return Game;
}());
new Game();
