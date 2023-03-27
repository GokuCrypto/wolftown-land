import React, { useContext, useState } from "react";

import * as Auth from "features/auth/lib/Provider";

import { Modal } from "react-bootstrap";
import { Button } from "components/ui/Button";
import { Panel } from "components/ui/Panel";
import { LangButton } from "features/farming/hud/components/LangButton";
import alert from "assets/icons/expression_alerted.png";
import { Context } from "features/game/GameProvider";
import { useTranslation } from "react-i18next";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { authService } = useContext(Auth.Context);

  const { gameService } = useContext(Context);

  const [resetSessionConfirmation, setResetSessionConfirmation] =
    useState(false);
  // {Todo: Modify gameState and authMachine for Logout event}

  const onLogout = async () => {
    onClose();
    authService.send("LOGOUT"); // hack used to avoid redundancy
  };

  const onResetSession = () => {
    setResetSessionConfirmation(true);
  };

  const onConfirmResetSession = () => {
    onClose();
    gameService.send("RESET");
  };

  const Content = () => {
    if (resetSessionConfirmation) {
      return (
        <div className="p-4 ">
          <div className="flex items-center border-2 rounded-md border-black p-2 mt-2 mb-2 bg-error">
            <img src={alert} alt="alert" className="mr-2 w-5 h-5/6" />
            <span className="text-xs">{t("Reset Session Warning")}</span>
          </div>
          <div className="row justify-between ">
            <Button
              className="col m-1"
              onClick={() => setResetSessionConfirmation(false)}
            >
              {t("No")}
            </Button>
            <Button className="col m-1" onClick={onConfirmResetSession}>
              {t("Yes")}
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col">
        <LangButton />
        <Button className="col p-1" onClick={onLogout}>
          {t("Logout")}
        </Button>
        {/*<Button className="col  p-1 mt-2" onClick={onResetSession}>
        {t("Reset Session")}
        </Button>*/}
      </div>
    );
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Panel className="p-0">{Content()}</Panel>
    </Modal>
  );
};
