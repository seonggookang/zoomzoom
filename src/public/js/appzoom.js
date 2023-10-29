const socket = io();

const myFace = document.getElementById("myFace");
// 유저러보투 stream을 받아야함.
// stream은 비디오와 오디오가 결합된거.
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;

async function getMedia() {
  try {
    // 유저의 유저미디어 string을 줌
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    console.log(myStream);
    myFace.srcObject = myStream;
  } catch (error) {
    console.log(e);
  }
}
