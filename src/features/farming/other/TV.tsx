import React, { useState } from "react";
import close from "assets/icons/close.png";

import { Section } from "lib/utils/hooks/useScrollIntoView";
import { Modal } from "react-bootstrap";
import chick from "assets/animals/chick.gif";
import dragonfly from "assets/decorations/dragonfly.gif";
import gifbg from "assets/other/tv.gif";
import uuu from "assets/lottery/uuu.gif";
import ReactPlayer from "react-player";

class LiveBroadcast extends React.Component {
  render() {
    return (
      <ReactPlayer
        className="react-player"
        url="/src/assets/tv/zts.mp4"
        width="140%"
        height="140px"
        playing={true}
        controls
      />
    );
  }
}

export const TV: React.FC = () => {
  const [bgcolor, setBgcolor] = useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    // Container
    <div
      style={{
        height: "115px",
        width: "900px",
        left: "calc(38.4% - 1336.2px)",
        top: "calc(60% - 80px)",
        overflow: "hidden",
      }}
      className="absolute"
    >
      <div className="h-full w-full relative">
        {/* Navigation Center Point */}
        <span
          id={Section.TV}
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
            background: bgcolor
              ? "url('" + gifbg + "')"
              : "url('" + gifbg + "')",
            backgroundSize: bgcolor ? "100% 100%" : "100% 99.9%",
            minHeight: "140px",
            minWidth: "20%",
            overflow: "hidden",
          }}
        >
          {isOpen ? <>{/* <LiveBroadcast /> */}</> : <></>}
        </div>
      </div>
    </div>
  );
};
