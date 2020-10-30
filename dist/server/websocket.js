"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initWebSockets = void 0;
// Properties
var io = null;
var players = [];
exports.initWebSockets = function (http) {
    io = require("socket.io")(http);
    // SOCKET CONNECTION TAKES PLACE
    io.on("connection", function (socket) {
        socket.on("new player", function () {
            addConnectedPlayer(socket);
            socket.emit('connection info', players[socket.id]);
            socket.emit('other players', getOtherPlayers(socket.id));
        });
        socket.on("user disconnected", function () {
            players = getOtherPlayers(socket.id);
        });
        socket.on("player movement", function (movement) {
            players.map(function (player) {
                if (player.id === socket.id) {
                    player.movement = movement;
                }
                return player;
            });
            socket.emit('other players', getOtherPlayers(socket.id));
        });
    });
};
var addPlayerProperties = function (id, movement) {
};
var addConnectedPlayer = function (socket) {
    players.push({
        id: socket.id,
        name: socket.id
    });
    console.log("players: ", players);
};
var getOtherPlayers = function (id) {
    return players.filter(function (player) {
        return player.id != id;
    });
};
