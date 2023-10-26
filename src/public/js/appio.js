const socket = io(); // back 과 연결하는 코드
// io function은 알아서 socket.io를 실행하고 있는 서버를 찾을거임.
// user가 웹사이트로 가면 방을 만들거나 방에 참가할수 있는 form을 보게 될거야

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");
room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  socket.emit("new_message", input.value);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMessageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  // 특정한 event를 전송할 수 있음. 어떤이름인든 상관x
  // string이 아닌 object를 전송할 수 있음 .socketio를 안쓰면 stringify parse 지랄발광했어야함.
  socket.emit("enter_room", input.value, showRoom); // 3번째 인자인 함수가 프론트에 있지만 서버로부터 실행되는 function.
  roomName = input.value;
  // 몇개가 와도 상관없다. 문자열 숫자 아무거나 상관없다
  // 단 , 끝날 때 실행되는 function을 보내고 싶으면 마지막에 넣어야함
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("someone joined!");
});

socket.on("bye", () => {
  addMessage("Someone left ㅜㅜ");
});
