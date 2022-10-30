import React, { useState } from "react";
import * as schedule from "node-schedule";
interface Props {
  cdate?: Date;
}
export const LandTime: React.FC<Props> = ({ cdate }) => {
  const [leftVal, setLeftVal] = useState(["", "", ""]);
  const [radom, setRadom] = useState("nostart");

  let blinkForPlaza = async () => {
    // 计算期数

    if (cdate == null) {
      return;
    }

    const date: Date = new Date(
      new Date(
        new Date().toUTCString().replace("GMT", "")
      ).getTime() /* + 8 * 60 * 60 * 1000 */
    );

    const ccdate: Date = new Date(
      new Date(
        new Date(cdate?.toString()).toUTCString().replace("GMT", "")
      ).getTime() /* + 8 * 60 * 60 * 1000 */
    );

    const after = date.getTime();
    let before = ccdate.getTime() + 1000 * 60 * 60 * 12;

    const beto = before - after; //时间差

    const hourEnd = Math.floor(beto / 1000 / 60 / 60);
    let plat = ["00", "00", "00"];
    if (hourEnd > -1) {
      const minutesEnd = Math.floor(beto / 1000 / 60 - hourEnd * 60);
      const secondsEnd = Math.floor(
        beto / 1000 - hourEnd * 60 * 60 - minutesEnd * 60
      );

      console.log(
        "beto",
        beto,
        "hourEnd",
        hourEnd,
        "minutesEnd",
        minutesEnd,
        "secondsEnd",
        secondsEnd,
        "cdate",
        cdate,
        date,
        ccdate
      );
      plat = [
        `${hourEnd}`.padStart(2, "0"),
        `${minutesEnd}`.padStart(2, "0"),
        `${secondsEnd}`.padStart(2, "0"),
      ];
    }

    if (leftVal != plat) {
      setLeftVal(plat);
    }
  };
  let timeer: schedule.Job;
  if (radom === "nostart" && cdate != null) {
    setRadom("start");
    timeer = schedule.scheduleJob("0/1 * * * * ? ", async () => {
      await blinkForPlaza();
    });
  }

  return (
    <div>
      {leftVal[0] + ":" + leftVal[1] + ":" + leftVal[2] != "00:00:00" &&
      leftVal[0] + ":" + leftVal[1] + ":" + leftVal[2] != "::" ? (
        <>{leftVal[0] + ":" + leftVal[1] + ":" + leftVal[2]}</>
      ) : (
        <>
          {leftVal[0] + ":" + leftVal[1] + ":" + leftVal[2] != "::" ? (
            <>✔️</>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};
