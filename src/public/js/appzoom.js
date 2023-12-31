const socket = io();

const myFace = document.getElementById("myFace");
// 유저로부터 stream을 받아야함.
// stream = 비디오 + 오디오
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName; // 나중에 우리가 이 value에 접근하기 위해 변수를 만듬
let myPeerConnection;

async function getCameras() {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    // const caeras = devices.filter(device => device.kind === "videoinput");
  } catch (error) {
    console.log(error);
  }
}

async function getMedia() {
  try {
    // 아래 코드는 유저의 유저미디어 string을 줌
    // 1. getUserMedaia()
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true, // constraints. 우리가 얻고싶어하는 것들(오디오, 비디오)
      video: true
    });
    console.log("myStream >> ", myStream);
    myFace.srcObject = myStream; // stream을 myFace안에 넣어줌
    getCameras();
  } catch (error) {
    console.log(error);
  }
}

function handleMuteClick() {
  myStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
  if (!muted) {
    muteBtn.innerText = "Unmute";
    muted = true;
  } else {
    muteBtn.innerText = "Mute";
    muted = false;
  }
}
function handleCameraClick() {
  console.log("myStream Video >> ", myStream.getVideoTracks());
  myStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
  if (!cameraOff) {
    cameraBtn.innerText = "Camera off";
    cameraOff = true;
  } else {
    cameraBtn.innerText = "Camera On";
    cameraOff = false;
  }
}
muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);

// Welcome Form (choose a room)

const welcome = document.getElementById("welcome");
const welcomeForm = welcome.querySelector("form");

async function initCall() {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia(); // 카메라, 마이크 등 다가져옴
  makeConnection(); // 여기는 await을 안해줬네. 기다릴필요가 없는거지.
  // 원래 순서는 offer, answer를 다하고 ice candidate을 시행하는건데, 코드상으로는 반대임. why?
  // Web Socket들의 속도가 media를 가져오는 속도나 연결을 만드는 속도보다 빠름.
}

// 우리가 방에 참가하고 나서 initCall를 호출하지 말고 방에 참가하기 전에 initCall를 호출.
async function handleWelcomeSubmit(event) {
  event.preventDefault();
  const input = welcomeForm.querySelector("input");
  await initCall(); // join_room의 3번째 인자가 아니라 위에서 먼저 호출을 해줘야 에러 발생 안함.
  // 이 모든게 web socket의 속도가 media를 가져오는 속도나, 연결을 만드는 속도보다 빠르기 때문
  socket.emit("join_room", input.value); // 2번째 인자인 value 또는 payload는 사용자가 적은 방이름.
  roomName = input.value;
  input.value = "";
}

welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// 누군가 우리방에 들어온걸 표시 Socket Code
socket.on("welcome", async () => {
  // 이 브라우저는 A브라우저에서만 실행됨( B브라우저가 왔다는 알림을 받는건 A브라우저니까.)
  console.log("someone joined");
  // 3. offer
  const offer = await myPeerConnection.createOffer();
  // 우리가 만든 offer로 연결을 구성해야함
  // 4. setLocalDescription
  myPeerConnection.setLocalDescription(offer);
  console.log("sent the offer");
  // 5. offer 전송
  socket.emit("offer", offer, roomName); // socketio한테 어떤방이 이 offer를 emit할건지 알려야함.그리고 어디로 offer 보낼건지도. // 이제 이게 서버로 갈거임
});

// 7. B 브라우저에서 돌아가는 코드임
socket.on("offer", async offer => {
  console.log("recieved the offer");
  // 8. setRemoteDescription (멀리 떨어진 곳의 description을 세팅해야함)
  myPeerConnection.setRemoteDescription(offer); // A의 description 세팅함. 근데 에러발생. // offer가 도착한 순간 myPeerConnection은 아직 존재하지않음. B브라우저에서 아직 발현이 안됨. 너무 빨라서그럼. 몇가지 수정해야함. initCall 함수를 잘보셈
  // 9. createAnswer
  const answer = await myPeerConnection.createAnswer();
  // 10. setLocalDescription answer
  myPeerConnection.setLocalDescription(answer);
  // 11. answer 생성 후 A브라우저로 보내기(방 이름도 같이)
  socket.emit("answer", answer, roomName);
  console.log("sent the answer");
});

// 13. answer setRemoteDescription
socket.on("answer", answer => {
  console.log("recieved the answer");
  myPeerConnection.setRemoteDescription(answer); // B의 description 세팅함.
}); //여기까지가 ice 하기 전 마지막 스텝.

// 17. offer, answer 끝나고 난 다음 실행. ice candidate 받아서 add하기
socket.on("ice", ice => {
  console.log("received candidate");
  myPeerConnection.addIceCandidate(ice);
});

// RTC Code (이 함수가 실제로 연결을 만드는 함수)
function makeConnection() {
  myPeerConnection = new RTCPeerConnection();
  // myPeerConnection = new RTCPeerConnection({
  //   iceServers: [
  //     {
  //       urls: [
  //         "stun.l.google.com:19302",
  //         "stun1.l.google.com:19302",
  //         "stun2.l.google.com:19302",
  //         "stun3.l.google.com:19302",
  //         "stun4.l.google.com:19302"
  //       ]
  //     }
  //   ]
  // });

  // 이 연결을 모든 곳에 공유위해 myPeerConnection 이라는 변수로 사용.
  // 14. ice candidate 생성 (offer, answer 핑퐁 끝나고 난 다음 실행)
  myPeerConnection.addEventListener("icecandidate", handleIce);
  // >> 누군가 getMedia()함수를 불렀을 때 myStream을 공유. 누구든지 접촉할 수있도록. (let myPeerConnection)
  // 2. addStream() (이건 낡은함수. 더 이상 안씀)
  // console.log("myStream.getTracks()11 >>", myStream.getTracks()); //video, audio가 생김

  // 18. addIceCandidate로 ice 송수신 끝났으니 addStream
  myPeerConnection.addEventListener("addstream", handleAddStream);
  // 20. addTrack();
  myStream
    .getTracks()
    .forEach(track => myPeerConnection.addTrack(track, myStream));
  // 양쪽 브라우저에서 p2p연결을 만들고 양쪽 브라우저에서 카메라, 마이크를 받아서 연결 안에 집어넣음
}

// 15. ice 보내기 : a -> b 브라우저로 candidate들 보내고, b -> a 도 보내고.
function handleIce(data) {
  console.log("sent candidate");
  socket.emit("ice", data.candidate, roomName);
}

// 19. handleAddStream 함수생성
function handleAddStream(data) {
  console.log("got an event from my peer");
  console.log("Peer's Stream", data.stream);
  console.log("My Stream", myStream);
  const peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}
