import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "components/ui/Button";

import close from "assets/icons/close.png";
import gf from "assets/wt/wallet-gf.png";

import { Panel } from "components/ui/Panel";
import { Tab } from "components/ui/Tab";

import { getUsertInfo } from "hooks/WolfConfig";

import { ERRORS } from "lib/errors";
import { useTranslation } from "react-i18next";

type Tab = "Meterial" | "Equip" | "Weapon" | "Animal";
const TABS = ["Meterial", "Equip", "Weapon", "Animal"];

interface Props {
  onClose: () => void;
}

const TAB_CONTENT_HEIGHT = 380;

export const InviteDetail: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  const { gameService, shortcutItem } = useContext(Context);
  const [game] = useActor(gameService);
  const inventory = game.context.state.inventory;
  const [tgNumber, setTgNumber] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [lnk, setLnk] = useState(false);

  const loadUsertInfo = async () => {
    setIsLoading(true);
    try {
      const userInfo = await getUsertInfo();
      if (userInfo?.result?.userInfo?.username) {
        setLnk(userInfo?.result?.userInfo?.username);
      }
      setIsLoading(false);
    } catch (e: any) {
      if (e.message === ERRORS.SESSION_EXPIRED) {
        gameService.send("EXPIRED");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUsertInfo();
  }, []);

  const onTgToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTgNumber(e.target.value);
  };

  return (
    <Panel className="pt-5 relative">
      <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
        <div className="flex">{t("Invite")}</div>
        <img
          src={close}
          className="h-6 cursor-pointer mr-2 mb-1"
          onClick={onClose}
        />
      </div>

      <div className="flex" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
        <div className="w-full flex flex-wrap h-fit">
          <div className="w-full flex flex-wrap mt-3 ">
            <div className="w-1/2 flex flex-wrap  ">
              <div className="w-1/2 ">关注侦探社TG</div>
              <div
                className="w-1/4 "
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                10积分
              </div>
            </div>
            <div className="w-1/2 flex flex-wrap h-fit">
              <div className="w-1/2 ">关注侦探社TG</div>
              <div
                className="w-1/4"
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                10积分
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap  mt-3 ">
            <div className="w-1/2 flex flex-wrap  ">
              <div className="w-1/2 ">邀请1人</div>
              <div
                className="w-1/4 "
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                10积分
              </div>
            </div>
            <div className="w-1/2 flex flex-wrap h-fit">
              <div className="w-1/2 ">邀请5人</div>
              <div
                className="w-1/4"
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                60积分
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap  mt-3 ">
            <div className="w-1/2 flex flex-wrap  ">
              <div className="w-1/2 ">邀请10人</div>
              <div
                className="w-1/4 "
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                150积分
              </div>
            </div>
            <div className="w-1/2 flex flex-wrap h-fit">
              <div className="w-1/2 ">邀请15人</div>
              <div
                className="w-1/4"
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                300积分
              </div>
            </div>
          </div>

          <div className="w-full flex flex-wrap   mt-3">
            <div className="w-1/2 flex flex-wrap  ">
              <div className="w-1/2 ">邀请20人</div>
              <div
                className="w-1/4 "
                style={{
                  textAlign: "center",
                  background: "url(" + gf + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                700积分
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        <div className="w-1/4 flex flex-wrap  ">填写我的TG号：</div>
        <div className="w-1/2 flex flex-wrap  ">
          <input
            type="text"
            placeholder={t("TG Account")}
            className="shadow-inner shadow-black bg-brown-200 p-2"
            onChange={onTgToChange}
          />
        </div>

        <div className="w-1/5 flex flex-wrap  ">
          <Button>提交</Button>
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        <div className="w-1/4 flex flex-wrap  ">邀请链接：</div>
        <div className="w-3/4 flex flex-wrap  ">{lnk}</div>
      </div>
    </Panel>
  );
};
