import close from "assets/icons/close.png";

import areanwolf from "assets/other/arean-wolf.png";
import { Section } from "lib/utils/hooks/useScrollIntoView";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { Contributors } from "./components/Contributors";
import { UseArenaScrollIntoView } from "./components/Contributors";

export const Arena: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // Container
    <div
      style={{
        height: "450px",
        width: "260px",
        top: "calc(60% - 980px)",
        right: "calc(50% - 140px)",
        overflow: "hidden",
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.Arena}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <div className="h-full w-full relative">
          <img
            src={areanwolf}
            onClick={() => {
              setIsOpen(true);
              UseArenaScrollIntoView();
            }}
            className="relative w-100 float-left  ml-4 mt-2 mb-1 hover:img-highlight cursor-pointer"
          />
        </div>

        <Modal centered show={isOpen} onHide={() => setIsOpen(false)}>
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <Contributors
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};
