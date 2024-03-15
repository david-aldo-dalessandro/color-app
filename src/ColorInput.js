import React from "react";
import CheckRGBToHex from "./Content/CheckRGBToHex";

const ColorInput = (props) => {
  let colorValue;

  /* slideChange
  e - target of the field changing
   Checks if the entered value is larger or smaller than 255 or if its blank
   Passed these checks it simply sets the output as the color value from the target.
   Sets the hex as well using a utility function, and clears out the color name.*/
  const slideChange = (e) => {
    colorValue = e.target.value;
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

    props.setOutput(colorValue);
    props.setHex(
      CheckRGBToHex(
        props.outputR,
        props.outputG,
        props.outputB,
        colorValue,
        props.name,
        props.rgbToHex
      )
    );
    props.setColorName(" ");
  };

  /* increaseValue
  This function handles the '+' button to the right of the entry field. 
  Each press of the button increments the output, which is then reflected in an
  update to the field.  */
  const increaseValue = () => {
    colorValue = document.querySelector(".input").value;
    if (props.output < 255) {
      props.setHex(
        CheckRGBToHex(
          props.outputR,
          props.outputG,
          props.outputB,
          props.output + 1,
          props.name,
          props.rgbToHex
        )
      );
      props.setOutput(parseFloat(props.output) + 1);

      props.setColorName(" ");
    }
  };

  /* decreaseValue
  Does the same thing as increaseValue but as a decrement function for the
  '-' button. */
  const decreaseValue = () => {
    colorValue = document.querySelector(".input").value;
    if (props.output > 0) {
      props.setOutput(props.output - 1);
      props.setHex(
        CheckRGBToHex(
          props.outputR,
          props.outputG,
          props.outputB,
          props.output - 1,
          props.name,
          props.rgbToHex
        )
      );
      props.setColorName(" ");
    }
  };

  return (
    <div className="colorInputs">
      <input type="button" value="-" onClick={decreaseValue}></input>
      <input
        type="text"
        placeholder="0"
        onChange={(e) => slideChange(e)}
        className="input"
        variety="colorInput"
        value={props.output}
      ></input>
      <input type="button" value="+" onClick={increaseValue}></input>
      <label htmlFor="input">{props.name} </label>
    </div>
  );
};

export default ColorInput;
