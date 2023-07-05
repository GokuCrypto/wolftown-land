import React, { useRef, useContext } from "react";
import * as AuthProvider from "features/auth/lib/Provider";

import "react-tabs/style/react-tabs.css";

import { Label } from "components/ui/Label";
import { useIsMobile } from "lib/utils/hooks/useIsMobile";
import { useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const WorldMap: React.FC = () => {
  // catching and passing scroll container to keyboard listeners

  const { authService, worldMapView, setWorldMapView } = useContext(
    AuthProvider.Context
  );
  // const { id } = useParams();
  const [scrollIntoView] = useScrollIntoView();
  const battlePower = 67437788; // 从后端获取的战斗力数据
  const { t } = useTranslation();
  const navigate = useNavigate();
  const battlePowerString = battlePower.toString(); // 将战斗力数据转换为字符串
  const [isMobile] = useIsMobile();

  return (
    <div
      className="flex flex-col items-end mr-2 sm:block fixed top-16 right-0 z-50"
      style={{ transform: "translateX(-80px)" }}
    >
      <div className="flex justify-between items-center">
        <div className="w-12 h-12 sm:mx-8 mt-2 relative flex justify-center items-center shadow rounded-full cursor-pointer">
          <img
            onClick={() => {
              setWorldMapView(true);
            }}
            src={"/images/world_map.png"}
            className="w-12 h-12 mr-2 relative shadow rounded-full cursor-pointer"
            alt="Your Image"
          />
          <Label className="hidden sm:block absolute -bottom-7">
            {t("WorldMap")}
          </Label>
        </div>
      </div>
    </div>
  );
};
