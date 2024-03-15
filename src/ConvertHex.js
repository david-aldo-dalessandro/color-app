import React from "react";
import { useState } from "react";

const ConvertHex = (props) => {
  const [hexCoversion, setHexConversion] = useState("");

  /* convertToHex
  This initially clears the hex value, then takes in the current rgb values to convert them
  to hex and then display it to the screen  */
  const convertToHex = () => {
    setHexConversion("");
    let newHex = props.rgbToHex(
      parseFloat(props.outputR),
      parseFloat(props.outputG),
      parseFloat(props.outputB)
    );
    setHexConversion(newHex);
    props.setHex(newHex);
  };
  return (
    <div className="convertHex">
      <input
        type="button"
        className="hexButton"
        value="convert to Hex"
        onClick={convertToHex}
      ></input>
      <label htmlFor="hexButton">{hexCoversion}</label>
    </div>
  );
};

export default ConvertHex;
