import React from "react";

export default function CommingSoon({
  name = "",
  visible = false,
  toggleVisibility
}) {

  const containerDivStyle = {
    display: (visible) ? "grid" : "none",
    opacity: (visible) ? 1 : 0,
    placeContent: "center",

    position: "fixed",
    zIndex: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    transition: "300ms opacity linear"
  };

  const innerDivStyle = {
    padding: "3em",
    backgroundColor: "rgba(255,255,255,0.9)",
    display: "flex",
    gap: "1.5em",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "1em",
    textAlign: "center"
  };

  const h3Style = {
    color: "var(--clr-dark)"
  };

  return (
    <div style={containerDivStyle}>
      <div style={innerDivStyle}>
        <h3 style={h3Style}>
          Feature:"{name}" is Under Development
          <span role="img" aria-label="under development">
            🔨🛠⚒
          </span>{" "}
        </h3>
        <button className="btn" onClick={toggleVisibility}>
          Close
        </button>
      </div>
    </div>
  );
}
