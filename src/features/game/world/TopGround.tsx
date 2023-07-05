import React, { useEffect, useRef } from "react";

import "react-tabs/style/react-tabs.css";

import { heartCheckFun, websock } from "hooks/Websocket";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import avatarImage from "public/images/Weekly Groundhog.png";
import backgroundImages from "public/images/world_top.png";
import { useTranslation } from "react-i18next";
import mapMovement from "../lib/mapMovement";

import styled from "styled-components";
const BottomDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 10;
  top: 0px;
  border-style: solid;
  border-width: 6px;
  border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat;
  image-rendering: pixelated;
  border-radius: 20px;
`;
const Avatarframe = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 2px solid black;
  border-radius: 50%;
  overflow: hidden;
  background-image: url("public/images/avatar_frame2.png");
  background-size: cover;
`;
export const TopGround: React.FC = () => {
  // catching and passing scroll container to keyboard listeners
  const container = useRef(null);
  // const { id } = useParams();
  const [scrollIntoView] = useScrollIntoView();
  const battlePower = 67437788; // 从后端获取的战斗力数据
  const { t } = useTranslation();
  const battlePowerString = battlePower.toString(); // 将战斗力数据转换为字符串
  const [isMobile] = useIsMobile();

  const numberImages = {
    "1": "public/images/power_1.png",
    "2": "public/images/power_2.png",
    "3": "public/images/power_3.png",
    "4": "public/images/power_4.png",
    "5": "public/images/power_5.png",
    "6": "public/images/power_6.png",
    "7": "public/images/power_7.png",
    "8": "public/images/power_8.png",
    "9": "public/images/power_9.png",
    "0": "public/images/power_0.png",
  };
  //显示特效字
  const replacedDigits = battlePowerString
    .split("") // 将字符串拆分为单个数字
    .map((digit, index) => (
      <img
        src={numberImages[digit]}
        style={{ filter: "drop-shadow(0px 0px 5px #fff)" }}
        alt={`Digit ${digit}`}
        key={index}
      />
    ));
  useEffect(() => {
    //加载socket
    scrollIntoView(Section.MyTown, "auto");
    websock();
    heartCheckFun();
  }, [scrollIntoView]);

  useEffect(() => {
    mapMovement.addListeners(container.current);
    return () => {
      mapMovement.removeListeners();
    };
  }, [container]);
  return (
    <BottomDiv
      className="bg-brown-600 shadow-lg"
      style={{
        backgroundImage: `url(${backgroundImages})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: isMobile ? "41px" : "60px",
        zIndex: 1,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Avatarframe>
          {/* <img src={logoImage} className="logo" alt="Logo" style={{ position: "absolute", top: 0, left: 0, width: "10%", height: "100%" }} /> */}
          <img
            src={avatarImage}
            className="avatar"
            alt="Avatar"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </Avatarframe>
        {/* <img src={avatarImage} className="avatar" alt="Avatar" style={{ position: "absolute", top: "50%", left: "5%", transform: "translate(-50%, -50%)"}} /> */}
        <div style={{ marginLeft: "auto", marginRight: "20px" }}>
          <div className=" cursor-pointer  flex items-center justify-center">
            {replacedDigits}
          </div>
        </div>
      </div>
    </BottomDiv>
  );
};
