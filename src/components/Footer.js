import React, { useContext } from "react";
import "../styles/footer.scss";

import Slider from "./Slider";

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
        <button
          className="playpause"
          onClick={togglePlayState}
          disabled={isLoading}
        >
          {isLoading ? "Loading" : isPlaying ? `Pause` : `Play`}
        </button>
      </div>
    </footer>
  );
};

export default Footer;
