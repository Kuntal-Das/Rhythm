import React, { useContext } from "react";
import "../styles/content.scss";

import Notes from "./Notes";
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
        <div className="timeline">
          <p id="ins1" className="instrument">
            Instrument 1
          </p>
          <p id="ins1" className="instrument">
            instrument 2
          </p>
          <p id="ins1" className="instrument">
            instrument 3
          </p>
          <p id="ins1" className="instrument">
            instrument 4
          </p>
          <Notes/>
        </div>
        <div className="actions">
          <button className="btn">Add Tune</button>
          <input
            type="range"
            className="input-timeline_marker"
            min="0"
            max={16}
          />
        </div>
      </div>
    </main>
  );
};

export default Content;
