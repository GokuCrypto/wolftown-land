import React, { useState } from "react";
import { Section } from "lib/utils/hooks/useScrollIntoView";

import Draggable from "react-draggable";
import wood1 from "assets/land/world/250000_1.png";
export const Wood: React.FC = () => {
  const woodList: any[] = [
    { x: 100, y: 200 },
    { x: 200, y: 200 },
    { x: 600, y: 800 },
    { x: 2000, y: 2000 },
    { x: 500, y: 700 },
  ];

  //防止背景被拖动   ignore-scroll

  //woldtown-todo : 展示个人城堡，要求点击城堡时有相关提示
  return (
    <>
      {woodList?.map((position) => (
        <Draggable
          disabled={true}
          defaultPosition={{ x: position.x, y: position.y }}
        >
          <img
            style={{
              position: "absolute",
              height: "32px",
              width: "32px",
            }}
            src={wood1}
            className={"w-full flex justify-between"}
          />
        </Draggable>
      ))}
    </>
  );
};
