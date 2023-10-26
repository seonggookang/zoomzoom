// 각각 object 
// request : 요청을 보낸 정보
// response : 
// next : 미들웨어를 사용할 때 callback으로 넘기는 함수.
// request, response, next 이 3가지 매개변수가 express에 의해 자동생성됨.

const PORT = 4000;
const express = require("express"); 
const app = express()
const handleListening = () => {
  console.log(`✔ app is listening on ${PORT} port 🚀`);
};

app.listen(PORT, handleListening);
app.get("/", (req, res) => res.send("home")); // 브라우저에 home 뜸
app.get("/protect", (req, res) => res.send("welcome protect"));
console.log('app >> ', app)
console.log('__dirname >> ', __dirname)