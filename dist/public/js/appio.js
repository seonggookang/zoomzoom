"use strict";

var socket = io(); // back 과 연결하는 코드
// io function은 알아서 socket.io를 실행하고 있는 서버를 찾을거임.
// user가 웹사이트로 가면 방을 만들거나 방에 참가할수 있는 form을 보게 될거야

var welcome = document.getElementById("welcome");
var form = welcome.querySelector("form");
var room = document.getElementById("room");
room.hidden = true;
var roomName;
function addMessage(message) {
  var ul = room.querySelector("ul");
  var li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}
function handleMessageSubmit(event) {
  event.preventDefault();
  var input = room.querySelector("#msg input");
  var value = input.value;
  socket.emit("new_message", input.value, roomName, function () {
    // roomName:방이름( 이렇게 총 인자가 4개가 되버림. 그래도 괜찮음. 몇개가 와도 상관없음)
    // 인자가 여러개 올 수 있음.
    console.log("emit new_message안의 콘솔");
    addMessage("You : ".concat(value)); // value라고 안하고 그냥 input.value라고 해주면 아래 코드에 의해 빈칸으로 나오게됨
  }); // 백엔드에 이벤트를 발생시킴. 백엔드에 메세지를 보내고, 3번째 인자는 백엔드에서 시작시킬 function.
  input.value = "";
  console.log("맨 밑줄의 콘솔"); // 이거부터 찍히네. 그래서 위에 input.value라고 하면 빈칸으로 나옴.
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  var input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}
function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  var h3 = room.querySelector("h3");
  h3.innerText = "Room ".concat(roomName);
  var msgForm = room.querySelector("#msg");
  var nameForm = room.querySelector("#name");
  msgForm.addEventListener("submit", handleMessageSubmit);
  nameForm.addEventListener("submit", handleNicknameSubmit);
}
function handleRoomSubmit(event) {
  event.preventDefault();
  var input = form.querySelector("input");
  // 특정한 event를 전송할 수 있음. 어떤이름인든 상관x
  // string이 아닌 object를 전송할 수 있음 .socketio를 안쓰면 stringify parse 로 보내고받고 해야함.
  socket.emit("enter_room", input.value, showRoom); // 3번째 인자인 함수가 프론트에 있지만 서버로부터 실행되는 function.
  roomName = input.value; // 방 이름
  // 몇개가 와도 상관없다. 문자열 숫자 아무거나 상관없다
  // 단 , 끝날 때 실행되는 function을 보내고 싶으면 마지막에 넣어야함
  input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);
socket.on("welcome", function (user, newCount) {
  var h3 = room.querySelector("h3");
  h3.innerText = "Room ".concat(roomName, " (").concat(newCount, ")");
  addMessage("".concat(user, " arrived!"));
});
socket.on("bye", function (left, newCount) {
  var h3 = room.querySelector("h3");
  h3.innerText = "Room ".concat(roomName, " (").concat(newCount, ")");
  addMessage("".concat(left, ".. come back.."));
});
socket.on("new_message", addMessage); // emit을 어디서 했는지 확인해라.  msg가 오고있다. 그건 input.value임.
// socket.on("new_message", (msg)=>addMessage(msg)); 윗줄과 동일한 코드임.

socket.on("room_change", function (rooms) {
  // rooms : 서버의 publicRooms의 반환값
  var roomList = welcome.querySelector("ul");
  roomList.innerHTML = ""; // 항상 roomList를 비워줘야 다른 브라우저로부터 입장했을 때 중복 Open rooms가 안생김
  // if (rooms.length === 0) {
  //   // 이건 왜 있는가?
  //   return;
  // }
  console.log("return을 해줬다 이거는 콘솔 찍히는가?222");
  rooms.forEach(function (room) {
    var li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});