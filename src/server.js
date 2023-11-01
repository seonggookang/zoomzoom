import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
// express가 하는 일 : views를 설정해주고 render해줌
// 나머지는 websocket으로 실시간으로 일어남

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); // public 폴더를 유저에게 제공
//우리가 사용할 유일한 route 생성
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const server = http.createServer(app); // http 서버생성. express이용해서.
// http서버 위에 websocket서버 만 듬.
const wss = new WebSocket.Server({ server }); // 이렇게 하면 http 서버, websocket 서버 둘 다 돌릴 수 있음
// 위처럼 하는 이유는 우리의 서버를 만들고 그 다음 http 서버위에 ws서버를 만들기 위함
// 그러므로 localhost는 동일한 포트에서 http, ws request 두개를 처리할 수 있음.

const sockets = []; // 각 브라우저가 연결될 떄 socket을 이 배열에 넣어줌

// 아래 wss.on코드는 백과 연결된 각 브라우저에 대해 모두 작동.
// wss는 서버 전체를 위한것.
// 새로운 브라우저가 입장하면 아래 wss.on 안의 코드가 실행됨.
wss.on("connection", socket => {
  sockets.push(socket);
  socket["nickname"] = "Anonymous"; // 익명으로 들어온 사람 표시
  // socket은 연결된 브라우저를 말함.
  // console.log("socket >>> ", socket); // 이 socket이 front와 실시간으로 소통
  console.log("connected to Browswer ✔");

  socket.on("message", msg => {
    // 프-> 백 보낸거 듣기
    // socket.on message는 특정 socket에서 메시지를 받았을 떄 발생.
    // 브라우저에서 말하는걸 듣는 코드
    const message = JSON.parse(msg);
    console.log("message >> ", message.payload);
    switch (message.type) {
      case "new_message":
        // socket.send(message.toString("utf8"));// 이러면 그냥 자신한테 메세지 보내는거임// sockets(연결된 모든 브라우저)에 보내기
        sockets.forEach(aSocket =>
          aSocket.send(`${socket.nickname} : ${message.payload}`)
        );
      case "nickname": // socket이 누군지 알아야하니 socket 안에 넣어줘야함
        socket["nickname"] = message.payload; // nickname 프로퍼티를 socket에 넣는코드
    }

    // console.log("parsed >> ", parsed); // object
    // console.log("Not parsed >> ", message.toString("utf8")); // string
  });

  socket.on("error", () => {
    console.log("error");
  });

  // 브라우저에서 꺼버리면 아래 코드 발생. on이니까 close를 듣고 있음
  // 동작 안하는 중 왜지???
  // on 중에서도 맨 아래에 위치하니까 동작을 함.
  socket.on("close", () => {
    console.log("Disconnected from the browswer ❌");
  }); // socket에서 event listen
  // socket에 있는 메소드. 서버에 있는게 아니라 socket에!

  // socket.send("hello!"); // 브라우저로 보낼 내용
}); // 여러개의 event가 connection 자리에 들어옴.

server.listen(3000, handelListen);

{
  type: "message";
  payload: "hello everyone";
}
{
  type: "nickname";
  payload: "Steve";
}
