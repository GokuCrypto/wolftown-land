import React, { useEffect, useRef, useState } from "react";
import ScrollContainer, { ScrollEvent } from "react-indiana-drag-scroll";

import background from "assets/land/world02.jpeg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import { useTranslation } from "react-i18next";
import { Section, useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
import { GameProvider } from "./GameProvider";
import { GameWorld } from "./GameWorld";
import mapMovement from "./lib/mapMovement";
import { ToastProvider } from "./toast/ToastQueueProvider";
import { websock, heartCheckFun } from "hooks/Websocket";
import worldMap from "public/images/world_map.png"
import logoImage from "public/images/avatar_frame2.png"
import avatarImage from "public/images/Weekly Groundhog.png"
import bottom from "public/images/frame.png"
import bag from "assets/wt/backpack.png";
import { Label } from "components/ui/Label";
import { backgroundSize } from "html2canvas/dist/types/css/property-descriptors/background-size";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


export const WorldMap: React.FC = () => {
    // catching and passing scroll container to keyboard listeners
    const container = useRef(null);
    // const { id } = useParams();
    const [scrollIntoView] = useScrollIntoView();
    const battlePower = 67437788; // 从后端获取的战斗力数据
    const { t } = useTranslation();
    const navigate = useNavigate();
    const battlePowerString = battlePower.toString(); // 将战斗力数据转换为字符串
    const [isMobile] = useIsMobile();
    const handleClick = () => {
        navigate('features/game/WolfTownWorld');
    };
    return (

        <div className="flex flex-col items-end mr-2 sm:block fixed top-16 right-0 z-50" style={{ transform: 'translateX(-80px)' }}>
            <div className="flex justify-between items-center">
                <div
                    className="w-12 h-12 sm:mx-8 mt-2 relative flex justify-center items-center shadow rounded-full cursor-pointer"
                >
                    <img onClick={handleClick} src={worldMap} className="w-12 h-12 mr-2 relative shadow rounded-full cursor-pointer" alt="Your Image" />
                    <Label className="hidden sm:block absolute -bottom-7">{t("WorldMap")}</Label>
                </div>
            </div>
        </div>
    )
};