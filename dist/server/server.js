"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var websocket_1 = require("./websocket");
// SETUP EXPRESS SERVER - PORT 3000
var PORT = 3000;
var app = express_1.default();
app.set("port", PORT);
app.use("/", express_1.default.static("./client"));
app.use("/scripts", express_1.default.static("./dist/game"));
var http = require("http").Server(app);
http.listen(PORT, function () {
    console.log("listening on http://localhost:" + PORT);
    websocket_1.initWebSockets(http);
});
