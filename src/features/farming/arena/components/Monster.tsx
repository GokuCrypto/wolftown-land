import { Panel } from "components/ui/Panel";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { createGlobalStyle } from "styled-components";

import up01 from "assets/other/arena/up01.png";

import right02 from "assets/other/arena/right02.png";
import over from "assets/other/arena/over.png";

import ms from "assets/other/arena/ms.png";
const MintStyle = createGlobalStyle`
 

@keyframes play {
	from { background-position:    0px;  }
	to { background-position: -795px;  }
}

@keyframes playUpOver{
	from { background-position-x: 0px;  }
	to { background-position-x: 217px ;  }
}

@keyframes playLeftOver{
	from { background-position-x: 0px;  }
	to { background-position-x: 217px ;  }
}


@keyframes playRightOver{
	from { background-position-x: 0px ;  }
	to { background-position-x: 217px ;  }
}

@keyframes playDownOver{
	from { background-position-x: 0px  ;  }
	to { background-position-x: 217px ;  }
}

`;

interface Props {}

export const Monster: React.FC<Props> = ({}) => {
  const [tab, setTab] = useState<string>("craft");
  const { t } = useTranslation();

  return (
    <>
      <MintStyle />

      {/* 怪物上 */}

      <div
        style={{
          height: "54.25px",
          width: "55.25px",
          left: "calc(14% )",
          top: "calc(1%)",
          background: "url(" + over + ")",
          animation: "playUpOver 1.2s steps(4) infinite",
          backgroundPositionY: "0px",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>

      <div
        style={{
          height: "77px",
          width: "55px",
          left: "calc(15% )",
          top: "calc(1%)",
          background: "url(" + ms + ")",
          animation: "playUpOver 1.2s steps(4) infinite",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>

      {/* 怪物下 */}
      <div
        style={{
          height: "54.25px",
          width: "55.25px",
          left: "calc(16% )",
          bottom: "calc(-130%)",
          backgroundImage: "url(" + over + ")",
          animation: "playDownOver 1.2s steps(4) infinite",
          backgroundPositionY: "54px",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>

      <div
        style={{
          height: "77px",
          width: "55px",
          left: "calc(18% )",
          bottom: "calc(-130%)",
          backgroundImage: "url(" + ms + ")",
          animation: "playDownOver 1.2s steps(4) infinite",
          backgroundPositionY: "77px",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>

      {/* 怪物左 */}
      <div
        style={{
          height: "54.25px",
          width: "55.25px",
          left: "calc(1% )",
          top: "calc(100%)",
          backgroundImage: "url(" + over + ")",
          animation: "playLeftOver 1.2s steps(4) infinite",
          backgroundPositionY: " 108.5px",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>

      <div
        style={{
          height: "77px",
          width: "55px",
          left: "calc(1% )",
          top: "calc(110%)",
          backgroundImage: "url(" + ms + ")",
          animation: "playLeftOver 1.2s steps(4) infinite",
          backgroundPositionY: "155px",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>
      {/* 怪物右 */}
      <div
        style={{
          height: "54.25px",
          width: "55.25px",
          left: "calc(32% )",
          top: "calc(100%)",
          backgroundPositionY: "170px",
          backgroundImage: "url(" + over + ")",
          animation: "playRightOver 1.2s steps(4) infinite",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>

      <div
        style={{
          height: "77px",
          width: "55px",
          left: "calc(32% )",
          top: "calc(110%)",
          backgroundPositionY: "229px",
          backgroundImage: "url(" + ms + ")",
          animation: "playRightOver 1.2s steps(4) infinite",
        }}
        className="absolute hover:img-highlight cursor-pointer"
      ></div>
    </>
  );
};
