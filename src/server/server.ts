import express from "express";
import { initWebSockets } from "./websocket";

// SETUP EXPRESS SERVER - PORT 3000
const PORT = 3000;
const app = express();

app.set("port", PORT);
app.use("/", express.static("./client"));
app.use("/scripts", express.static("./dist/game"));

const http = require("http").Server(app);
http.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
    initWebSockets(http);
});