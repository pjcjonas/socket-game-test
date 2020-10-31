import { initWebSockets } from "./websocket";
const express = require('express');
// SETUP EXPRESS SERVER - PORT 3000
const PORT = 3000;
const app = express();

app.set("port", PORT);
app.use("/", express.static("./client"));
app.use("/scripts", express.static("./dist/game"));
app.use("/phaser", express.static("./node_modules/phaser/dist"));

const http = require("http").Server(app);
http.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
    initWebSockets(http);
});