import React from "react";
import PropTypes from "prop-types";
import "../styles/slider.scss";

const Slider = (props) => (
  <div className="slider">
    <label htmlFor={`${props.name}Slider`} className="name">
      {props.name}
    </label>
    <input
      id={`${props.name}Slider`}
      type="range"
      className="input-slider"
      name={props.name}
      min={props.min}
      max={props.max}
      step={props.step}
      value={props.value}
      onChange={props.handelChange}
    />
    <label className="reading">{`${props.value} ${props.unit}`}</label>
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
  step: 5,
  unit: "%"
};
export default Slider;
