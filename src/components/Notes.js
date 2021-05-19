import React, { useContext } from "react";
import "../styles/notes.scss";

import { Context } from "../Context";

const Notes = () => {
  const { isPlaying, noOfNodes, notes } = useContext(Context);
  const keysArr = Object.keys(notes);
  const instruments = keysArr.length;

  const notesStyle = {
    gridColumn: " 2/-1",
    gridRow: `span ${instruments}`,
    display: "grid",
    gridTemplateColumns: `repeat(${noOfNodes}, 5em)`
  };

  return (
    <div id="notes" className="notes" style={notesStyle}>
      {/* {arr.map((classname, i) => (
        <span key={i} className={classname}></span>
      ))} */}
      {keysArr.map((instrument) => (
        <>
          {notes[instrument].map((node, i) => (
            <span
              key={`${instrument}_${i}`}
              className={node ? "node active-node" : "node"}
            ></span>
          ))}
        </>
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
