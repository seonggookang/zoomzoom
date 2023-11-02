"use strict";

var messageList = document.querySelector("ul");
var nickForm = document.querySelector("#nick");
var messageForm = document.querySelector("#message");

// function fn(event) {} // event가 안에 있는 것을 알아
// form.addEventListener("submit", fn); // event 정보랑 같이 fn을 호출.

// 여기에서의 socket 서버로의 연결을 뜻함
var socket = new WebSocket("ws://".concat(window.location.host)); // front에 back 연결해달라고 요청하는 코드

function makeMessage(type, payload) {
  var msg = {
    type: type,
    payload: payload
  };
  return JSON.stringify(msg);
}
socket.addEventListener("open", function () {
  // socket이 open됐으면 브라우저에 연결됐다고 로그 출력
  console.log("connected to Server ✔");
});
socket.addEventListener("message", function (message) {
  // 백 -> 프 보내는거 듣기
  // 메세지를 받았을 때 사용하는 listener
  console.log("New message : ", message.data);
  var li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});
socket.addEventListener("close", function () {
  console.log("Disconnected from Server ❌");
});

// 채팅
function handleMessageSubmit(event) {
  event.preventDefault();
  var input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value)); // 프->백 작성한걸 보내는중 Stringify 해줘야함
  console.log(input.value); // socket.send 를 하면 보낼수있는거임
  var li = document.createElement("li");
  li.innerText = "You ".concat(input.value);
  messageList.append(li);
  input.value = "";
}

// 닉네임
function handleNikcSubmit(event) {
  event.preventDefault();
  var input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value)); // send에 hover해보면 string data만 보낼 수 있음
  input.value = "";
}
messageForm.addEventListener("submit", handleMessageSubmit);
nickForm.addEventListener("submit", handleNikcSubmit);