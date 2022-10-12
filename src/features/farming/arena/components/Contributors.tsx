import close from "assets/icons/close.png";
import React, { useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import boo from "assets/other/boo5.gif";
import init from "assets/other/init.gif";
import goblin from "assets/npcs/goblin.gif";
import arenabg from "assets/other/arena/arenabg.png";
import { Panel } from "components/ui/Panel";
import { Modal } from "react-bootstrap";

import { Tab } from "components/ui/Tab";
import { ITEM_DETAILS } from "features/game/types/images";
import { useTranslation } from "react-i18next";
import { Fight } from "./Fight";

const TAB_CONTENT_HEIGHT = 340;
interface Props {
  onClose: () => void;
  landData?: any;
  animalIds?: any[];
}

export const UseArenaScrollIntoView = () => {
  const el = document.getElementById("arenacenter");

  el?.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

export const Contributors: React.FC<Props> = ({ onClose }) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Panel className="pt-5 relative ">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex"></div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>
      <ScrollContainer className="bg-green-background overflow-scroll relative w-full h-full">
        <div
          style={{
            minHeight: "200px",
            maxHeight: "600px",
          }}
          className="relative h-gameboard w-gameboard"
        >
          <img src={arenabg} className="absolute inset-3 w-1/3   " />
          <img
            src={boo}
            style={{
              height: "100px",
              width: "100px",
              left: "calc(9% )",
              top: "calc(80%)",
            }}
            className="absolute"
          />

          <img
            src={boo}
            style={{
              height: "100px",
              width: "100px",
              left: "calc(23% )",
              top: "calc(80%)",
            }}
            className="absolute"
          />
          {/* 上 */}
          <img
            onClick={() => {
              setIsOpen(true);
            }}
            id="arenacenter"
            src={init}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(16% )",
              top: "calc(69%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
          {/* 下 */}
          <img
            src={init}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(16% )",
              top: "calc(158%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
          {/* 左 */}
          <img
            src={init}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(9.5% )",
              top: "calc(112%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
          {/* 右 */}
          <img
            src={init}
            onClick={() => {
              setIsOpen(true);
            }}
            style={{
              height: "80px",
              width: "80px",
              left: "calc(22.8% )",
              top: "calc(116%)",
            }}
            className="absolute hover:img-highlight cursor-pointer"
          />
        </div>
      </ScrollContainer>

      <div className="flex justify-between absolute bottom-1.5 left-0.5 right-0 items-center">
        <div className="flex"></div>
        <button className="h-6 cursor-pointer mr-2 mb-1"> Start Fight</button>
      </div>

      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
        <img
          src={close}
          className="h-6 top-4 right-4 absolute cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <Fight
          onClose={() => {
            setIsOpen(false);
          }}
        />
      </Modal>
    </Panel>
  );
};
