import React from "react";
import "../styles/content.scss";

import Notes from "./Notes";

const nodes = 15;
const instruments = 4;

const Content = () => (
  <main>
    <div className="container content-grid">
      <select className="input-select">
        <option>Select Preset</option>
        <option>Preset 1</option>
        <option>Preset 2</option>
        <option>Preset 3</option>
        <option>Preset 4</option>
        <option>Preset 5</option>
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
        <Notes nodes={nodes} instruments={instruments} />
      </div>
      <div className="actions">
        <button className="btn">Add Tune</button>
        <input
          type="range"
          className="input-timeline_marker"
          min="0"
          max={nodes}
        />
      </div>
    </div>
  </main>
);

export default Content;
