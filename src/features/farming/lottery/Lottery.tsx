import React, { useState } from "react";
import close from "assets/icons/close.png";

import { Section } from "lib/utils/hooks/useScrollIntoView";
import { Modal } from "react-bootstrap";
import chick from "assets/animals/chick.gif";
import dragonfly from "assets/decorations/dragonfly.gif";
import gifbg from "assets/lottery/gifbg.gif";
import uuu from "assets/lottery/uuu.gif";
import { Contributors } from "./components/Contributors";
import { Panel } from "components/ui/Panel";

import { Frog } from "./components/Frog";

export const Lottery: React.FC = () => {
  const [bgcolor, setBgcolor] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // Container
    <div
      style={{
        height: "650px",
        width: "1650px",
        left: "calc(38% - 1370px)",
        top: "calc(78% - 960px)",
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.Lottery}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        {/*<img src={chick} className="absolute right-0 w-5 top-8" />*/}
        <img
          src={dragonfly}
          className="absolute right-16 w-10 bottom-36 animate-float"
        />

        {/*<Frog />*/}
        {/*   <RunWolf /> */}

        <div
          onMouseMove={() => {
            setBgcolor(true);
          }}
          onMouseLeave={() => {
            setBgcolor(false);
          }}
          onClick={() => setIsOpen(true)}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "10%",
            background: bgcolor ? "url('" + gifbg + "')" : "url('" + uuu + "')",
            backgroundSize: bgcolor ? "100% 100%" : "100% 99.9%",
            minHeight: "40%",
            minWidth: "20%",
          }}
        ></div>
      </div>
      <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
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
