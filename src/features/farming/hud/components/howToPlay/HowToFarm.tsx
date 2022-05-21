import React from "react";

import { Modal } from "react-bootstrap";

import sunflower from "assets/crops/sunflower/planted.png";
import seedling from "assets/crops/sunflower/seedling.png";
import seed from "assets/crops/sunflower/seed.png";
import cursor from "assets/ui/cursor.png";
import token from "assets/icons/token.gif";

import shop from "assets/buildings/shop_building.png";
import { HowToModalHeader } from "./HowToModalHeader";
import { useTranslation } from 'react-i18next';


interface Props {
  onClose: () => void;
}

export const HowToFarm: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <HowToModalHeader title={t("How Play Title")} onClose={onClose} />
      <Modal.Body>
        <div className="flex items-center">
          <p className="text-xs sm:text-sm p-2">
            {t("play step 1")}
          </p>
          <div className="relative">
            <img src={sunflower} className="w-12" />
            <img src={cursor} className="w-4 absolute right-0 bottom-0" />
          </div>
        </div>
        <div className="flex  items-center mt-2 ">
          <p className="text-xs sm:text-sm p-2">
            {t("play step 2")}
          </p>
          <div className="relative">
            <img src={shop} className="w-14" />
            <img src={cursor} className="w-4 absolute right-0 -bottom-2" />
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-xs sm:text-sm p-2">
            {t("play step 3")}
          </p>

          <div className="relative">
            <img src={token} className="w-12" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs sm:text-sm p-2"> {t("play step 4")}</p>
          <div className="relative">
            <img src={seed} className="w-8" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm p-2"> {t("play step 5")}</p>
          <div className="relative">
            <img src={seedling} className="w-12" />
            <img src={cursor} className="w-4 absolute right-0 bottom-0" />
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
