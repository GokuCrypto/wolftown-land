import React, { useEffect, useRef, useState } from "react";

import "react-tabs/style/react-tabs.css";

import { heartCheckFun, websock } from "hooks/Websocket";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import homeImages from "public/images/home.png";
import teamImages from "public/images/team.png";
import unionImages from "public/images/union.png";
import backgroundImages from "public/images/world_top.png";
import { useTranslation } from "react-i18next";
import mapMovement from "./lib/mapMovement";
import { Modal } from "react-bootstrap";
import close from "assets/icons/close.png";

import { useNavigate } from "react-router-dom"; 

import styled from "styled-components";
import { image } from "html2canvas/dist/types/css/types/image";
import { AdventureTeam } from "./AdventureTeam";
import { Game } from "./Game";

const BottomDiv = styled.div`
    position:fixed;
    width:100%;
    height:60px;
    z-index:10;  
    bottom:0px;  
    border-style: solid; border-width: 6px; border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat; image-rendering: pixelated; border-radius: 20px;
`

const BottomDivHome = styled.div`
 
    position:absolute;
    bottom:0;
    left: 0;
    width: "100px";
    height: "100px";
    border-style: solid; border-width: 6px; border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat; image-rendering: pixelated; border-radius: 20px;
`
const BottomDivTeam = styled.div`
z-index:10;  
    position:absolute;
    bottom:0;
    width: "100px";
    height: "100px";
    border-style: solid; border-width: 6px; border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat; image-rendering: pixelated; border-radius: 20px;

`
const BottomDivUnion = styled.div`
    position:absolute;
    bottom:0;
    right: 0;
    width: "100px";
    height: "100px";
    border-style: solid; border-width: 6px; border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat; image-rendering: pixelated; border-radius: 20px;
`

export const ButtomGround: React.FC = () => {
    // catching and passing scroll container to keyboard listeners
    const container = useRef(null);
    // const { id } = useParams();
    const [scrollIntoView] = useScrollIntoView();
    const battlePower = 67437788; // 从后端获取的战斗力数据
    const { t } = useTranslation();
    const battlePowerString = battlePower.toString(); // 将战斗力数据转换为字符串
    const [isMobile] = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [backHome, setBackHome] = useState(false);
   
    
    const handleClick = () => {
        navigate('Game');
      };

    const handleButtonClick = () => {
        setIsOpen(true);
    };
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
            <img src={numberImages[digit]} style={{ filter: "drop-shadow(0px 0px 5px #fff)" }} alt={`Digit ${digit}`} key={index} />
        ));
    useEffect(() => {
        //加载socket
        scrollIntoView(Section.MyTown, "auto");
        websock();
        heartCheckFun();
    }, [scrollIntoView]);

    let BlankGoods = [
        {
            goodsName: "Field 1",
            goodsUrl: "https://img.wolftown.games/other/blank.png",
        },
        {
            goodsName: "Field 2",
            goodsUrl: "https://img.wolftown.games/other/blank.png",
        },
        {
            goodsName: "Field 3",
            goodsUrl: "https://img.wolftown.games/other/blank.png",
        },
    ];


    useEffect(() => {
        mapMovement.addListeners(container.current);
        return () => {
            mapMovement.removeListeners();
        };
    }, [container]);
    return (
        <BottomDiv className="bg-brown-600 shadow-lg" style={{ height: isMobile ? "41px" : "60px" }}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* 回城按钮，可以超过父级尺寸 */}
                <BottomDivHome className="bg-brown-600 shadow-lg"  >
                    <img  onClick={handleClick} src={homeImages} className="home w-full" alt="home" />
                </BottomDivHome>
                <BottomDivTeam style={{ left: isMobile ? "160px" : "1200px" }} >

                    <img onClick={handleButtonClick}src={teamImages} alt="team" />
                    <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
                        <img
                            src={close}
                            className="h-6 top-4 right-4 absolute cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        />
                        <AdventureTeam
                            onClose={() => {
                                setIsOpen(false);
                            }}
                        />
                    </Modal>

                </BottomDivTeam>
                <BottomDivUnion>
                    <img src={unionImages} className="home w-full" alt="union" />
                </BottomDivUnion>
                {/* <img src={avatarImage} className="avatar" alt="Avatar" style={{ position: "absolute", top: "50%", left: "5%", transform: "translate(-50%, -50%)"}} /> */}


                {/* <div className=" cursor-pointer  flex items-center justify-center"  >
                    {replacedDigits}
                </div> */}

            </div>

        </BottomDiv>
    )
};