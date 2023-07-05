import React, { useEffect, useRef } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import background from "assets/land/world02.jpeg";
import "react-tabs/style/react-tabs.css";

import { heartCheckFun, websock } from "hooks/Websocket";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { useTranslation } from "react-i18next";
import { GameProvider } from "./GameProvider";
import { GameWorld } from "./GameWorld";
import mapMovement from "./lib/mapMovement";
import { MyCastle } from "./MyCastle";
import { ToastProvider } from "./toast/ToastQueueProvider";
import { ButtomGround } from "./world/BottomGround";
import { TopGround } from "./world/TopGround";

export const WolfTownWorld: React.FC = () => {
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
      <img src={numberImages[digit]} alt={`Digit ${digit}`} key={index} />
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

  // Load data
  return (
    <GameProvider key="WolfTownWorld">
      <ToastProvider>
        <TopGround />
        <ButtomGround />
        <MyCastle />
        {/* overflow-scroll  */}
        <ScrollContainer
          className="bg-green-background overflow-scroll relative w-full h-full"
          innerRef={container}
          ignoreElements=".ignore-scroll"
        >
          <div
            className="relative h-gameboardWorld w-gameboardWorld "
            style={{ position: "relative" }}
            // TODO dynamic game board size based on tile dimensions
          >
            <img src={background} className="absolute inset-0 w-full  " />
            {/*<ExpansionInfo />*/}
            <GameWorld />
          </div>
          {/* <div className="bottom-bar" style={{ backgroundImage:  `url(${bottom})`, width: "100%", height: "50px", margin: 0, padding: 0 }}>
          {/* 底部内容 
        </div> */}
        </ScrollContainer>
      </ToastProvider>
    </GameProvider>
  );
};
