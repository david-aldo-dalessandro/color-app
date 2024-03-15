import React from "react";
import CheckRGBToHex from "./Content/CheckRGBToHex";

const SlideChange = (props) => {
  /* slideChange
    e - the target of the changing range input
    As the user slides the slider up and down, the value is checked to ensure 
    it is within the range of the slider. 
    Passed this check, the color value is set, as is the hex and color name. */
  const slideChange = (e) => {
    let colorValue = e.target.value;

    if (colorValue > 255) {
      colorValue = 255;
    } else if (
      colorValue < 0 ||
      colorValue === "" ||
      colorValue === " " ||
      isNaN(colorValue)
    ) {
      colorValue = 0;
    }

    props.setHex(
      CheckRGBToHex(
        props.outputR,
        props.outputG,
        props.outputB,
        colorValue,
        props.colorName,
        props.rgbToHex
      )
    );

    props.setColorName("");
    props.setOutput(colorValue);
  };

  return (
    <div className="colorSliders">
      <input
        type="range"
        min="0"
        max="255"
        value={props.output}
        id="myRange"
        onChange={(e) => slideChange(e)}
        className="slider"
      ></input>
      <label htmlFor="slider">{props.colorName} </label>
    </div>
  );
};

export default SlideChange;
