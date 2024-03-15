import React from "react";
import { useState } from "react";
import ColorButtons from "./ColorButtons";
import SlideChange from "./SlideChange";
import ColorInput from "./ColorInput";
import ColorWord from "./ColorWord";
import ConvertHex from "./ConvertHex";
import ColorName from "./ColorName";
import ClosestColor from "./ClosestColor";
import LazyParser from "./LazyParser";
const colorData = require("./Content/colors.json");

const MainBox = () => {
  /* randomColorVal
  returns a random number from 0 to 255 for the 
  random color when the app refreshes
  */
  const randomColorVal = () => {
    return Math.floor(Math.random() * 255);
  };

  /* componentToHex
  c - an integer intended between 0 and 255
  converts an one r,g, or b value to its hexadecimal equivalent 
  */
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  /*rgbToHex
  r,g, and b - red, green and blue values to convert to hex
  takes in all three rgb values, converts each to its respective hex
  value. Then returns the a hex string with the '#' appended to the front
  */
  const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  };

  /* state variables
  outputR/G/B - Red, Green, and Blue values to be used for coloring the output field
  and to display the numbers for the complete (r,g,b) value
  colorName - The plain text name of the color to display on the output field
  hex - The hexadecimal value to display next to the rgb values on the output 
  */
  const [outputR, setOutputR] = useState(randomColorVal);
  const [outputG, setOutputG] = useState(randomColorVal);
  const [outputB, setOutputB] = useState(randomColorVal);
  const [colorName, setColorName] = useState("");
  const [hex, setHex] = useState(rgbToHex(outputR, outputG, outputB));

  /* renderColorButtons
  if there is colorData (the JSON object of colors), then the function maps each entry 
  of that collection to a <ColorButtons> instance. Responsible for generating all the 
  color coordinated buttons at the bottom of the app
  */
  const renderColorButtons = () => {
    if (colorData.length > 0) {
      return colorData.map((color) => (
        <ColorButtons
          key={color.id}
          colorData={color}
          setOutputR={setOutputR}
          setOutputG={setOutputG}
          setOutputB={setOutputB}
          setColorName={setColorName}
          setHex={setHex}
        />
      ));
    }
  };

  return (
    /*MainBox
    responsible for displaying the color, rgb values and hex value
    */
    <div className="MainBox">
      <input
        type="text"
        className="outputField"
        readOnly
        style={{
          background: `rgb(${outputR}, ${outputG}, ${outputB})`,
        }}
        value={`rgb(${outputR}, ${outputG}, ${outputB}) ${hex}`}
      />
      <p> Color Name: {colorName} </p>

      {/* LazyParser is responsible for taking color information line for line
        from https://htmlcolorcodes.com/color-names/ and converting it, either
        as one entry or a group of entries, to JSON for the colors.json file */}
      {/* <LazyParser colorData={colorData} /> */}

      {/* closestColor 
         Finds the closes color to what is currently displayed on the output*/}
      <div className="closestColor">
        {" "}
        <ClosestColor
          colorName={colorName}
          setColorName={setColorName}
          colorData={colorData}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setOutputR={setOutputR}
          setOutputG={setOutputG}
          setOutputB={setOutputB}
          hex={hex}
          setHex={setHex}
        />
      </div>
      {/* colorName
       Accepts plain text and if the text entered matched one of the colors in the 
       colors.json file, it will display the rgb, hex, and change the output to 
       the color*/}
      <div className="colorName">
        <ColorName
          setColorName={setColorName}
          colorData={colorData}
          setOutputR={setOutputR}
          setOutputG={setOutputG}
          setOutputB={setOutputB}
          setHex={setHex}
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
        />
      </div>

      {/* ConvertHex
       This represents a button that will take in the currently displayed rgb value
       from the output and convert it to its corresponding hex value and display that 
       next to the rgb on the output*/}
      {/*       
      <div className="hex">
        <ConvertHex
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setHex={setHex}
        />
      </div> */}

      {/* ColorWord 
      While slightly deceiving in name, ColorWord is a field that accepts plain text, 
      however it expects a hex value (with a leading '#') and when given one, it 
      will display the corresponding color on the output as well as the equivalent
      rgb values*/}
      <div className="colorWord">
        <ColorWord
          setOutputR={setOutputR}
          setOutputG={setOutputG}
          setOutputB={setOutputB}
          setHex={setHex}
        />
      </div>
      {/* colorSliders 
      The sliders are an input of type range. As the user drags the slider from its
      minimum to maximum positions, the corresponding red, green, or blue value in the 
      output changes. The color of the output field is changed, the value of the red, green,
      or blue value on the output changes, and following instances of color inputs change 
      in value as well*/}
      <div className="colorSliders">
        <SlideChange
          output={outputR}
          setOutput={setOutputR}
          setHex={setHex}
          colorName="Red"
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setColorName={setColorName}
        />
        <SlideChange
          output={outputG}
          setOutput={setOutputG}
          setHex={setHex}
          colorName="Green"
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setColorName={setColorName}
        />
        <SlideChange
          output={outputB}
          setOutput={setOutputB}
          setHex={setHex}
          colorName="Blue"
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setColorName={setColorName}
        />
      </div>
      {/* colorInput 
      This is an input field that expects plain text numbers. When a value between 0 and
      255 is entered, the corresponding r,g, or b value of the color displayed and of the text
      on the display of teh rgb value changes as well. These react to the sliders, and the sliders
      also react to volor inputs as they change. Buttons are included to increment and 
      decrement the values by 1. Although the change is nearly imperceptible, greater 
      control is granted from the buttons over the sliders.*/}
      <div className="colorInput">
        <ColorInput
          output={outputR}
          setOutput={setOutputR}
          setHex={setHex}
          name="Red"
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setColorName={setColorName}
        />
        <ColorInput
          output={outputG}
          setOutput={setOutputG}
          setHex={setHex}
          name="Green"
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setColorName={setColorName}
        />
        <ColorInput
          output={outputB}
          setOutput={setOutputB}
          setHex={setHex}
          name="Blue"
          componentToHex={componentToHex}
          rgbToHex={rgbToHex}
          outputR={outputR}
          outputG={outputG}
          outputB={outputB}
          setColorName={setColorName}
        />
      </div>
      <div className="colorButtons">{renderColorButtons()}</div>
    </div>
  );
};

export default MainBox;
