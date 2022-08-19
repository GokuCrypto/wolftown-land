/* eslint-disable global-require */
import firebase from 'firebase/compat/app';
import { _getAddress, _getProvider } from './ethereum';
import { useEffect } from 'react';


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
  try{
    firebase.auth().signOut();  
  } catch(e) {
    console.log('err', e)
  }
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
  if (login) {
    return JSON.parse(login).uid !== ''
  } else {
    return false
  }
}

export const HASH_GAME_API = "https://api.wolftown.games/jeecg-boot";

/* export const HASH_GAME_API = "http://154.209.5.151:8080/jeecg-boot/"; */

/* 配置数据 */
export const API_CONFIG = {
  Login: `${HASH_GAME_API}/sys/login`,
  Logout: `${HASH_GAME_API}/sys/logout`,
  ForgePassword: `${HASH_GAME_API}/auth/forge-password`,
  Register: `${HASH_GAME_API}/auth/register`,
  SendSms: `${HASH_GAME_API}/account/sms`,
  // get my info
  UserInfo: `${HASH_GAME_API}/sys/user/getUserInfo`,
  // get account info
  getAccount: `${HASH_GAME_API}/game/getAccount`,
  // get address info
  getAddressInfo: `${HASH_GAME_API}/game/getUserAddress`,
  // order
  betOrder_add: `${HASH_GAME_API}/hash/betOrder/add`,
  betOrder_list: `${HASH_GAME_API}/hash/betOrder/list`,
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

}


/** 登录方法 */
export const Login = async () => {
  let XAccessToken = localStorage.getItem('XAccessToken');
  const login = localStorage.getItem('LoginUser');

  console.log("x=", login)

  if (!login) return
  // eslint-disable-next-line no-eval
  const loginUser = eval(JSON.parse(login));
  if (loginUser == null || loginUser === "") {
    return;
  }

  console.log('XAccessToken====', XAccessToken)
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
    BUSD: 0,
    WTWOOL: 0,
    WTMILK: 0
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
              acountInfo.BUSD = account.normalBalance;
            }
            if (account.coin != null && account.coin === "WTWOOL") {
              acountInfo.WTWOOL = account.normalBalance;
            }
            if (account.coin != null && account.coin === "WTMILK") {
              acountInfo.WTMILK = account.normalBalance;
            }
          }
        }
      }
    }
  }

  return acountInfo;

}








/* 配置数据 end */


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
    /*  BankAddress: '0x1f0c693F5cD661126e43b25a96FA703a0C8F2543',
     WTWool: '0xAA15535fd352F60B937B4e59D8a2D52110A419dD',
     WTMilk: '0x60Ca032Ba8057FedB98F6A5D9ba0242AD2182177',
     Random: '0xb82Df0E936Be460C20246Dd81B0ad0476808e5e0',
     WTAnimal: '0x14f112d437271e01664bb3680BcbAe2f6A3Fb5fB',
     OldWTAnimal: '0xE686133662190070c4A4Bea477fCF48dF35F5b2c',
     Barn: '0x10A6DC9fb8F8794d1Dc7D16B035c40923B148AA4',
     OldBarn: '0x58eaBB38cc9D68bEA8E645B0f5Ec741C82f2871B',
     OldBarnBUG: '0x386500b851CA1aF027247fa8Ab3A9dDd40753813',
     V1AnimalTransfer: '0xCe487D0Ab195D28FE18D5279B042498f84eb051F',
     WoolfTownAPI: '0x301216c75E8af09a3785c9fE7077c543eBB77B6F',
     SkillManager: '0xAef63919ac27d048d9e0c31da474AD0FEedB141a',
     BuildingGameManager: '0xbA58c345cA328F8bfA6A5607a15C2128CC6fBE61',
     WTOwnershipDeed: '0xb61afda2288C4E8AC896B6d4E78BC0ca0C5D98DC',
     WTOwnershipDeedURI: '0x71C0d09D512Fd51BCC96d3ee380a51448635d7DA',
     ForestExploration: '0x6fbaAAF642D9d4A9fC0d2270035D91e100B4B3bC',
     Fight: '0x9851E7eFc67F48E52E98454149793B4eA219F1c5',
     Arena: '0x5f189c322d829aD8F3901A17c54DcC893345d8eB',
     BuildingStakeManager: '0x7c176E44B6e925E8b5F0Fafc7b2Ec2876A6fE8aD',
     WT_LP_USDT: '0xcAad85D48f31177040E25048FF4dd875eAE9Dea7',
     WT_LP_BNB: '0xe9C7bc98901d1B71d63902602Bff6E37dCdE79fC',
     USDT: '0x55d398326f99059fF775485246999027B3197955', */
  },
};
export const AbiConfig: Record<keyof typeof Constants.Contract, any> = {
  /* BankAddress: require('config/abi/wtWool'),
  WTWool: require('config/abi/wtWool'),
  WTMilk: require('config/abi/wtWool'),
  Random: require('config/abi/wtWool'),
  WTAnimal: require('config/abi/wtAnimal.json'),
  OldWTAnimal: require('config/abi/wtAnimal.json'),
  Barn: require('config/abi/wtBarn.json'),
  OldBarn: require('config/abi/wtBarn.json'),
  OldBarnBUG: require('config/abi/wtBarn.json'),
  V1AnimalTransfer: require('config/abi/V1AnimalTransfer.json'),
  WoolfTownAPI: require('config/abi/WoolfTownAPI.json'),
  SkillManager: require('config/abi/SkillManager.json'),
  BuildingGameManager: require('config/abi/BuildingGameManager.json'),
  WTOwnershipDeed: require('config/abi/WTOwnershipDeed.json'),
  WTOwnershipDeedURI: require('config/abi/WTOwnershipDeed.json'),
  ForestExploration: require('config/abi/ForestExploration.json'),
  Arena: require('config/abi/Arena.json'),
  Fight: require('config/abi/Fight.json'),
  BuildingStakeManager: require('config/abi/BuildingStakeManager.json'),
  WT_LP_USDT: require('config/abi/lp.json'),
  WT_LP_BNB: require('config/abi/lp.json'),
  USDT: require('config/abi/wtWool'), */
};
if (!IsDevelopment) {
  console.log = () => null;
  console.error = () => null;
  console.info = () => null;
}
if (IsTest) {
  Object.assign(Constants, {
    BASE_URL: 'https://app.test.wolftown.world/animals',
    BASE_IMAGE_URL: 'https://app.test.wolftown.world/images/animals',
    API_SERVE: 'https://app.test.wolftown.world',
    Chain: {
      ID: '97',
      PRC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      Name: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'tBNB',
        symbol: 'tBNB',
        decimals: 18,
      },
      ScanView: 'https://testnet.bscscan.com',
      AddressView: 'https://testnet.bscscan.com/address',
      TxView: 'https://testnet.bscscan.com/tx',
    },
    Contract: {
      // api

    },
  });
}
