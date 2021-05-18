import React, { useContext } from "react";
import "../styles/notes.scss";

import { Context } from "../Context";

const Notes = ({ nodes, instruments }) => {
  const { isPlaying } = useContext(Context);
  const notes = {
    gridColumn: " 2/-1",
    gridRow: `span ${instruments}`,
    display: "grid",
    gridTemplateColumns: `repeat(${nodes}, 5em)`
  };
  const arr = new Array(nodes * instruments);
  for (let i = 0; i < nodes * instruments; i++) {
    const rand = Math.round(Math.random() * 1);
    arr[i] = rand ? "node" : "node active-node";
  }
  return (
    <div id="notes" className="notes" style={notes}>
      {arr.map((classname, i) => (
        <span key={i} className={classname}></span>
      ))}
      <span
        className="marker"
        style={
          isPlaying ? { opacity: "1" } : { pointerEvents: "none", opacity: "0" }
        }
      ></span>
    </div>
  );
};

export default Notes;
