import { ethers } from 'ethers';
import { API_CONFIG, loginOut } from './WolfConfig';
import { BetOrder } from './modules/BetOrder';
import { Withdraw } from './modules/Withdraw';




/* 获取地址信息 */
export const getUserAddress = async (): Promise<string> => {

  let addressInfo = '';

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');
  /*   console.log("XAccessTokenuiduid",XAccessToken,"uid",uid); */

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    const response = await fetch(API_CONFIG.getAddressInfo, {
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
        const addresslist = result.result.userDepositAddresslist;
        console.log("response-addresslist", addresslist);

        if (addresslist.length > 0) {
          for (let i = 0; i < addresslist.length; i++) {
            const addressin = addresslist[i];
            addressInfo = addressin.address;
          }
        }
      }
    }
  }
 
  return addressInfo;
}



/* 提交订单 */
export const submitOrder = async (betorder: BetOrder) => {
  console.log("betorder", JSON.stringify({
    betorder
  }));

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象


    const response = await fetch(API_CONFIG.betOrder_add, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(betorder),
    })


    if (response.status === 200) {
      const result = await response.json();

      if (result.success) {
        return { status: 200 }
      }
      return { status: 500, message: result.message.replace("操作失败，") }

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




/* 获取最近一期中奖数据 */
export const getLastPrizeNumer = async (playTpye: string) => {
  console.log("response-playTpye", playTpye);

  // eslint-disable-next-line eqeqeq

  const response = await fetch(API_CONFIG.getLastPrizeNumer, {
    method: 'post', headers: {
      'X-Access-Token': '1',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({
      playType: playTpye
    }),
  })

  if (response.status === 200) {
    const result = await response.json();
    if (result.success) {
      // 设置token
      const hashNumber = result.result.hashNumber;
      console.log("response-getLastPrizeNumer", result);
      return hashNumber;

    }
  }
}




/* 获取一元购期数数据 */
export const getOneUsdtNumer = async (playTpye: string) => {
  console.log("response-playTpye", playTpye);

  // eslint-disable-next-line eqeqeq

  const response = await fetch(API_CONFIG.getOneUsdtNumer, {
    method: 'post', headers: {
      'X-Access-Token': '1',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({
      playType: playTpye
    }),
  })

  if (response.status === 200) {
    const result = await response.json();
    if (result.success) {
      // 设置token
      const hashDate = result.result;

      return hashDate;

    }
  }
}


/*根据期号 获取投注订单数据 */
export const getUserBetOrder = async (playTpye: string, betNumer: string) => {
  console.log("response-playTpye", playTpye, " betNumer", betNumer);
  if (betNumer === "") {
    return;
  }

  // eslint-disable-next-line eqeqeq
  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    const response = await fetch(API_CONFIG.getUserBetOrder, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        playType: playTpye,
        bettingName: betNumer
      }),
    })

    console.log("response-getUserBetOrderresponse", response);
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 设置token
        const betOrderList = result.result.betOrderList;
        console.log("response-getUserBetOrder", betOrderList);
        return betOrderList;
      }
    }
  }
}


/*根据期号 获取历史订单数据 */
export const getUserBetOrderHistory = async (playTpye: string) => {



  // eslint-disable-next-line eqeqeq
  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    const response = await fetch(API_CONFIG.getUserBetOrderHistory, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        playType: playTpye
      }),
    })

    console.log("response-getUserBetOrderHistory", response);
    if (response.status === 200) {
      const result = await response.json();
      if (result.success) {
        // 设置token
        const resultList = result.result;
        console.log("response-getUserBetOrderHistory", resultList);
        return resultList;
      }
    }
  }

}





/* 提交提现订单 */
export const submitWithdraw = async (withdraw: Withdraw) => {
  console.log("withdraw", JSON.stringify({
    withdraw
  }));

  const XAccessToken = localStorage.getItem('XAccessToken');
  const uid = localStorage.getItem('userInfo_userid');

  // eslint-disable-next-line eqeqeq
  if (XAccessToken && (XAccessToken != "") && uid != "") {
    // 组装数据对象


    const response = await fetch(API_CONFIG.userWithdrawal, {
      method: 'post', headers: {
        'X-Access-Token': XAccessToken,
        'token': XAccessToken,
        'Content-Type': 'application/json',
      }, body: JSON.stringify(withdraw),
    })


    if (response.status === 200) {
      const result = await response.json();

      if (result.success) {
        return { status: 200 }
      }
      return { status: 500, message: result.message.replace("操作失败，") }

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
