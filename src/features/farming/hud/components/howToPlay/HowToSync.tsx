import React from "react";

import { Modal } from "react-bootstrap";

import timer from "assets/icons/timer.png";
import { HowToModalHeader } from "features/farming/hud/components/howToPlay/HowToModalHeader";
import { useTranslation } from 'react-i18next'; 
interface Props {
  onClose: () => void;
  onBack: () => void;
}

export const HowToSync: React.FC<Props> = ({ onClose, onBack }) => {
  const { t } = useTranslation();
  return (
    <>
      <HowToModalHeader
        title={t("How sync Title")}
        onClose={onClose}
        onBack={onBack}
      />
      <Modal.Body>
        <p className="text-xs p-2 sm:text-sm text-center">
        {t("sync context")}
        </p>

        <div className="flex items-center">
          <p className="text-xs sm:text-sm p-2">{t("sync step 1")}</p>
        </div>
        <div className="flex  items-center mt-2 ">
          <p className="text-xs sm:text-sm p-2">{t("sync step 2")}</p>
          <div className="relative">
            <img src={timer} className="w-4" />
          </div>
        </div>
      </Modal.Body>
    </>
  );
};
