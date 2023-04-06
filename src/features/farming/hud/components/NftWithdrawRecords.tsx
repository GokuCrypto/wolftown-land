import React, { useEffect, useState } from "react";
import Decimal from "decimal.js-light";
import { BigBox } from "components/ui/BigBox";
import { useTranslation } from "react-i18next";
import { CopyField } from "components/ui/CopyField";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Button } from "components/ui/Button";
import { getNftToChainList, nftWithdraw, Constants } from "hooks/WolfConfig";
import { getContractHandler } from "hooks/ethereum";

import {
  Balances,
  EMPTY_BALANCES,
  Allowances,
  EMPTY_ALLOWANCES,
} from "../lib/types";
import { metamask } from "lib/blockchain/metamask";
import { queryBaglist } from "hooks/WolfConfig";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  address: string;
}

const TAB_CONTENT_HEIGHT = 380;

export const NftWithdrawRecords = () => {
  const { t } = useTranslation();

  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [lands, setLands] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenType, setTokenType] = useState<any>("Animal");
  const [message, setMessage] = useState("");
  const [checkList, setCheckList] = useState<Number[]>([]);
  const [tochainList, setTochainList] = useState<any[]>();
  const [centerOwner, setCenterOwner] = useState();

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      const result = await getNftToChainList();
      if (result) {
        setRecords(result.result.getNftToChainList);
        setCenterOwner(result.result.owner);
      }

      setIsLoading(false);
    };
    load();
  }, []);

  const handleSelect = (id: string | number) => {
    /* if (selectedIds.find((v) => v === id)) {
      setSelectedIds(selectedIds.filter((v) => v !== id));
    } else {
      setSelectedIds(selectedIds.concat([id]));
    } */
    selectedIds[0] = id;
    setSelectedIds(selectedIds);
    setIsLoading(!isLoading);
  };

  const toChain = async () => {
    try {
      //暂时只能一个

      const contractss = await getContractHandler("Vault");

      if (!contractss) return;

      let ids: any = [];
      let contracts: any = [];
      let nftIds: any = [];
      let grades: any = [];
      let goodsTypes: any = [];
      let signs: any = [];

      console.log("checkListcheckListcheckList", checkList);

      if (checkList) {
        checkList.map((idex, inn) => {
          const chainList = records[Number(idex)];

          let contract = "";
          if (chainList.nftType == "Animal") {
            contract = Constants.Contract.WTAnimal;
          } else if (chainList.nftType == "Equip") {
            contract = Constants.Contract.WTLand;
          }

          // 種族（人40%>仙25%>獸20%>龍10%>神5%）

          console.log(
            "timessssss",
            centerOwner,
            chainList.userGoodsId + "",
            contract,
            chainList.level,
            chainList.nftType,
            chainList.sign
          );

          ids.push(chainList.userGoodsId + "");
          contracts.push(contract);
          nftIds.push(Number(chainList.nftId));
          grades.push(Number(chainList.level));
          goodsTypes.push(chainList.nftType);
          signs.push(chainList.sign);
        });
      } else {
        setMessage("please select one data!");
        return;
      }
      console.log(
        "idsidsidsidsidsids",
        ids,
        contracts,
        nftIds,
        grades,
        goodsTypes,
        signs
      );

      const result = await contractss.withdrawNFTSMultiple(
        ids,
        contracts,
        nftIds,
        grades,
        goodsTypes,
        signs
      );

      if (result) {
      }
    } catch (error) {
      console.error(error);
      setMessage(JSON.stringify(error));
    }
  };

  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div
        className="w-full flex flex-wrap h-fit"
        style={{ maxHeight: TAB_CONTENT_HEIGHT, overflowY: "auto" }}
      >
        <table>
          {records?.map((red: any, i: number) => (
            <tr>
              <td style={{ width: "50px" }}>{i}</td>
              <td style={{ width: "200px" }}>{red.goodsName}</td>
              <td>
                <input
                  className="w-5 h-5"
                  type={"checkbox"}
                  onChange={() => {
                    if (checkList.includes(i)) {
                      setCheckList(checkList.filter((k) => k != i));
                    } else {
                      checkList.push(i);
                      setCheckList(checkList);
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="mt-2">
        <Button onClick={toChain}>{t("Exchange")}</Button>
      </div>
      <div className="mt-2">
        <span className="text-xs text-base"> {message} </span>
      </div>
    </div>
  );
};
