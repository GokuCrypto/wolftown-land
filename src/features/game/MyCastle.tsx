import React, { useEffect, useRef,useState } from "react";

import "react-tabs/style/react-tabs.css";

import { heartCheckFun, websock } from "hooks/Websocket";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import backCastle from "public/images/back_castle.png"
import { useTranslation } from "react-i18next";
import mapMovement from "./lib/mapMovement";


import styled from "styled-components";
import { image } from "html2canvas/dist/types/css/types/image";


const BackMyCastle = styled.div`
position: fixed;
top: 50%;
right: 0;
z-index: 10;
`


export const MyCastle: React.FC = () => {
    // catching and passing scroll container to keyboard listeners
    const container = useRef(null);
    // const { id } = useParams();
    const [scrollIntoView] = useScrollIntoView();
    const { t } = useTranslation();
    const [isMobile] = useIsMobile();
    const [castleId, setCastleId] = useState<string | undefined>(undefined);
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
    

    const retrievedCastleX = 200; // 替换为实际的 x 坐标
    const retrievedCastleY = 700; // 替换为实际的 y 坐标
    
    const handleCastleClick = () => {
      // 设置城堡的 x、y 坐标
      const castleX = retrievedCastleX;
      const castleY = retrievedCastleY;
    
      // 将页面滚动到指定的位置
      window.scrollTo(castleX, castleY);
    };

  
    return (
        <BackMyCastle onClick={handleCastleClick}>
            <img  src={backCastle} >
            </img>
        </BackMyCastle>
    )
};