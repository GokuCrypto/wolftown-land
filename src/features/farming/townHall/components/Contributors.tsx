import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "assets/brand/logo.png";
import bumpkin from "assets/npcs/bumpkin.png";
import goblin from "assets/npcs/goblin.gif";
import { Contributor, CONTRIBUTORS } from "../constants/contributors";

const AVATARS: Record<Contributor["avatar"], string> = {
  bumpkin,
  goblin,
};

interface Props {
  onClose: () => void;
}

export const Contributors: React.FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-full h-96 overflow-scroll">
      <img src={logo} className="w-1/2" />
      <p className="text-sm text-center pt-4">
        Sunflower Land is a community project and we are so grateful to the
        contributors who have helped out get closer to our vision.
      </p>
      <p className="text-sm text-center pt-4">
        If you like their work, visit their farm and buy them a coffee!
      </p>
      {CONTRIBUTORS.map((contributor) => (
        <div className="flex w-full mt-8" id={contributor.name}>
          <img src={AVATARS[contributor.avatar]} className="h-8 mr-4" />
          <div>
            <p className="text-sm">
              {contributor.name}{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  navigate(`/visit/${contributor.farmId}`);
                  onClose();
                }}
              >
                #{contributor.farmId}
              </span>
            </p>
            <p className="text-sm">{contributor.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};