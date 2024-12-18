/* eslint-disable global-require */
import firebase from 'firebase/compat/app';
import { _getAddress, _getProvider } from './ethereum';
import { useEffect } from 'react';
import { ERRORS } from "lib/errors";
import { WolfMarket } from './modules/WolfMarket';
import { Build } from './modules/Build';
import { BuybackOrder } from './modules/BuybackOrder';



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



export const HASH_GAME_API = "https://mainapi.wolftown.games/jeecg-boot";

/* export const HASH_GAME_API = "http://localhost:8080/jeecg-boot/"; */
/* test */
//  export const HASH_GAME_API = "https://devapi.wolftown.games/jeecg-boot";
/* export const HASH_GAME_API = "http://localhost:8080/jeecg-boot/"; */
export const SOCKT_API = "ws://localhost:8080/jeecg-boot/";

/* test */

export const APP_WOLF_API = "https://app.wolftown.games/images/wtanimalsSmall/";
// export const APP_WOLF_API = "http://wolfadmin.wolftown.games/isystem/user";

/* 配置数据 */
export const API_CONFIG = {
  Login: `${HASH_GAME_API}/sys/login`,
  Logout: `${HASH_GAME_API}/sys/logout`,
  Register: `${HASH_GAME_API}/auth/register`,
  SendSms: `${HASH_GAME_API}/account/sms`,
  // get my info
  UserInfo: `${HASH_GAME_API}/wolftown/getUserInfo`,
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
  /*需要修复武器查询 */
  getFiveLevelWeapons: `${HASH_GAME_API}/wolftown/getFiveLevelWeapons`,
  /*修复五级武器 */
  repairWeapons: `${HASH_GAME_API}/wolftown/repairWeapons`,
  /*放置土地*/
  putLand: `${HASH_GAME_API}/wolftown/putLand`,
  /*自动放置土地*/
  autoPutLand: `${HASH_GAME_API}/wolftown/autoPutLand`,
  /*取消自动放置土地*/
  cancelAutoPutLand: `${HASH_GAME_API}/wolftown/cancelAutoPutLand`,
  /*释放土地*/
  reapingLand: `${HASH_GAME_API}/wolftown/reapingLand`,

  /*土地列表信息*/
  getLandGameList: `${HASH_GAME_API}/wolftown/getLandGameList`,
  /*获取土地扩充数量*/
  getExpandNumber: `${HASH_GAME_API}/wolftown/getExpandNumber`,
  /*解除pvp冷却时间*/
  handleClearCoolingTime: `${HASH_GAME_API}/wolftown/handleClearCoolingTime`,
  /*解锁土地 */
  unlockLand: `${HASH_GAME_API}/wolftown/unlockLand`,
  /*放置战斗动物*/
  putArena: `${HASH_GAME_API}/wolftown/putArena`,
  /*自动攻城*/
  autoArena: `${HASH_GAME_API}/wolftown/autoArena`,
  /*取消自动攻城*/
  cancelAutoArena: `${HASH_GAME_API}/wolftown/cancelAutoArena`,
  /*查询战斗物品信息*/
  getWolfArenaGameList: `${HASH_GAME_API}/wolftown/getWolfArenaGameList`,

  /*空投数据*/
  airdrop: `${HASH_GAME_API}/wolftown/airdrop`,

  /*市场表-分页列表查询*/
  marketList: `${HASH_GAME_API}/wolftown/marketList`,

  /*市场-上架*/
  marketAdd: `${HASH_GAME_API}/wolftown/marketAdd`,
  /*使用月/周卡*/
  useGroundhog: `${HASH_GAME_API}/wolftown/useGroundhog`,

  /*市场-出价*/
  marketBuy: `${HASH_GAME_API}/wolftown/marketBuy`,
  /*PVP战斗*/
  pvp: `${HASH_GAME_API}/wolftown/pvp`,
  /*拯救动物*/
  saveAnimals: `${HASH_GAME_API}/wolftown/saveAnimals`,
  /*战斗记录-分页列表查询*/
  pvpList: `${HASH_GAME_API}/wolftown/pvpList`,

  /*建筑任务-分页列表查询*/
  buildList: `${HASH_GAME_API}/wolftown/buildList`,
  /*build游戏*/
  build: `${HASH_GAME_API}/wolftown/build`,
  /*批量股权任务*/
  buildBatch: `${HASH_GAME_API}/wolftown/buildBatch`,
  /*build任务*/
  buildItemList: `${HASH_GAME_API}/wolftown/buildItemList`,
  /**股权分红 */
  dividends: `${HASH_GAME_API}/wolftown/dividends`,
  transactionFlowList: `${HASH_GAME_API}/wolftown/transactionFlowList`,

  /*市场-个人挂售表*/
  myList: `${HASH_GAME_API}/wolftown/myList`,
  /*市场-个人挂售表*/
  wolfTownStoreList: `${HASH_GAME_API}/wolftown/wolfTownStoreList`,

  /*市场-下架*/
  marketRemove: `${HASH_GAME_API}/wolftown/marketRemove`,
  /*市场-商店*/
  storeBuy: `${HASH_GAME_API}/wolftown/storeBuy`,

  /*nft上链 */
  nftWithdraw: `${HASH_GAME_API}/wolftown/nftWithdraw`,
  /*bft上链记录查询 */
  getNftToChainList: `${HASH_GAME_API}/wolftown/getNftToChainList`,

  /*buyback 回购 */
  buyback: `${HASH_GAME_API}/wolftown/buyback`,
  /*buybackConfig */
  buybackConfig: `${HASH_GAME_API}/wolftown/buybackConfig`,
  /*土拨鼠功能 */

  saveGroundhog: `${HASH_GAME_API}/wolftown/saveGroundhog`,
  queryGroundhog: `${HASH_GAME_API}/wolftown/queryGroundhog`,
  queryGroundhogLog: `${HASH_GAME_API}/wolftown/queryGroundhogLog`,
  queryInviteLink: `${HASH_GAME_API}/wolftown/queryInviteLink`,
  checkWolfInvite: `${HASH_GAME_API}/wolftown/checkWolfInvite`,

  //socketTest 

  socketTest: `${HASH_GAME_API}/wolftown/test`,
  /*设置冒险队伍*/
  adventureTeam: `${HASH_GAME_API}/wolftown/adventureTeam`,
  /*建造城堡*/
  buildCastle: `${HASH_GAME_API}/wolftown/buildCastle`




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
    integral: '0',
    Build: '0',
    Invite: "0"
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
            if (account.coin != null && account.coin === "Build") {
              acountInfo.Build = account.normalBalance.toString();
            }
            if (account.coin != null && account.coin === "Invite") {
              acountInfo.Invite = account.normalBalance.toString();
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
        return result;
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
/* 获取用户需要修复五级武器件数 */
export const getFiveLevelWeapons = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.getFiveLevelWeapons, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        const wolfUserGoodsToChainList = result.result;
        console.log("response-getFiveLevelWeaponsgetFiveLevelWeaponsgetFiveLevelWeaponsgetFiveLevelWeapons", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 获取用户兑换上链历史记录 */
export const getNftToChainList = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.getNftToChainList, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {

        const getNftToChainList = result.result.getNftToChainList;
        console.log("response-getNftToChainList", result);
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
/* 合成物品 */
export const repairWeapons = async (goodsName: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.repairWeapons, {
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

/* 自动放置土地 */
export const autoPutLand = async (landName: string, animals: string, shit: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */


  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.autoPutLand, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "landName": landName,
        "animals": animals,
        "shit": shit,
      }),

    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
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



/* 取消自动放置土地 */
export const cancelAutoPutLand = async (landName: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.cancelAutoPutLand, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "landName": landName,
      }),

    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
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
        console.log("response-wolfUserGoodsResult", result.result.wolfLandGoodsResultList);
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
export const getLandGameList = async (startIndex = 0, endIndex = 6) => {

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
/* 获取用户扩充土地的数量*/
export const getExpandNumber = async () => {
  const XAccessToken = localStorage.getItem('XAccessToken');

  if ((XAccessToken)) {
    const response = await fetch(`${API_CONFIG.getExpandNumber}`, {
      method: 'GET',
      headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json;charset=UTF-8',
      }
    });
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        console.log("response-getExpandNumber", result);
        return result?.result || 0;
      }
    } else if (response.status === 401) {
      await loginOut();
      throw new Error(ERRORS.SESSION_EXPIRED);
    }
  }
};



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
/* 自动攻城 */
export const autoArena = async (animalName: string, weapons: string, position: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.autoArena, {
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
        console.log("response-autoArena", result);
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

/* 取消自动攻城 */
export const cancelAutoArena = async (position: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.cancelAutoArena, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "position": position,
      }),

    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
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
export const marketList = async (params: any, pageNo: string, pageSize: string, desc: string) => {

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
    url += '&desc=' + encodeURIComponent(desc);
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




/* 获取对战列表 */
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





/* 获取市场列表 */
export const buildList = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.buildList;
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





/* 股权建设 */
export const build = async (build: BuildItem) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象

    const response = await fetch(API_CONFIG.build, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(build),
    })


    if (response.status === 200) {
      const result = await response.json();
      return result;
    }

    if (response.status === 401) {
      // 登录超时处理办法
      loginOut();
      return { status: 500, message: " Token is invalid, please login again !" }
    }

    return { status: 500, message: "NO Connect!" }
  }
  return { status: 500, message: "NO Login!" }

}
/* 股权批量建设 */
export const buildBatch = async (buildBatch: BuildItem, amounts: number) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象

    const response = await fetch(API_CONFIG.buildBatch, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ wolfBuildItem: buildBatch, amounts: amounts }),
    })

    if (response.status === 200) {
      const result = await response.json();
      return result;
    }

    if (response.status === 401) {
      // 登录超时处理办法
      loginOut();
      return { status: 500, message: " Token is invalid, please login again !" }
    }

    return { status: 500, message: "NO Connect!" }
  }
  return { status: 500, message: "NO Login!" }

}

/* 获取股权建设任务列表 */
export const buildItemList = async (params: any, goodsType: string, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.buildItemList;
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

        console.log("response-buildItem", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}

/* 股权分红 */
export const dividends = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.dividends, {
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
        console.log("response-dividends", result);
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

/* 拯救动物 */
export const saveAnimals = async (pvpAnimals: any[]) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.saveAnimals, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(pvpAnimals),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 放置结果数据
        console.log("response-dividends", result);
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

/* NFT查询 */
export const nftWithdraw = async (goodsId: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象

    const response = await fetch(API_CONFIG.nftWithdraw, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "goodsId": goodsId,
      }),
    })


    if (response.status === 200) {
      const result = await response.json();
      return result;
    }

    if (response.status === 401) {
      // 登录超时处理办法
      loginOut();
      return { status: 500, message: " Token is invalid, please login again !" }
    }

    return { status: 500, message: "NO Connect!" }
  }
  return { status: 500, message: "NO Login!" }

}
/*buybackConfig回购配置查询 */
export const buybackConfig = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象

    const response = await fetch(API_CONFIG.buybackConfig, {
      method: 'get', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }
    })
    if (response.status === 200) {
      const result = await response.json();
      return result;
    }

    if (response.status === 401) {
      // 登录超时处理办法
      loginOut();
      return { status: 500, message: " Token is invalid, please login again !" }
    }

    return { status: 500, message: "NO Connect!" }
  }
  return { status: 500, message: "NO Login!" }

}




/* 回购 */
export const buyback = async (buybackOrder: BuybackOrder) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象

    const response = await fetch(API_CONFIG.buyback, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(buybackOrder),
    })


    if (response.status === 200) {
      const result = await response.json();
      return result;
    }

    if (response.status === 401) {
      // 登录超时处理办法
      loginOut();
      return { status: 500, message: " Token is invalid, please login again !" }
    }

    return { status: 500, message: "NO Connect!" }
  }
  return { status: 500, message: "NO Login!" }

}




/* socketTest */
export const socketTest = async () => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象

    const response = await fetch(API_CONFIG.socketTest, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({ userId: uid, message: "测试练级" })
    })


    if (response.status === 200) {
      const result = await response.json();
      return result;
    }

    if (response.status === 401) {
      // 登录超时处理办法
      loginOut();
      return { status: 500, message: " Token is invalid, please login again !" }
    }

    return { status: 500, message: "NO Connect!" }
  }
  return { status: 500, message: "NO Login!" }

}






/* 账户流水数据 */
export const transactionFlowList = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.transactionFlowList;
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
      if (result?.success) {

        console.log("response-transactionFlowList", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}
//建筑贡献表
export const totalContribute = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  if (XAccessToken) {
    let url = API_CONFIG.transactionFlowList;
    if (params) {
      let paramsArray: any[] = [];
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
      if (result?.success) {
        console.log("response-transactionFlowList", result);

        const columns = Object.keys(result.data[0]);
        const columnSums: { [key: string]: number } = {};
        columns.forEach((column) => {
          const sum = result.data.reduce((total: number, row: number) => {
            return total + (row[column] || 0);
          }, 0);
          columnSums[column] = sum;
        });
        return columnSums;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }
}


/* 获取市场贩卖商品列表 */
export const wolfTownStoreList = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.wolfTownStoreList;
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
/* 获取个人挂售列表 */
export const myList = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.myList;
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

        console.log("response-myList", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 获取个人土拨鼠配置 */
export const queryGroundhog = async () => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.queryGroundhog;



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

        console.log("response-queryGroundhog", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}




/* 获取个人邀请链接 */
export const queryInviteLink = async () => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.queryInviteLink;

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

        console.log("response-queryInviteLink", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 获取个人土拨鼠运行记录 */
export const queryGroundhogLog = async (params: any, pageNo: string, pageSize: string) => {
  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */
  if ((XAccessToken)) {

    let url = API_CONFIG.queryGroundhogLog;

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

        console.log("response-queryGroundhogLog", result);
        return result;
      }
    } else if (response.status === 401) {
      await loginOut()
      throw new Error(ERRORS.SESSION_EXPIRED)
    }
  }

}



/* 设置探险队伍 */
export const adventureTeam = async (animals: string) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.adventureTeam, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "animals": animals
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
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
/* 建造城堡 */
export const buildCastle = async (x: number, y: number) => {

  const XAccessToken = localStorage.getItem('XAccessToken');
  /*   console.log("XAccessTokenuiduid", XAccessToken, "uid", uid); */

  if ((XAccessToken)) {
    const response = await fetch(API_CONFIG.buildCastle, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        "x": x,
        "y": y
      }),
    })
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
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
import VaultAbi from "assets/abi/Vault.json";
import { BuildItem } from './modules/BuildItem';
import { WolfUserGoods } from './modules/WolfUserGoods';

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
    WTLand: '0x7A7E298FfeB8f316E39496592062619f9B83044E',
    Vault: '0x5EaE7A5c17080627c4F6596FFfc4e645A8136bf2',
    VaultAdmin: '0x9e6141724aaed30877a16882355080252013bbc6'

  },
};
export const AbiConfig: Record<keyof typeof Constants.Contract, any> = {

  WTCheckWebFree: wTCheckWebFreeAbi,
  WTAnimal: WTAnimalAbi,
  WTLand: WTAnimalAbi,
  Vault: VaultAbi,
  VaultAdmin: VaultAbi
};
if (!IsDevelopment) {
  console.log = () => null;
  console.error = () => null;
  console.info = () => null;
}




export const base36_to_num = (value: any) => {
  var str_to_num = {
    f: '0',
    m: '1',
    r: '2',
    c: '3',
    x: '4',
    e: '5',
    t: '6',
    j: '7',
    p: '8',
    a: '9',
    z: '10',
    h: '11',
    v: '12',
    l: '13',
    s: '14',
    d: '15',
    n: '16',
    w: '17',
    g: '18',
    y: '19',
    k: '20',
    b: '21',
    u: '22',
    o: '23',
    q: '0',
    i: '0',
  }

  var l = value.length

  var v = value.toString().toLowerCase()
  var ret = 0
  for (var i = l - 1; i >= 0; i--) {
    ret = Number(ret) * 24 + Number(str_to_num[v.slice(i, i + 1)])
  }
  return ret
}
export const num_to_base36 = (value: any) => {
  var num_to_str = {
    0: 'F',
    1: 'M',
    2: 'R',
    3: 'C',
    4: 'X',
    5: 'E',
    6: 'T',
    7: 'J',
    8: 'P',
    9: 'A',
    10: 'Z',
    11: 'H',
    12: 'V',
    13: 'L',
    14: 'S',
    15: 'D',
    16: 'N',
    17: 'W',
    18: 'G',
    19: 'Y',
    20: 'K',
    21: 'B',
    22: 'U',
    23: 'O',
    /*    0: 'Q',
       0: 'I', */
  }
  if (value == 0) return '$$'
  var ret = ''
  var v = value
  while (v > 0) {
    ret = ret + num_to_str[v % 24]
    v = Math.floor(v / 24)
  }
  v = 0
  while (ret.length < 4) {
    if (v === 0) ret = ret + 'F'
    else if (v === 1) ret = ret + 'Q'
    else if (v === 2) ret = ret + 'I'
    else if (v === 3) ret = ret + 'F'
    v++
  }

  return ret
}

