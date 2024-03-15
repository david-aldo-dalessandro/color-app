import React from "react";

const ColorName = (props) => {
  /* changeColor
    e - the event is what the user enters into the field
    When a user types in a color, or anything for that matter, it is converted to lower case
    and then a find is attempted against the colorData JSON string. 
    If a match is found, then the new rgb, hex, and color name fields are updated. */
  const changeColor = (e) => {
    let value = e.target.value;
    let foundColor = props.colorData.find(
      (color) => color.name.toLowerCase() === value.toLowerCase()
    );
    if (foundColor) {
      props.setOutputR(foundColor.red);
      props.setOutputG(foundColor.green);
      props.setOutputB(foundColor.blue);
      props.setColorName(foundColor.name);
      props.setHex(foundColor.hex);
    }
  };
  return (
    <div className="colorName">
      <input
        type="text"
        placeholder="Enter Color Name"
        onChange={(e) => changeColor(e)}
      ></input>
    </div>
  );
};

export default ColorName;
