import { Box } from "components/ui/Box";
import { Button } from "components/ui/Button";
import { OuterPanel, Panel } from "components/ui/Panel";
import Decimal from "decimal.js-light";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { WolfMarket } from "hooks/modules/WolfMarket";
import Datetime from "react-datetime";
import close from "assets/icons/close.png";

import { BagItem } from "../lib/types";
import { Modal } from "react-bootstrap";
import { checkWolfInvite } from "hooks/WHashConfig";
import { queryInviteLink, num_to_base36 } from "hooks/WolfConfig";
import { WolfUserGoods } from "hooks/modules/WolfUserGoods";
import { WolfGroundhog } from "hooks/modules/WolfGroundhog";

import { WolfGroundhogLog } from "hooks/modules/WolfGroundhogLog";

import { Tab } from "components/ui/Tab";
import { CopyField } from "components/ui/CopyField";

const ITEM_CARD_MIN_HEIGHT = "148px";

const TAB_CONTENT_HEIGHT = 384;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// const isSeed = (selectedItem: InventoryItemName) => selectedItem in SEEDS();
const syn = [
  "Animal feces ball",
  "bartizan",
  "Catapult",
  "artillery",
  "Rush Car",
  "Cyclone wheel car",
];

const arena = [
  "bartizan",
  "Catapult",
  "artillery",
  "Rush Car",
  "Cyclone wheel car",
];

const build = ["Blacksmith shop", "1v1"];

export const InviteCard = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");

  const [tab, setTab] = useState("Invite Link");
  const [historyList, setHistoryList] = useState<any[]>([]);

  const [inviteLink, setInviteLink] = useState<any>();
  const [inviteLinkChain, setInviteLinkChain] = useState("");
  const [inviteLinkReward, setInviteLinkReward] = useState("");

  const [dateValue, setDateValue] = useState<any>(new Date());
  //根据技能得到算力等级

  //背包显示等级

  useEffect(() => {
    queryInviteLink().then((result) => {
      if (result?.result?.wolfInvite) {
        if (result?.result?.wolfInvite?.inviteNumber) {
          setInviteLinkChain(
            "https://wolftown.games/land?invite=" +
              num_to_base36(result?.result?.wolfInvite?.inviteNumber)
          );
          setInviteLinkReward(
            "https://wolftown.games/InviteReward?invite=" +
              num_to_base36(result?.result?.wolfInvite?.inviteNumber)
          );
        }

        setInviteLink(result?.result?.wolfInvite);
      }
    });
  }, [isOpen]);

  const handleNextSong = async () => {
    const result = await checkWolfInvite();
    if (result?.message) {
      setMessage(result.message);
    } else {
      setMessage("Successful save!");
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Panel className="pt-5 relative">
        <div className="flex justify-between absolute top-1.5 left-0.5 right-0 items-center">
          <div className="flex">
            <Tab
              className="flex items-center"
              isActive={"Invite Link" === tab}
              onClick={() => {
                setTab("Invite Link");
              }}
            >
              {/*<img src={seeds} className="h-4 sm:h-5 mr-2" />*/}
              <span className="span-xs sm:span-sm overflow-hidden span-ellipsis">
                {t("Invite Link")}
              </span>
            </Tab>
          </div>
          <img
            src={close}
            className="h-6 cursor-pointer mr-2 mb-1"
            onClick={onClose}
          />
        </div>

        <div
          style={{
            minHeight: TAB_CONTENT_HEIGHT,
            maxHeight: TAB_CONTENT_HEIGHT * 1.5,
            overflowY: "auto",
          }}
        >
          <div>
            <CopyField
              text={inviteLinkChain}
              copyFieldMessage={"Copy Invite URL"}
            />
          </div>

          <div>
            <Button
              onClick={() => {
                window.open(inviteLinkReward, "_blank");
              }}
            >
              {t("View Invited")}
            </Button>
          </div>

          <div className="mt-10">
            <Button onClick={handleNextSong}>
              {t("Load invitation data into the game")}
            </Button>
          </div>

          <div className="mt-10">{message}</div>
        </div>
      </Panel>
    </Modal>
  );
};
