import React from "react";
import { useState } from "react";

const ColorWord = (props) => {
  const [red, setRed] = useState("");
  const [green, setGreen] = useState("");
  const [blue, setBlue] = useState("");
  const [hexValue, setHexValue] = useState("");

  let regEx = /[g-zG-Z]/g;

  /* hexToRgb
  hex - the hex value to be converted to rgb 
  Sets a result variable to a regEx that splits the input string into corresponding 
  sets of hex values to be translated to decimals. 
  Then the results are parsed from hex to decimal and returned. If they are not
  hex values at all, which wouldn't even reach the function, then they
  return null anyway.
  */
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    console.log(result);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  /* convert
  e - target of the input field
  The function checks that the string entered is at least 7 characters long, and 
  that the string contains a leading '#'. Most importantly for input handling, it 
  ensures that the characters entered are within the range of a-f.  
  Sets each rgb value to the converted hex values.*/
  const convert = (e) => {
    let value = e.target.value;
    if (value.length === 7 && value[0] === "#" && !regEx.test(value)) {
      if (hexToRgb(value).r !== null) {
        console.log(hexToRgb(value).r);
        setRed(hexToRgb(value).r);
      }
      if (hexToRgb(value).g !== null) {
        setGreen(hexToRgb(value).g);
      }
      if (hexToRgb(value).b !== null) {
        setBlue(hexToRgb(value).b);
      }
      setHexValue(value);
    }
  };

  /* setColor
  Actually sets the color from the above conversions */
  const setColor = () => {
    if (red !== "" || blue !== "" || green !== "") {
      props.setOutputR(red);
      props.setOutputG(green);
      props.setOutputB(blue);
      props.setHex(hexValue);
    }
  };

  return (
    <div className="colorWord">
      <input type="text" onChange={(e) => convert(e)}></input>
      <input
        type="button"
        className="hexButton"
        value="Submit Hex Value"
        onClick={setColor}
      ></input>
    </div>
  );
};

export default ColorWord;
