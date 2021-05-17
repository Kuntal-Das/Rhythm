import React from "react"
import "../styles/footer.scss"

import Slider from "./Slider"

const Footer = () => (
  <footer className="footer">
    <div className="container flex-spacebetween">
      <Slider name="Tempo"/>
      <button className="playpause">Play</button>
      <Slider name="Volume"/>
    </div>
  </footer>
)

export default Footer