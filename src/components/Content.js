import React, { useContext } from "react";
import "../styles/content.scss";

import Timeline from "./Timeline";
// import { Context } from "../Context";
import { RhythmContext } from "../RhythmContext";

import CommingSoon from "../components/CommingSoon";
import useToggle from "../hooks/useToggle";

const Content = () => {
  const { presetsData, presetName, handelChange } = useContext(RhythmContext);
  const [isVisible, toggleVisiblity] = useToggle(false);

  return (
    <main>
      <div className="container content-grid">
        <select
          name="presetName"
          value={presetName}
          className="input-select"
          onChange={handelChange}
        >
          {/* <option value="">Select Preset</option> */}
          {Object.keys(presetsData).map((key) => (
            <option key={key} value={key}>
              {key.split("_").join(" ")}
            </option>
          ))}
        </select>
        <button className="btn justify-end" onClick={toggleVisiblity}>
          Export
        </button>
        <Timeline />
        <CommingSoon
          name="export"
          visible={isVisible}
          toggleVisibility={toggleVisiblity}
        />
      </div>
    </main>
  );
};

export default Content;
