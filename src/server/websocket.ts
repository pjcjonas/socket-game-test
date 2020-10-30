import { IPlayerData, IPlayerMovement } from "./interfaces";

// Properties
let io: any = null;
let players: IPlayerData[] = [];

export const initWebSockets = (http: any) => {
    io = require("socket.io")(http);
    

    // SOCKET CONNECTION TAKES PLACE
    io.on("connection", (socket: any) => {
        socket.on("new player", () => {
            addConnectedPlayer(socket);
            socket.emit('connection info', players[socket.id]);
            socket.emit('other players', getOtherPlayers(socket.id));
        });

        socket.on("user disconnected", () => {
            players = getOtherPlayers(socket.id);
        });

        socket.on("player movement", (movement: IPlayerMovement) => {
            players.map((player: IPlayerData) => {
                if (player.id === socket.id) {
                    player.movement = movement;
                }
                return player;
            });
            socket.emit('other players', getOtherPlayers(socket.id));
        });

    });
}

const addPlayerProperties = (id: string, movement: IPlayerMovement) => {

}

const addConnectedPlayer = (socket: any) => {
    players.push(
        {
            id: socket.id,
            name: socket.id
        }
    );
    console.log("players: ", players);
}

const getOtherPlayers = (id: string): IPlayerData[] => {
    return players.filter((player: IPlayerData) => {
        return player.id != id;
    });
}
