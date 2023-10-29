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

wsServer.on("connection", socket => {
  socket.on("join_room", roomName => {
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  // 6. offer 전송받기
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    // 12. 모두에게 다시 알리기
    socket.to(roomName).emit("answer", answer);
  });
  // 15. ice받기
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

const handelListen = () => console.log("Listening on http://localhost:3000");
httpServer.listen(3000, handelListen);
