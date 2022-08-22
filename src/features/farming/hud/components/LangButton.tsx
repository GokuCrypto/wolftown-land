import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InnerPanel } from "components/ui/Panel";
import lang from "assets/icons/lang.svg";
import { withDefaultProps } from "./Rxt";
const defaultProps = {};
type CptProps = {} & typeof defaultProps;
const LangButtonCpt: React.FC = () => {
  const { i18n } = useTranslation();

  const languageClick = useCallback(async (e) => {
    console.log(e.target.value);
    if (e.target.value === "en") {
      await i18n.changeLanguage("zh");
      localStorage.setItem("swapLanguage", "zh");
      e.target.value = "zh";
    } else {
      await i18n.changeLanguage("en");
      localStorage.setItem("swapLanguage", "en");
      e.target.value = "en";
    }

    console.log("defaultValue", e.target.value);
  }, []);

  return (
    <InnerPanel
      className={"fixed top-2 z-50 flex items-center shadow-lg"}
      style={{ right: "10rem" }}
    >
      <select
        onClick={languageClick}
        className="language-button-select"
        defaultValue={i18n.language || "en"}
      >
        <option value="en">En</option>
        <option value="zh">CN</option>
      </select>
      <img
        src={lang}
        onClick={languageClick}
        style={{ width: "25px" }}
        alt="LangIcon"
      />
    </InnerPanel>
  );
};

export const LangButton = withDefaultProps(defaultProps, LangButtonCpt);
