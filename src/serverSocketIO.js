// import http from "http";
// import https from "https";
// import { Server } from "socket.io";
// import fs from "fs";
// import express from "express";
const http = require("http");
const https = require("https");
const Server = require("socket.io");
const fs = require("fs");
const express = require("express");

const app = express();

app.set("view engine", "ejs"); // view engine을 ejs로 설정
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public")); // public 폴더를 유저에게 제공
app.get("/", (_, res) => res.render("home"));

const httpServer = http.createServer(app); // http 서버생성. express이용해서.
const options = {
  ca: fs.readFileSync(__dirname + "/server.csr"),
  key: fs.readFileSync(__dirname + "/server.key"),
  cert: fs.readFileSync(__dirname + "/server.crt")
};
const httpsServer = https.createServer(options, app);
// const wsServer = SocketIO(httpServer);
// const wsServer = new Server(server);
// const wsServer = Server(httpServer);
const wsServer = Server(httpsServer);

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
  // 16. ice받기
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

// 클라
httpServer.listen(
  3000,
  console.log("Listening on 'http' from serverSocketIO.js")
);

// 서버
httpsServer.listen(443, () => {
  console.log("Server is running at https://3.36.61.0");
});
