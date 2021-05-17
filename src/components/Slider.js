import React from "react";
import PropTypes from "prop-types";
import "../styles/slider.scss";

const Slider = (props) => (
  <div className="slider">
    <span className="name">{props.name}</span>
    <input
      type="range"
      className="slider-input"
      name={props.name}
      min={props.min}
      step={props.step}
      // value={props.value}
    />
    <span className="reading">{props.value}</span>
  </div>
);
Slider.propTypes = {
  name: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  value: PropTypes.number,
  step: PropTypes.number
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  step: 5
};
export default Slider;
