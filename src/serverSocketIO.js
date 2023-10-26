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

// 새로운 connection 등록할 준비됨.
wsServer.on("connection", socket => {
  socket.onAny(event => {
    console.log(`Socket Event:${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    // 브라우저 2개를 키면 이 enter_room은 2번 실행됨.
    // 1번쨰 인자는 값, 2번째는 우리가 콜할 function
    console.log("socket.rooms >> ", socket.rooms);
    socket.join(roomName);
    done(); // 프론트에 있는 showRoom() 실행.
    socket.to(roomName).emit("welcome"); // welcome event를 roomName에 있는 모든 사람에게 emit함.
    // socket.to 이 기능 자체가 나 제외하고 다른 브라우저에게 말하라는거임.
    // setTimeout(() => {
    //   done("hello from the backend"); // 프론트에 있는 함수. 백엔드가 실행시킴. 보안문제가 생긴다.. 누군가 너의 db를 지우는 코드를 작성할 수도 있자나.
    // }, 1000);
    socket.on("disconnecting", () => {
      socket.rooms.forEach(room => socket.to(room).emit("bye"));
    });
  });
});

const handelListen = () => console.log("Listening on http://localhost:3000");

httpServer.listen(3000, handelListen);

{
  type: "message";
  payload: "hello everyone";
}
{
  type: "nickname";
  payload: "Steve";
}
