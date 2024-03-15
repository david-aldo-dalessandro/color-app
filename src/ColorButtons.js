import React from "react";

const ColorButtons = (props) => {
  /* setOutput 
    Sets the outputR/G/B to the corresponding colorData values sent in 
    as props from the mapping of colorData. 
    The color name is also set to display under the main output box, as 
    is the hex value which bot come right from the colorData object*/
  const setOutput = () => {
    props.setOutputR(props.colorData.red);
    props.setOutputG(props.colorData.green);
    props.setOutputB(props.colorData.blue);
    props.setColorName(props.colorData.name);
    props.setHex(props.colorData.hex);
  };
  return (
    <div className="colorButtons">
      <input
        type="button"
        className="colorButton"
        value={props.colorData.name}
        onClick={setOutput}
        style={{ backgroundColor: props.colorData.name }}
      ></input>
    </div>
  );
};

export default ColorButtons;
