import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useActor } from "@xstate/react";

import basket from "assets/icons/basket.png";
import button from "assets/ui/button/round_button.png";
import bag from "assets/wt/backpack.png";

import { Label } from "components/ui/Label";
import { Box } from "components/ui/Box";

import { ERRORS } from "lib/errors"
import { InventoryItems } from "./InventoryItems";
import { BagItems } from "./BagItems";
import { Context } from "features/game/GameProvider";

// import { getShortcuts } from "../lib/shortcuts";
// import { ITEM_DETAILS } from "features/game/types/images";

import { queryBaglist } from "hooks/WolfConfig"

export const Bag: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { shortcutItem, gameService } = useContext(Context);
  const [game] = useActor(gameService);

  // const inventory = game.context.state.inventory;
  // const shortcuts = getShortcuts();

  


  const handleInventoryClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col items-end mr-2 sm:block fixed top-16 right-0 z-50">
      <div
        className="w-12 h-12 sm:mx-8 mt-2 relative flex justify-center items-center shadow rounded-full cursor-pointer"
        onClick={handleInventoryClick}
      >
        <img
          src={bag}
          className="absolute w-full h-full -z-10"
          alt="Bag"
        />
        {/*<img src={bag} className="w-8 mb-1" alt="inventory" />*/}
        <Label className="hidden sm:block absolute -bottom-7">Bag</Label>
      </div>

      <Modal size="lg" centered scrollable show={isOpen} onHide={() => setIsOpen(false)}>
        <BagItems onClose={() => setIsOpen(false)} />
      </Modal>

    </div>
  );
};
