import React, { useContext, useEffect, useRef, useState } from "react";

import "react-tabs/style/react-tabs.css";

import close from "assets/icons/close.png";
import * as AuthProvider from "features/auth/lib/Provider";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import homeImages from "public/images/home.png";
import teamImages from "public/images/team.png";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import mapMovement from "../lib/mapMovement";
import { LabelMini } from "components/ui/LabelMini";

import styled from "styled-components";
import { AdventureTeam } from "./AdventureTeam";

const BottomDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 10;
  bottom: 0px;
  border-style: solid;
  border-width: 6px;
  border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat;
  image-rendering: pixelated;
  border-radius: 20px;
  display: flex;
`;

const BottomDivHome = styled.div`
  position: absolute;
  bottom: 0px;
  width: 80px;
  height: 80px;
  border-style: solid;
  border-width: 6px;
  border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat;
  image-rendering: pixelated;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const BottomDivTeam = styled.div`
  position: absolute;
  bottom: 0px;
  width: 50px;
  height: 50px;
  border-style: solid;
  border-width: 3px;
  border-image: url("/src/assets/ui/panel/dark_border.png") 25% / 1 / 0 repeat;
  image-rendering: pixelated;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ButtomGround: React.FC = () => {
  // catching and passing scroll container to keyboard listeners

  const { setWorldMapView } = useContext(AuthProvider.Context);

  const container = useRef(null);
  // const { id } = useParams();

  const { t } = useTranslation();

  const [isMobile] = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setWorldMapView(false);
  };

  const handleButtonClick = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    mapMovement.addListeners(container.current);
    return () => {
      mapMovement.removeListeners();
    };
  }, [container]);
  return (
    <BottomDiv
      className="bg-brown-600 shadow-lg"
      style={{ height: isMobile ? "41px" : "60px" }}
    >
      {/* 回城按钮，可以超过父级尺寸 */}
      <BottomDivHome>
        <img
          className="w-full"
          onClick={handleClick}
          src={homeImages}
          alt="home"
        />
      </BottomDivHome>
      <BottomDivTeam style={{ left: isMobile ? "160px" : "120px" }}>
        <img
          src={teamImages}
          className="w-full"
          alt="teamImages"
          onClick={handleButtonClick}
        />

        <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
          <AdventureTeam
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
      </BottomDivTeam>
    </BottomDiv>
  );
};
