import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/esm/Modal";
import React, { useState, useEffect } from "react";
import { firebaseConfig } from "./WolfConfig";

/* // Initialize Firebase
firebase.initializeApp(firebaseConfig); */

const LoginFast = () => {
  const { t } = useTranslation();

  useEffect(() => {
    async function firebase_() {
      let ui = null;
      const firebaseui = await import("firebaseui");
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      } else {
        firebase.app(); // 如果已经初始化，使用那个
        ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebase.auth());
      }
      const uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl: location.href, // 此 URL 用于在我们获得电话认证成功响应时返回该页面。
        signInOptions: [
          { provider: firebase.auth.EmailAuthProvider.PROVIDER_ID },
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          /*    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID, */
          firebase.auth.GithubAuthProvider.PROVIDER_ID /* ,
          firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID  */ /* ,
          "yahoo.com",
          "microsoft.com", */,
        ],
        tosUrl: location.href,
      };
      ui.start("#firebaseui-auth-container", uiConfig);
    }
    firebase_();
  }, []);

  /*  var uiConfig = {
     signInSuccessUrl: 'http://localhost:8080/jeecg-boot/sys/login',
     signInOptions: [
       // Leave the lines as is for the providers you want to offer your users.
       
       firebase.auth.PhoneAuthProvider.PROVIDER_ID,
       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
       firebase.auth.TwitterAuthProvider.PROVIDER_ID,
       firebase.auth.GithubAuthProvider.PROVIDER_ID,
       firebase.auth.EmailAuthProvider.PROVIDER_ID,
       firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
     ],
     // tosUrl and privacyPolicyUrl accept either url string or a callback
     // function.
     // Terms of service url/callback.
     tosUrl: 'http://localhost:8080/jeecg-boot/sys/login',
     // Privacy policy url/callback.
     privacyPolicyUrl: function () {
       window.location.assign('http://localhost:8080/jeecg-boot/sys/login');
     }
   };
 
   // Initialize the FirebaseUI Widget using Firebase.
   var ui = new firebaseui.auth.AuthUI(firebase.auth());
   console.log("window.location", window.location);
   // The start method will wait until the DOM is loaded.
   ui.start('#firebaseui-auth-container', uiConfig); */

  return <Modal style={{}}></Modal>;
};

export default LoginFast;
