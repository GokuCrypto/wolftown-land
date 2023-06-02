import { SOCKT_API } from './WolfConfig';

//变量
export let xsws: any;

export let websock = () => {


  if (xsws) {
    return xsws;
  } else {

    const XAccessToken = localStorage.getItem('XAccessToken');
    const uid = localStorage.getItem('userInfo_userid');

    // eslint-disable-next-line eqeqeq
    if (XAccessToken && (XAccessToken != "") && uid != "") {

      initWebSocket(null, uid, XAccessToken)
    }
  }


};


/*初始化socket */
export function initWebSocket(pageType: any, userId: any, paramUrl: any) {
  // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
  // var userId = store.getters.userInfo.id;


  var url = SOCKT_API + "wolftownSocket/" + userId + "/" + paramUrl;;

  const xswsInit = {
    websock: new WebSocket(url),
    lockReconnect: false,
    heartCheck: null,
  }
  xswsInit.websock.onopen = websocketOnopen;
  xswsInit.websock.onerror = websocketOnerror;
  xswsInit.websock.onmessage = websocketOnmessage;
  xswsInit.websock.onclose = websocketOnclose;
  xswsInit.lockReconnect = false;

  xsws = xswsInit;


}
export function websocketOnopen() {
  console.log("WebSocket连接成功");
  //心跳检测重置
  xsws.heartCheck.reset().start();
}
export function websocketOnerror(e: any) {
  console.log("WebSocket连接发生错误");
  reconnect();
}
export function websocketOnmessage(e: any) {
  console.log("-----接收消息-------", e.data);
  var data = eval("(" + e.data + ")"); //解析对象
  console.log("接收到的信息：" + e.data);
  //心跳检测重置
  xsws.heartCheck.reset().start();
}
export function websocketOnclose(e: any) {
  console.log("connection closed (" + e.code + ")");
  reconnect();
}
export function websocketSend(text: any) { // 数据发送
  try {
    xsws.websock.send(text);
  } catch (err: any) {
    console.log("send failed (" + err.code + ")");
  }
}

export function reconnect() {
  if (xsws.lockReconnect) return;
  xsws.lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function () {
    const XAccessToken = localStorage.getItem('XAccessToken');
    const uid = localStorage.getItem('userInfo_userid');

    // eslint-disable-next-line eqeqeq
    if (XAccessToken && (XAccessToken != "") && uid != "") {

      initWebSocket(null, uid, XAccessToken)
      xsws.lockReconnect = false;
    }


  }, 5000);
}
export function heartCheckFun() {
  //心跳检测,每20s心跳一次
  xsws.heartCheck = {
    timeout: 20000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
      clearTimeout(this.timeoutObj);
      //clearTimeout(this.serverTimeoutObj);
      return this;
    },
    start: function () {

      this.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        websocketSend("HeartBeat");
        console.info("客户端发送心跳");
        //self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
        //  that.websock.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        //}, self.timeout)
      }, this.timeout)
    }
  }
}

export function websocketclose() {
  xsws.websock.close();
  xsws.lockReconnect = true;
  console.log("关闭websocket");
}