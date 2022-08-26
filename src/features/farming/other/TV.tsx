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
        url="https://apd-ca675b64fd02a4e1ff2be034b0bccd1f.v.smtcdns.com/om.tc.qq.com/AqOu6Y2W2wuy_8LB-Ts6CbPL7y3xuvX5fYyRs_sHHm4I/uwMROfz2r5zCIaQXGdGnC2dfDmavB6NbsWKJAiRTQBPbT70a/b0526iymhsl.mp4?sdtfrom=v1010&guid=e2fdffd20045b5a0&vkey=DA99B274C27DB20BBB6CFDF22134E87099E4DC21AC1A77D7AD99ABBBF89489E19C3EA098E00B2D519DD6C828CCCDABCE0E92922BB39F72E02891CDDD8364E58AB7F09B54F0D10B9E7A6CED8D9D626B3457BA318FDAA85F52DB74C08AF2D2119450A2AFE07967D9472C158EA694D3F0AF4025BFA4857D508A79A663E76B9F562A"
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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    // Container
    <div
      style={{
        height: "50px",
        width: "380px",
        left: "calc(50% - 1333px)",
        top: "calc(56% - 80px)",
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
          {isOpen ? (
            <>
              <LiveBroadcast />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
