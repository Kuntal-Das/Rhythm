import React, { useContext } from "react";
import "../styles/footer.scss";

import Slider from "./Slider";

import { Context } from "../Context";

const Footer = () => {
  const {
    tempo,
    volume,
    handelChange,
    isPlaying,
    togglePlayState
  } = useContext(Context);
  const tempoSTEP = 1,
    tempoMAX = 200;
  return (
    <footer className="footer">
      <div className="container flex-spacebetween">
        <Slider
          name="tempo"
          unit="bpm"
          step={tempoSTEP}
          max={tempoMAX}
          value={tempo}
          handelChange={handelChange}
        />
        <button className="playpause" onClick={togglePlayState}>
          {isPlaying ? `Pause` : `Play`}
        </button>
        <Slider name="volume" value={volume} handelChange={handelChange} />
      </div>
    </footer>
  );
};

export default Footer;
