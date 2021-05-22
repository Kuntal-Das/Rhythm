import React, { useContext } from "react";
import "../styles/footer.scss";

import Slider from "./Slider";
import { ReactComponent as PausePlayIcon } from "../svgs/LONG-loading-pause-play.svg";

import { Context } from "../Context";

const Footer = () => {
  const {
    tempo,
    tempoMin,
    tempoMax,
    tempoStep,
    volume,
    volMax,
    volMin,
    volStep,
    handelChange,
    isPlaying,
    isLoading,
    togglePlayState
  } = useContext(Context);
  return (
    <footer className="footer">
      <div className="container grid-footer">
        <div className="silder-container">
          <Slider
            name="tempo"
            unit="bpm"
            step={tempoStep}
            min={tempoMin}
            max={tempoMax}
            value={tempo}
            handelChange={handelChange}
          />
          <Slider
            name="volume"
            // unit=""
            min={volMin}
            max={volMax}
            step={volStep}
            value={volume}
            handelChange={handelChange}
          />
        </div>
        <button
          className="playpause"
          onClick={togglePlayState}
          disabled={isLoading}
        >
          <PausePlayIcon
            viewBox={
              isLoading
                ? "0 0 300 300"
                : isPlaying
                ? "600 0 300 300"
                : "300 0 300 300"
            }
          />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
