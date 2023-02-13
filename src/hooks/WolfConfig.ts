/* eslint-disable global-require */
import firebase from 'firebase/compat/app';
import { _getAddress, _getProvider } from './ethereum';
import { useEffect } from 'react';
import { ERRORS } from "lib/errors";
import { WolfMarket } from './modules/WolfMarket';
// if (location.search && location.search.match(/enter-test-mode/)) localStorage.setItem('IsWolfTownTest', 'true');
// localStorage.setItem('IsWolfTownTest', 'true');
// const IsTest = localStorage.getItem('IsWolfTownTest') === 'true';
let DEBUG_ADDRESS = '';

// 背景图



export const WolfConfig = () => {
  useEffect(() => {
    global.document = window.document;
    // eslint-disable-next-line no-restricted-globals
    const url = new URLSearchParams(location.search || '');
    const observation = url.get('observation');
    if (observation) DEBUG_ADDRESS = observation;
  })
}





const IsTest = true;
const IsDevelopment = process.env.NODE_ENV === 'development';

/* 聚合登录配置 */
export const firebaseConfig = {
  apiKey: "AIzaSyANOyv5NGdl2KKu88wmPRIeyd7D4lrtZOw",
  authDomain: "wolftown-94ec6.firebaseapp.com",
  projectId: "wolftown-94ec6",
  storageBucket: "wolftown-94ec6.appspot.com",
  messagingSenderId: "972388201162",
  appId: "1:972388201162:web:3fa85c2ca47afb64a73a33",
  measurementId: "G-4VT8SY55VC"
};


/* 正在登录 */


// eslint-disable-next-line import/no-mutable-exports
export let LoginUser: {
  displayName: string;
  email: string;
  account: string;
  emailVerified: boolean;
  photoURL: string;
  uid: string;
  phoneNumber: string;
  providerData: any[];
  accessToken: string;
} = {
  displayName: "",
  email: "",
  account: "",
  emailVerified: false,
  photoURL: "",
  uid: "",
  phoneNumber: "",
  providerData: [],
  accessToken: "",
}




/* 聚合登录登录信息 */
export const initApp = async function () {

  // 先缓存读取数据
  const login = localStorage.getItem('LoginUser');
  if (login != null && login !== "") {
    // eslint-disable-next-line no-eval
    const loginuser = eval(JSON.parse(login));
    if (loginuser.uid !== "") {

      LoginUser = loginuser;

    } else if (loginuser.uid === "" && LoginUser.uid !== "") {

      localStorage.setItem('LoginUser', JSON.stringify(LoginUser));

    }
  }


  /* 登录成功 */
  if (LoginUser.uid === "") {
    firebase.auth().onAuthStateChanged(function (user) {

      if (user) {
        // User is signed in.
        const { displayName } = user;
        const { email } = user;
        const { emailVerified } = user;
        const { photoURL } = user;
        const { uid } = user;
        const { phoneNumber } = user;
        const { providerData } = user;
        user.getIdToken().then(function (accessToken) {
          LoginUser.displayName = displayName ? displayName : "";
          LoginUser.email = email ? email : "";
          LoginUser.account = email ? email : "";
          LoginUser.emailVerified = emailVerified;
          LoginUser.phoneNumber = phoneNumber ? phoneNumber : "";
          LoginUser.phoneNumber = phoneNumber ? phoneNumber : "";
          LoginUser.photoURL = photoURL ? photoURL : "";
          LoginUser.uid = uid;
          LoginUser.accessToken = accessToken;
          LoginUser.providerData = providerData;
        });
      } else if (LoginUser.uid === "") {
        // User is signed out.
        LoginUser = {
          displayName: "",
          email: "",
          account: "",
          emailVerified: false,
          photoURL: "",
          uid: "",
          phoneNumber: "",
          providerData: [],
          accessToken: "",
        }
      }
    }, function (error) {
      console.log(error);
    });
    // 载入缓存
    localStorage.setItem('LoginUser', JSON.stringify(LoginUser));


    /* 登陆服务器 */
    await Login();
  }






};
/* 聚合登录登录信息 */

export const loginOut = async function () {
  // try{
  //   firebase.auth().signOut();  
  // } catch(e) {
  //   console.log('err', e)
  // }

  // User is signed out.
  LoginUser = {
    displayName: "",
    email: "",
    account: "",
    emailVerified: false,
    photoURL: "",
    uid: "",
    phoneNumber: "",
    providerData: [],
    accessToken: "",
  }


  localStorage.removeItem('LoginUser');
  localStorage.setItem('XAccessToken', "");
  localStorage.setItem('userInfo_userid', "");

};
export const loginInEth = async function () {

  const count = await _getAddress();
  if (count && LoginUser.uid === "") {
    LoginUser.email = count;
    const provider = _getProvider();
    const signature = await provider?.getSigner().signMessage('Login Hash')
    console.log("signature", signature);
    if (!signature) return

    LoginUser.uid = signature;
    LoginUser.email = count;

    localStorage.setItem('LoginUser', JSON.stringify(LoginUser));

    /* 登陆服务器 */
    await Login();
  }

};

export const isLoggedIn = function () {
  const login = localStorage.getItem('LoginUser');
  const accessToken = localStorage.getItem("XAccessToken")
  console.log(login)
  if (login) {
    const logObj = JSON.parse(login)
    return logObj.uid !== '' && accessToken !== ''
  } else {
    return false
  }
}




/* export const HASH_GAME_API = "https://api.wolftown.games/jeecg-boot"; */

/* export const HASH_GAME_API = "http://localhost:8080/jeecg-boot/"; */
/* test */
export const HASH_GAME_API = "https://devapi.wolftown.games/jeecg-boot";

export const APP_WOLF_API = "https://app.wolftown.games/images/wtanimalsSmall/";

/* 配置数据 */
export const API_CONFIG = {
  Login: `${HASH_GAME_API}/sys/login`,
  Logout: `${HASH_GAME_API}/sys/logout`,
  Register: `${HASH_GAME_API}/auth/register`,
  SendSms: `${HASH_GAME_API}/account/sms`,
  // get my info
  UserInfo: `${HASH_GAME_API}/sys/user/getUserInfo`,
  // get account info
  getAccount: `${HASH_GAME_API}/game/getAccount`,
  // get bag info
  queryBaglist: `${HASH_GAME_API}/wolftown/queryBaglist`,
  // get Lottery info
  queryWolfLotteryGoodsList: `${HASH_GAME_API}/wolftown/queryWolfLotteryGoodsList`,

  // get Lottery info
  queryBagByName: `${HASH_GAME_API}/wolftown/queryBagByName`,
  // get Lottery info
  queryBagByType: `${HASH_GAME_API}/wolftown/queryBagByType`,
  // doLottery
  doLottery: `${HASH_GAME_API}/wolftown/doLottery`,
  // get address info
  getAddressInfo: `${HASH_GAME_API}/game/getUserAddress`,

  /*获取最近一期中奖数据 */
  getLastPrizeNumer: `${HASH_GAME_API}/game/getLastPrizeNumer`,
  /*获取用户订单数据*/
  getUserBetOrder: `${HASH_GAME_API}/game/getUserBetOrder`,
  /*获取一元购期数数据*/
  getOneUsdtNumer: `${HASH_GAME_API}/game/getOneUsdtNumer`,
  /*获取历史订单数据 */
  getUserBetOrderHistory: `${HASH_GAME_API}/game/getUserBetOrderHistory`,
  /*用户提现 */
  userWithdrawal: `${HASH_GAME_API}/game/userWithdrawal`,
  /*商品合成 */
  synthesis: `${HASH_GAME_API}/wolftown/synthesis`,
  /*商品兑奖 */
  reward: `${HASH_GAME_API}/wolftown/reward`,
  /*上链记录查询 */
  getWolfUserGoodsToChainList: `${HASH_GAME_API}/wolftown/getWolfUserGoodsToChainList`,
  /*放置土地*/
  putLand: `${HASH_GAME_API}/wolftown/putLand`,
  /*释放土地*/
  reapingLand: `${HASH_GAME_API}/wolftown/reapingLand`,

  /*土地列表信息*/
  getLandGameList: `${HASH_GAME_API}/wolftown/getLandGameList`,


  /*放置战斗动物*/
  putArena: `${HASH_GAME_API}/wolftown/putArena`,

  /*查询战斗物品信息*/
  getWolfArenaGameList: `${HASH_GAME_API}/wolftown/getWolfArenaGameList`,

  /*空投数据*/
  airdrop: `${HASH_GAME_API}/wolftown/airdrop`,

  /*市场表-分页列表查询*/
  marketList: `${HASH_GAME_API}/wolftown/marketList`,

  /*市场-上架*/
  marketAdd: `${HASH_GAME_API}/wolftown/marketAdd`,

  /*市场-出价*/
  marketBuy: `${HASH_GAME_API}/wolftown/marketBuy`,
  /*PVP战斗*/
  pvp: `${HASH_GAME_API}/wolftown/pvp`,
  /*战斗记录-分页列表查询*/
  pvpList: `${HASH_GAME_API}/wolftown/pvpList`,

}


/** 登录方法 */
export const Login = async () => {
  let XAccessToken = localStorage.getItem('XAccessToken');
  const login = localStorage.getItem('LoginUser');

  if (!login) return
  // eslint-disable-next-line no-eval
  const loginUser = eval(JSON.parse(login));
  if (loginUser == null || loginUser === "") {
    return;
  }

  /*   console.log("XAccessToken", XAccessToken, "LoginUser.uid", loginUser.uid, typeof XAccessToken); */
  if ((XAccessToken == null || XAccessToken === "" || XAccessToken === 'undefined') && loginUser.uid !== "") {

    console.log("loginstart");

    // XAccessToken = "1";

    const response = await fetch(API_CONFIG.Login, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginUser.email,
        password: loginUser.uid
      }),
    })
    if (response.status === 404) {
      loginOut();
    }

    if (response.status === 200) {
      const result = await response.json();


      if (!result.success) {
        loginOut();
      } else {

        // 设置token
        localStorage.setItem('XAccessToken', result.result.token);

        localStorage.setItem('userInfo_userid', result.result.userInfo.id);

        console.log("responseresponse", result);
        console.log("responseresponse3", result.result.userInfo);
      }
    }
  }
}

/* 获取个人信息 */
// eslint-disable-next-line consistent-return
export const getUsertInfo = async () => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessToken", XAccessToken, "LoginUser.uid", LoginUser.uid); */
  if ((XAccessToken) && LoginUser.uid !== "") {
    const response = await fetch(`${API_CONFIG.UserInfo}?token=${XAccessToken}`, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
      }
    })

    console.log("response-getUsertInfo", response);
    if (response.status === 401) {
      /* loginOut(); */
    }

    if (response.status === 200) {
      const result = await response.json();
      const { userInfo } = result;

      // eslint-disable-next-line no-empty
      if (!result.success) {

      } else {
        // 设置token

        return userInfo;
      }


    }
  }

}



/* 获取余额信息 */
export const getAccountInfo = async () => {

  const acountInfo = {
    BUSD: '0',
    WTWOOL: '0',
    WTMILK: '0',
    integral: '0'
  }

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken) && uid !== "") {
    const response = await fetch(API_CONFIG.getAccount, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        uid,
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 设置token
        const accountList = result.result.accountlist;
        console.log("response-accountList", accountList);

        if (accountList.length > 0) {
          for (let i = 0; i < accountList.length; i++) {
            const account = accountList[i];
            if (account.coin != null && account.coin === "BUSD") {
              acountInfo.BUSD = account.normalBalance.toString();
            }
            if (account.coin != null && account.coin === "WTWOOL") {
              acountInfo.WTWOOL = account.normalBalance.toString();
            }
            if (account.coin != null && account.coin === "WTMILK") {
              acountInfo.WTMILK = account.normalBalance.toString();
            }
            if (account.coin != null && account.coin === "integral") {
              acountInfo.integral = account.normalBalance.toString();
            }
          }
        }
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

  return acountInfo;
}




/* 获取用户背包数据信息 */
export const queryBaglist = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.queryBaglist, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 设置token
        const wolfUserGoodsList = result.result.wolfUserGoodsList;

        //兑换/可兑奖配置
        const goodsSynthesisConfigureList = result.result.goodsSynthesisConfigureList;
        console.log("response-accountList", wolfUserGoodsList);
        return wolfUserGoodsList;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}


/* 用户背包物品-根据名称查询 */
export const queryBagByName = async (goodsName: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  console.log("response-wolfUserGoods-XAccessToken", XAccessToken);
  if ((XAccessToken)) {
    const response = await fetch(`${API_CONFIG.queryBagByName}?token=${XAccessToken}&goodsName=${goodsName}`, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }
    })

    console.log("result-response", response);
    if (response.status === 200) {
      const result = await response.json();

      if (result.success) {
        // 设置token 
        const wolfUserGoods = result.result.wolfUserGoods;
        console.log("response-wolfUserGoods", wolfUserGoods);
        return wolfUserGoods;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}


/* 用户背包物品-根据类型查询 */
export const queryBagByType = async (goodsType: string, goodsName: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  console.log("response-wolfUserGoods-XAccessToken", XAccessToken);
  if ((XAccessToken)) {
    const response = await fetch(`${API_CONFIG.queryBagByType}?token=${XAccessToken}&goodsType=${goodsType}&goodsName=${goodsName}`, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }
    })

    console.log("result-response", response);
    if (response.status === 200) {
      const result = await response.json();

      if (result.success) {
        // 设置token 
        const wolfUserGoods = result.result.wolfUserGoods;
        console.log("response-wolfUserGoods", wolfUserGoods);
        return wolfUserGoods;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}




/* 获取抽奖数据列表 */
export const queryWolfLotteryGoodsList = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.queryWolfLotteryGoodsList, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 设置token
        //返回数据参照  WolfUserGoods.ts
        const wolfLotteryGoodsList = result.result.wolfLotteryGoodsList;
        console.log("response-accountList", wolfLotteryGoodsList);
        return wolfLotteryGoodsList;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}




/* 获取用户兑换上链历史记录 */
export const getWolfUserGoodsToChainList = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.getWolfUserGoodsToChainList, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        const wolfUserGoodsToChainList = result.result.wolfUserGoodsToChainList;
        console.log("response-wolfUserGoodsToChainList", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 商品兑奖上链 */
export const reward = async (goodsName: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.reward, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "goodsName": goodsName,
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 抽奖结果数据
        const wolfUserGoodsToChain = result.result.wolfUserGoodsToChain;
        console.log("response-wolfUserGoodsToChain", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 合成物品 */
export const synthesis = async (goodsName: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.synthesis, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "goodsName": goodsName,
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 抽奖结果数据
        const wolfUserGoodsResult = result.result.wolfUserGoodsResult;
        console.log("response-wolfUserGoodsResult", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}





/* 抽奖 */
export const doLottery = async (times: number) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.doLottery, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "times": times,
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 抽奖结果数据
        const wolfLotteryGoodsResultList = result.result.wolfLotteryGoodsResultList;
        console.log("response-wolfLotteryGoodsResultList", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}




/* 放置土地 */
export const putLand = async (landName: string, animals: string, shit: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.putLand, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "landName": landName,
        "animals": animals,
        "shit": shit
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 放置结果数据 
        console.log("response-wolfUserGoodsResult", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}




/* 释放土地 */
export const reapingLand = async (landId: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.reapingLand, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "landId": landId,
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 放置结果数据 
        console.log("response-wolfUserGoodsResult", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 获取用户土地放置记录 */
export const getLandGameList = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.getLandGameList, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        const landGameList = result.result.landGameList;
        console.log("response-landGameList", landGameList);
        return landGameList;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 放置战斗动物 */
export const putArena = async (animalName: string, weapons: string, position: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.putArena, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "animalName": animalName,
        "weapons": weapons,
        "position": position
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 放置结果数据 
        console.log("response-putArena", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}


/* 获取用户战斗动物放置记录 */
export const getWolfArenaGameList = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.getWolfArenaGameList, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        const wolfArenaGameList = result.result.wolfArenaGameList;
        console.log("response-wolfArenaGameList", wolfArenaGameList);
        return wolfArenaGameList;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}


/* 获取市场列表 */
export const marketList = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.marketList;
    if (params) {
      let paramsArray: any[] = [];
      //拼接参数

      Object.keys(params).forEach(key => paramsArray.push(key + '=' + (typeof params[key] == 'undefined' ? "" : params[key])))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }

    url += '&pageNo=' + pageNo
    url += '&pageSize=' + pageSize
    const response = await fetch(url, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        console.log("response-marketList", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}




/* 获取市场列表 */
export const pvpList = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.pvpList;
    if (params) {
      let paramsArray: any[] = [];
      //拼接参数

      Object.keys(params).forEach(key => paramsArray.push(key + '=' + (typeof params[key] == 'undefined' ? "" : params[key])))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }

    url += '&pageNo=' + pageNo
    url += '&pageSize=' + pageSize
    const response = await fetch(url, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        console.log("response-marketList", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}






/* 领取空投 */
export const airDrop = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.airdrop, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 放置结果数据 
        console.log("response-airDrop", result);
        return result;
      } else {
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}





/* 配置数据 end */

import wTCheckWebFreeAbi from "assets/abi/WTCheckWebFree.json";
import WTAnimalAbi from "assets/abi/wtAnimal.json";
export const Constants = {
  ArenaHistoryBlock: (24 * 60 * 60 * 30) / 3,
  DEBUG_ADDRESS,
  IsDevelopment,
  DEFAULT_SEED: '0x0000000000000000000000000000000000000000000000000000000000000000',
  /**
   * 每个邀请最多可持续的时间 (hours)
   */
  INVITATION_DURATION: 72,
  IsTest,
  BASE_URL: 'https://app.wolftown.world/animals',
  BASE_IMAGE_URL: 'https://app.wolftown.world/images/animals',
  API_SERVE: 'https://app.wolftown.world',
  OPENSEA_URL: 'https://opensea.io',
  Chain: {
    ID: '56',
    PRC: 'https://bsc-dataseed.binance.org/',
    Name: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    ScanView: 'https://bscscan.com',
    AddressView: 'https://bscscan.com/address',
    TxView: 'https://bscscan.com/tx',
  },

  emergencyWolfLeave: false,

  Building: {
    OwnershipTotal: 10000000,
  },
  Contract: {

    WTCheckWebFree: '0x392C6A657F0233a4cBe0897bbd74a597B4530C43',
    WTAnimal: '0x14f112d437271e01664bb3680BcbAe2f6A3Fb5fB',
  },
};
export const AbiConfig: Record<keyof typeof Constants.Contract, any> = {

  WTCheckWebFree: wTCheckWebFreeAbi,
  WTAnimal: WTAnimalAbi
};
if (!IsDevelopment) {
  console.log = () => null;
  console.error = () => null;
  console.info = () => null;
}

