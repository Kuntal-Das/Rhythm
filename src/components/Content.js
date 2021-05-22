import React, { useContext } from "react";
import "../styles/content.scss";

import Timeline from "./Timeline";
import { Context } from "../Context";

import presets from "../presets";

const Content = () => {
  const { presetName, handelChange } = useContext(Context);

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
          {Object.keys(presets).map((key) => (
            <option key={key} value={key}>
              {key.split("_").join(" ")}
            </option>
          ))}
        </select>
        <button className="btn justify-end">Export</button>
        <Timeline />
      </div>
    </main>
  );
};

export default Content;
