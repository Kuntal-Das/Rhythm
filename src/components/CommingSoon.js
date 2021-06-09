import React from "react";

export default function CommingSoon({
  name = "",
  visible = false,
  toggleVisibility
}) {
  const containerDivStyle = {
    position: "fixed",
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "none",
    placeContent: "center",
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

  const btnStyle = {
    padding: "0.75em 2.5em",
    fontSize: "1rem",
    fontWeight: 800,
    fontFamily: "inherit",
    color: "var(--clr-accent)"
  };

  if (visible) {
    containerDivStyle.display = "grid";
    containerDivStyle.opacity = 1;
  } else {
    containerDivStyle.opacity = 0;
    setTimeout(() => (containerDivStyle.display = "none"), 200);
  }

  return (
    <div style={containerDivStyle}>
      <div style={innerDivStyle}>
        <h3 style={h3Style}>
          Feature:"{name}" is Under Development
          <span role="img" aria-label="under development">
            🔨🛠⚒
          </span>{" "}
        </h3>
        <button style={btnStyle} onClick={toggleVisibility}>
          Close
        </button>
      </div>
    </div>
  );
}
