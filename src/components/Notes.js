import React from "react";
import "../styles/notes.scss";

const Notes = ({ nodes, instruments }) => {
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
      {arr.map((classname) => (
        <span className={classname}></span>
      ))}
    </div>
  );
};

export default Notes;

/*

*/
