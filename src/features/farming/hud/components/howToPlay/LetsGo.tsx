import React from "react";

import { Modal } from "react-bootstrap";
import { HowToModalHeader } from "features/farming/hud/components/howToPlay/HowToModalHeader";
import { useTranslation } from 'react-i18next'; 
interface Props {
  onClose: () => void;
  onBack: () => void;
}

export const LetsGo: React.FC<Props> = ({ onClose, onBack }) => {
  const { t } = useTranslation();
  return (
    <>
      <HowToModalHeader
        title=   {t("Time to play Title")}
        onClose={onClose}
        onBack={onBack}
      />
      <Modal.Body>
        <p className="text-xs p-2 sm:text-sm text-center">
        {t("Time to play Context 1")}
        </p>

        <p className="text-xs p-2 sm:text-sm text-center">
        {t("Time to play Context 2")}{" "}
          <a
            className="text-xs sm:text-sm underline"
            href="https://docs.sunflower-land.com"
            target="_blank"
            rel="noreferrer"
          >
           {t("Time to play Context 3")}
          </a>
        </p>
      </Modal.Body>
    </>
  );
};
