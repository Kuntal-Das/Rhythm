import React, { useContext } from "react";
import "../styles/timeline.scss";

import { Context } from "../Context";

const Timeline = () => {
  const { currentposition, noOfNodes, notes, toggleNote } = useContext(Context);
  const keysArr = Object.keys(notes);
  // const instruments = keysArr.length;

  const notesStyle = {
    // gridColumn: " 2/-1",
    // gridRow: `span ${instruments}`,
    display: "grid",
    gridTemplateColumns: `7em repeat(${noOfNodes}, minmax(4em,1fr))`
  };

  return (
    <>
      <div className="timeline-wrapper">
        <div className="timeline">
          {keysArr.map((instrument, i) => (
            <div key={instrument} className="notes" style={notesStyle}>
              <p key={`${instrument}_${i}`} className="instrument">
                {instrument}
              </p>
              {notes[instrument].map((node, j) => (
                <span
                  key={`${instrument}_${i}_${j}`}
                  className={node === 1 ? "node active-node" : "node"}
                  onClick={()=>toggleNote(`${instrument}_${i}_${j}`)}
                ></span>
              ))}
            </div>
          ))}
          {/* <span className="marker"></span> */}
        </div>
      </div>
      {/* <div className="actions">
        <button className="btn">Add Tune</button>
        <input
          type="range"
          className="input-timeline_marker"
          min="0"
          max={noOfNodes}
          value={currentposition}
          readOnly
        />
      </div> */}
    </>
  );
};

export default Timeline;
