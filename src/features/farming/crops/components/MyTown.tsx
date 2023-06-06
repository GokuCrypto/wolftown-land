import React, { useState } from "react";
import { Section } from "lib/utils/hooks/useScrollIntoView";

import { useDrag } from "react-dnd";
import styled from "styled-components";

import Draggable from "react-draggable";
import sheep6 from "assets/land/castle/zero.png";

import nameplate from "assets/land/nameplate/one.png";

import icon from "assets/land/other/i001.png";
import icon02 from "assets/land/other/i002.png";
import setting from "assets/land/other/setting.gif";

import { t } from "i18next";

const TownTextCard = styled.div<{ lf: number }>`
  position: absolute;
  left: ${({ lf }) => lf + "px"};
  bottom: -18px;
  font-size: 10px;
  color: #fff;
`;

const TownTopCard = styled.div`
  position: absolute;
  top: -38px;
  left: -48px;
  font-size: 10px;
  color: #fff;

  background-image: url(${icon});
  background-repeat: no-repeat;
  width: 64px; /* 元素宽度 */
  height: 64px; /* 元素高度 */
`;

const SettingTopCard02 = styled.div`
  position: absolute;
  top: -20px;
  left: 50px;
  font-size: 10px;
  color: #fff;

  width: 32px; /* 元素宽度 */
  height: 32px; /* 元素高度 */
`;

const TownTopCard02 = styled.div`
  position: absolute;
  top: -38px;
  right: -48px;
  font-size: 10px;
  color: #fff;

  background-image: url(${icon02});
  background-repeat: no-repeat;
  width: 64px; /* 元素宽度 */
  height: 64px; /* 元素高度 */
`;

export const MyTown: React.FC = () => {
  const [position, setPosition] = useState<any>({ x: 0, y: 0 });
  //是否禁止移动
  const [def, setDef] = useState<boolean>(true);

  const [viewCard, setViewCard] = useState<boolean>(true);

  const handleDrag = (e: any, draggableData: any) => {
    const { x, y } = draggableData;

    setPosition({ x, y });
  };
  const handleStartDrag = (e: any, draggableData: any) => {
    e.target.style.backgroundImage = "url(/images/16x16.png)";
  };

  const handleStopDrag = (e: any, draggableData: any) => {
    e.target.style.backgroundImage = "";
  };

  //防止背景被拖动   ignore-scroll

  //当点击时，而且def = true  展现城堡的问题
  const handleClick = (e: any) => {
    if (def) {
      setViewCard(true);
      const castle = e.target;
      castle.classList.add("blink");
      setTimeout(() => {
        castle.classList.remove("blink");
      }, 5000);
    }
  };

  //woldtown-todo : 展示个人城堡，要求点击城堡时有相关提示
  return (
    <>
      <Draggable
        onDrag={handleDrag}
        onStop={handleStopDrag}
        onStart={handleStartDrag}
        grid={[16, 16]}
        disabled={def}
        defaultPosition={{ x: 100, y: 300 }}
      >
        <div
          id={Section.MyTown}
          className={"ignore-scroll "}
          onClick={handleClick}
          style={{
            position: "absolute",
            touchAction: "none",
            height: "128px",
            width: "128px",
            zIndex: "20",
          }}
        >
          <TownTopCard> </TownTopCard>
          <SettingTopCard02>
            <img src={setting} className={"w-full flex justify-between"} />
          </SettingTopCard02>
          <TownTopCard02> </TownTopCard02>
          <img src={sheep6} className={"w-full flex justify-between castle"} />
          <div>
            <TownTextCard lf={20}>8</TownTextCard>
            <img
              style={{ height: "15px" }}
              src={nameplate}
              className={"w-full flex justify-between"}
            />
            <TownTextCard lf={35}>{t("My Town")}</TownTextCard>
          </div>
        </div>
      </Draggable>
      <div className="absolute">
        Position: {position.x}, {position.y}
      </div>
    </>
  );
};
