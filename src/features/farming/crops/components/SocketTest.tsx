import React, { useContext } from "react";

import { Context } from "features/game/GameProvider";
import { GRID_HIGHT_PX, GRID_WIDTH_PX } from "features/game/lib/constants";
import { socketTest } from "hooks/WolfConfig";
import { websocketSend } from "hooks/Websocket";

import classnames from "classnames";
export const SocketTest: React.FC = () => {
  const { selectedItem } = useContext(Context);

  const testSokect = () => {
    //socket 测试按钮

    socketTest();
  };

  const clientSokect = () => {
    //客户端消息测试

    websocketSend("测试一下！！");
  };

  const className = "flex justify-center";
  return (
    <div
      className="absolute flex justify-center flex-col "
      style={{
        width: `${GRID_WIDTH_PX * 3}px`,
        height: `${GRID_WIDTH_PX * 3}px`,
        left: `${GRID_WIDTH_PX * 0}px`,
        top: `${GRID_HIGHT_PX * 0}px`,
      }}
    >
      <button onClick={testSokect}>socket Server button</button>

      <button className="mt-10" onClick={clientSokect}>
        socket Client button
      </button>
    </div>
  );
};
