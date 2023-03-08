import React from "react";
import { Modal } from "react-bootstrap";

import townHall from "assets/buildings/townhall.png";
import heart from "assets/wt/wolf.png";
import close from "assets/icons/close.png";
import { useTranslation } from "react-i18next";

import { GRID_WIDTH_PX, GRID_HIGHT_PX } from "features/game/lib/constants";
import { Action } from "components/ui/Action";
import { Panel } from "components/ui/Panel";
import { Contributors } from "./components/Contributors";

export const TownHall: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();

  const open = () => {
    setIsOpen(true);
  };

  return (
    <div
      className="z-10 absolute"
      // TODO some sort of coordinate system
      style={{
        width: `${GRID_WIDTH_PX * 6.5}px`,
        left: `${GRID_WIDTH_PX * -15.4}px`,
        top: `${GRID_HIGHT_PX * 1}px`,
      }}
    >
      <div className={"cursor-pointer hover:img-highlight"}>
        <img src={townHall} alt="market" onClick={open} className="w-full" />
        <Action
          className="absolute bottom-24 left-8"
          text="Town Build"
          icon={heart}
          onClick={open}
        />
      </div>

      <Modal size="lg" centered show={isOpen} onHide={() => setIsOpen(false)}>
        <Panel>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <Contributors onClose={() => setIsOpen(false)} />
        </Panel>
      </Modal>
    </div>
  );
};
