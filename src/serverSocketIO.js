import http from "http";
import SocketIO from "socket.io";
import express from "express";
import { disconnect } from "process";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); // public 폴더를 유저에게 제공
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app); // http 서버생성. express이용해서.
const wsServer = SocketIO(httpServer); // 통상적으로 io로 변수를 둠.

function publichRooms() {
  const {
    sockets: {
      adapter: { sids, rooms }
    }
  } = wsServer; // 아래 2줄과 동일.
  // const sids = wsServer.sockets.adapter.sids;
  // const rooms = wsServer.sockets.adapter.rooms;
  const publichRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      // 중복되지 않은게 public room
      publichRooms.push(key);
    }
  });
  return publichRooms;
}

// 몇 명있는지 세주는 함수
function countRoom(roomName) {
  return wsServer.sockets.adapter.rooms.get(roomName)?.size; // 가끔 Set일 때도, 아닐 때도 있어서 '?'로 표시
}

// 새로운 connection 등록할 준비됨.
wsServer.on("connection", socket => {
  socket["nickname"] = "Anon";
  socket.onAny(event => {
    console.log("adapter >> ", wsServer.sockets.adapter);
    console.log(`Socket Event:${event}`);
  });
  socket.on("enter_room", (roomName, done) => {
    // 브라우저 2개를 키면 이 enter_room은 2번 실행됨.
    // 1번쨰 인자는 값, 2번째는 우리가 콜할 function
    console.log("socket.rooms >> ", socket.rooms);
    socket.join(roomName);
    done(); // 프론트에 있는 showRoom() 실행.
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName)); // welcome event를 roomName에 있는 모든 사람에게 emit함.
    // socket.to 이 기능 자체가 나 제외하고 다른 브라우저에게 말하라는거임.
    // 윗줄 아랫줄 차이. 위는 특정 방에 있는 자에게 메세지, 아래는 모든 socket에 메세지 보냄.
    wsServer.sockets.emit("room_change", publichRooms()); // 우리 서버안에 있는 모든 방의 array를 줌.
    // setTimeout(() => {
    //   done("hello from the backend"); // 프론트에 있는 함수. 백엔드가 실행시킴. 보안문제가 생긴다.. 누군가 너의 db를 지우는 코드를 작성할 수도 있자나.
    // }, 1000);
    socket.on("disconnecting", () => {
      // disconnecting : 방을 떠나기 바로 직전에 발생
      socket.rooms.forEach(
        room =>
          socket.to(room).emit("bye", socket.nickname, countRoom(roomName) - 1) // 위 welcome과 bye event를 보낼 때 소켓 닉네임을 우리에게 줌.
        // 퇴장하기 직전에도 countRoom, 그래서 -1 해줘야함. 나까지 계산되면 안되니까.
      );
    });
    socket.on("disconnect", () => {
      wsServer.sockets.emit("room_change", publichRooms());
    });

    socket.on("new_message", (msg, room, done) => {
      // 인자를 추가 구성해줌으로써 어떤 방(room)으로 메세지를 보낼것인가에 대한 해결이 됨
      socket.to(room).emit("new_message", `${socket.nickname} : ${msg}`); // 윗줄과 아랫줄 이벤트명이 같아도 된다 , socket에 새로 넣어준 nickname이기에 socket.nickname 사용가능
      done(); // 벡엔드에서 실행하지 않아. 이걸 호출했을때 프론트에서 코드를 실행함.
    });
    socket.on("nickname", nickname => (socket["nickname"] = nickname));
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
