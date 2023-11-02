"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var socket = io();
var myFace = document.getElementById("myFace");
// 유저로부터 stream을 받아야함.
// stream은 비디오와 오디오가 결합된거.
var muteBtn = document.getElementById("mute");
var cameraBtn = document.getElementById("camera");
var call = document.getElementById("call");
call.hidden = true;
var myStream;
var muted = false;
var cameraOff = false;
var roomName; // 나중에 우리가 이 value에 접근하기 위해 변수를 만듬
var myPeerConnection;
function getCameras() {
  return _getCameras.apply(this, arguments);
}
function _getCameras() {
  _getCameras = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
    var devices, caeras;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return navigator.mediaDevices.enumerateDevices();
        case 3:
          devices = _context3.sent;
          caeras = devices.filter(function (device) {
            return device.kind === "videoinput";
          });
          console.log("caeras >> ", caeras);
          console.log("devices >> ", devices);
          _context3.next = 12;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return _getCameras.apply(this, arguments);
}
function getMedia() {
  return _getMedia.apply(this, arguments);
}
function _getMedia() {
  _getMedia = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return navigator.mediaDevices.getUserMedia({
            audio: true,
            // constraints. 우리가 얻고싶어하는 것들(오디오, 비디오)
            video: true
          });
        case 3:
          myStream = _context4.sent;
          myFace.srcObject = myStream; // stream을 myFace안에 넣어줌
          getCameras();
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(e);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _getMedia.apply(this, arguments);
}
function handleMuteClick() {
  console.log("myStream Audio >> ", myStream.getAudioTracks());
  myStream.getAudioTracks().forEach(function (track) {
    return track.enabled = !track.enabled;
  });
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
  myStream.getVideoTracks().forEach(function (track) {
    return track.enabled = !track.enabled;
  });
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

var welcome = document.getElementById("welcome");
var welcomeForm = welcome.querySelector("form");
function initCall() {
  return _initCall.apply(this, arguments);
} // 우리가 방에 참가하고 나서 initCall를 호출하지 말고 방에 참가하기 전에 initCall를 호출.
function _initCall() {
  _initCall = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          welcome.hidden = true;
          call.hidden = false;
          _context5.next = 4;
          return getMedia();
        case 4:
          // 카메라, 마이크 등 다가져옴
          makeConnection(); // 77번줄에서 78넘어가는 게 이해가 잘 안됨. (아 여기는 await을 안해줬네. 기다릴필요가 없는거지)
          // 78번줄 시행해주고 그다음에 89번줄로 갈텐데.
          // 원래 순서는 offer, answer를 다하고 ice candidate을 시행하는건데, 코드상으로는 반대임. why?
          // Web Socket들의 속도가 media를 가져오는 속도나 연결을 만드는 속도보다 빠르기 때문.
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _initCall.apply(this, arguments);
}
function handleWelcomeSubmit(_x) {
  return _handleWelcomeSubmit.apply(this, arguments);
}
function _handleWelcomeSubmit() {
  _handleWelcomeSubmit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(event) {
    var input;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          event.preventDefault();
          input = welcomeForm.querySelector("input");
          _context6.next = 4;
          return initCall();
        case 4:
          // join_room의 3번째 인자가 아니라 위에서 먼저 호출을 해줘야 에러 발생 안함.
          // 이 모든게 web socket의 속도가 media를 가져오는 속도나, 연결을 만드는 속도보다 빠르기 때문
          socket.emit("join_room", input.value); // 2번째 인자인 value 또는 payload는 사용자가 적은 방이름.
          roomName = input.value;
          input.value = "";
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _handleWelcomeSubmit.apply(this, arguments);
}
welcomeForm.addEventListener("submit", handleWelcomeSubmit);

// 누군가 우리방에 들어온걸 표시 Socket Code
socket.on("welcome", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var offer;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        // 이 브라우저는 A브라우저에서만 실행됨( B브라우저가 왔다는 알림을 받는건 A브라우저니까.)
        console.log("someone joined");
        // 3. offer
        _context.next = 3;
        return myPeerConnection.createOffer();
      case 3:
        offer = _context.sent;
        // 우리가 만든 offer로 연결을 구성해야함
        // 4. setLocalDescription
        myPeerConnection.setLocalDescription(offer);
        console.log("sent the offer");
        // 5. offer 전송
        socket.emit("offer", offer, roomName); // socketio한테 어떤방이 이 offer를 emit할건지 알려야함.그리고 어디로 offer 보낼건지도. // 이제 이게 서버로 갈거임
      case 7:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));

// 7. B 브라우저에서 돌아가는 코드임
socket.on("offer", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(offer) {
    var answer;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("recieved the offer");
          // 8. setRemoteDescription (멀리 떨어진 곳의 description을 세팅해야함)
          myPeerConnection.setRemoteDescription(offer); // A의 description 세팅함. 근데 에러발생. // offer가 도착한 순간 myPeerConnection은 아직 존재하지않음. B브라우저에서 아직 발현이 안됨. 너무 빨라서그럼. 몇가지 수정해야함. initCall 함수를 잘보셈
          // 9. createAnswer
          _context2.next = 4;
          return myPeerConnection.createAnswer();
        case 4:
          answer = _context2.sent;
          // 10. setLocalDescription answer
          myPeerConnection.setLocalDescription(answer);
          // 11. answer 생성 후 A브라우저로 보내기(방 이름도 같이)
          socket.emit("answer", answer, roomName);
          console.log("sent the answer");
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

// 13. answer setRemoteDescription
socket.on("answer", function (answer) {
  console.log("recieved the answer");
  myPeerConnection.setRemoteDescription(answer); // B의 description 세팅함.
}); //여기까지가 ice 하기 전 마지막 스텝.

// 17. offer, answer 끝나고 난 다음 실행. ice candidate 받아서 add하기
socket.on("ice", function (ice) {
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
  console.log("myStream.getTracks()11 >>", myStream.getTracks()); //video, audio가 생김
  // 이 2개를 우리의 stream에 추가.

  // 18. addIceCandidate로 ice 송수신 끝났으니 addStream
  myPeerConnection.addEventListener("addstream", handleAddStream);
  // 20. addTrack();
  myStream.getTracks().forEach(function (track) {
    return myPeerConnection.addTrack(track, myStream);
  });
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
  var peerFace = document.getElementById("peerFace");
  peerFace.srcObject = data.stream;
}