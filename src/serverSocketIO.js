import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); // public 폴더를 유저에게 제공
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app); // http 서버생성. express이용해서.
const wsServer = SocketIO(httpServer); // 통상적으로 io로 변수를 둠.

const handelListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handelListen);
