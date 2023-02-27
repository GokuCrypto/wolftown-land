import React, { useEffect, useState } from "react";
import Decimal from "decimal.js-light";
import { BigBox } from "components/ui/BigBox";
import { useTranslation } from "react-i18next";
import { CopyField } from "components/ui/CopyField";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { Button } from "components/ui/Button";

import { Balances, EMPTY_BALANCES, Allowances, EMPTY_ALLOWANCES } from '../lib/types'
import { metamask } from "lib/blockchain/metamask"


// import { ITEM_DETAILS } from "features/game/types/images";
// import { InventoryItemName } from "features/game/types/game";
// import { SEEDS, CropName } from "features/game/types/crops";
// import timer from "assets/icons/timer.png";
// import lightning from "assets/icons/lightning.png";

// import { secondsToMidString } from "lib/utils/time";
// import classNames from "classnames";
// import { useShowScrollbar } from "lib/utils/hooks/useShowScrollbar";
// import { useScrollIntoView } from "lib/utils/hooks/useScrollIntoView";
// import { Inventory, TabItems } from "./InventoryItems";
// import { getShortcuts } from "../lib/shortcuts";
// import { hasBoost } from "features/game/lib/boosts";
// import { getCropTime } from "features/game/events/plant";
// import { getKeys } from "features/game/types/craftables";

const ITEM_CARD_MIN_HEIGHT = "148px";

interface Props {
  address: string;
}

const TAB_CONTENT_HEIGHT = 380;

export const NftDepositTab = ({ address }: Props) => {
  const { t } = useTranslation()
  const [ selectedIds, setSelectedIds ] = useState([])
  const [tokenType, setTokenType] = useState<any>("Animal")
  const [message, setMessage] = useState('')
  
  const [ pendingTx, setPendingTx ] = useState(false)
  const [ animals, setAnimals] = useState<any>([])
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimalApproved, setIsAnimalApproved ] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      await metamask.initialise()
      try {
        const isApproved = await metamask.isApproved('animal')
        setIsAnimalApproved(isApproved)
      } catch(err) {
        console.log("err = ", err)
      }
      const balances = await metamask.getAnimals()
      setAnimals(balances);
      setIsLoading(false);
    };
    load()
  }, []);

  const handleSelect = (id: string|number) => {
    if(selectedIds.find(v=> v === id)) {
      setSelectedIds(selectedIds.filter(v => v!==id))
    } else {
      setSelectedIds(selectedIds.concat([id]))
    }
  }

  const deposit = async () => {
    setMessage('')
    await metamask.initialise()
    setPendingTx(true)
    
    if(!isAnimalApproved) {
      try {
        const receipt: any = await metamask.approveForAll('animal')
        if(receipt?.status) {
          setIsAnimalApproved(true)
        } else {
          setPendingTx(false)
          return
        }
      } catch(err) {
        setPendingTx(false)
        return
      }
    }

    try {
      const receipt: any = await metamask.depositNFTs('animal', selectedIds)
      if(receipt?.status){
        setMessage("Deposit Submitted")
        setPendingTx(false)
      }
    } catch(error: any) {
      // console.log("error===", error.message)
      if(error?.message) {
        setMessage(error?.message)  
      } else {
        setMessage(error.toString())
      }
      setPendingTx(false) 
    }
  }
  return (
    <div className="flex flex-col" style={{ minHeight: TAB_CONTENT_HEIGHT }}>
      <div className="flex flex-wrap">
        <ButtonGroup className="mb-2">
          <ToggleButton
            key="busd"
            id="busd"
            type="radio"
            variant="warning"
            name="radio"
            value="Animal"
            checked={tokenType === 'Animal'}
            onClick={() => setTokenType("Animal")}
            className={ tokenType === 'Animal' ? 'text-white': 'text-white bg-yellow-600'}
          >
            Animals
          </ToggleButton>
          <ToggleButton
            key="wool"
            id="wool"
            type="radio"
            variant="warning"
            name="radio"
            value="Land"
            checked={tokenType === 'Land'}
            onClick={(e) => setTokenType("Land")}
            className={ tokenType === 'Land' ? 'text-white': 'text-white bg-yellow-600'}
          >
            Lands
          </ToggleButton>
        </ButtonGroup>
      </div>
      {
        tokenType === 'Animal' && 
        <>
        <div className="w-full flex flex-wrap h-fit" style={{ maxHeight: TAB_CONTENT_HEIGHT, overflowY: "auto" }}>
          {
            isLoading && 
            <p className="text-white text-xs text-shadow mb-2 pl-2.5">
              Loading...
            </p>
          }
          {
            animals.map((animal, i) =>
               <BigBox 
                key={`animal_${animal.id}`}
                isSelected={ selectedIds.find((v)=> v===animal.id) }
                onClick={()=> handleSelect(animal.id) }      
                image={animal.imageSmall}
                id={animal.id}
              />
            )
          }
        </div>
        <div className="mt-2">
          <Button onClick={deposit} disabled={pendingTx || isLoading || selectedIds.length === 0}>
            { t("Deposit") }
          </Button>
        </div>
        </>
      }
      {
        tokenType === "Land" &&
        <>
        <div className="w-full flex flex-wrap h-fit" style={{ maxHeight: TAB_CONTENT_HEIGHT, overflowY: "auto" }}>
          <p>Coming soon</p>
        </div>
        <div className="mt-2">
          <Button disabled>
            { t("Deposit") }
          </Button>
        </div>
        </>
      }
      
      
    </div>
  );
};
