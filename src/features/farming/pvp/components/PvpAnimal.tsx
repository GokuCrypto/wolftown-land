import React, { useState, useEffect } from "react";
import close from "assets/icons/close.png";
import { Panel } from "components/ui/Panel";
import { Section } from "lib/utils/hooks/useScrollIntoView";
import { Modal } from "react-bootstrap";
import chick from "assets/animals/chick.gif";
import dragonfly from "assets/decorations/dragonfly.gif";
import gifbg from "assets/other/tv.gif";
import wolfpvp from "assets/land/arean-wolf.png";
import ReactPlayer from "react-player";
import { Animals } from "./Animals";

import land1 from "assets/landbuild/land1.png";

import { getLandGameList, APP_WOLF_API } from "hooks/WolfConfig";
import { size } from "lodash";

export class LandInfo {
  public landId?: string;
  public url?: string;
  public animals?: any[];
  public cdate?: Date;
  public id?: string;
  public shit?: string;
}

interface Props {
  onClose: () => void;
}

export const PvpAnimal: React.FC<Props> = () => {
  const [bgcolor, setBgcolor] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [landId, setLandId] = React.useState("");
  const [clickNumber, setClickNumber] = React.useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    // Container
    <div
      style={{
        height: "450px",
        width: "300px",
        top: "calc(40% - 160px)",
        right: "calc(50% - 172px)",
        overflow: "hidden",
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.Pvp}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <div className="h-full w-full relative hover:img-highlight">
          <img
            onClick={() => {
              setIsOpen(true);
            }}
            src={wolfpvp}
            className="relative w-100 "
          />
        </div>

        <Modal
          size="xl"
          fullscreen="xxl-down"
          centered
          show={isOpen}
          onHide={() => setIsOpen(false)}
        >
          <img
            src={close}
            className="h-6 top-4 right-4 absolute cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};
