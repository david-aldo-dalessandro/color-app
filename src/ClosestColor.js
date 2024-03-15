import React from "react";
import { useState } from "react";

const ClosestColor = (props) => {
  const [currR, setCurrR] = useState("");
  const [currG, setCurrG] = useState("");
  const [currB, setCurrB] = useState("");
  const [currHex, setCurrHex] = useState("");

  let closestColor = "";
  let distantColors = [];
  let colorDistances = [];

  /* distance3D 
  x,y,z - r,g,b values of color 1(the displayed color) and color 2(the 
    color to compare the distant to) 
   This function calculates the distance between two points in 3D space. While not
   a perfect solution to color comparison, the reduced accuracy isn't very perceptible to
   the human eye*/
  const distance3D = (x1, y1, z1, x2, y2, z2) => {
    return Math.sqrt(
      (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2)
    );
  };

  /* distantColor 
  object - color object from the colors.json file
  distance - value calculated from distance 3D
  Creates an object to store a color object and its corresponding
  distance from the current color that is being displayed on the output*/
  function distantColor(object, distance) {
    this.object = object;
    this.distance = distance;
  }

  if (props.colorData.length > 0) {
    //Create an array of colors with the present color removed, if it happens
    //to be in the colors.json file
    let remainingColors = props.colorData.filter(
      (color) => color.name !== props.colorName
    );

    /* loops over the entire array of existing colors and compares the 
    original displayed color to each one, calculating the distance between them.
    When the comparison is finished, the color and its distance from the displayed 
    color is stored in a new array. */
    if (remainingColors) {
      for (let i = 0; i < remainingColors.length; i++) {
        let x1 = props.outputR;
        let y1 = props.outputG;
        let z1 = props.outputB;
        let x2 = remainingColors[i].red;
        let y2 = remainingColors[i].green;
        let z2 = remainingColors[i].blue;

        let difference = distance3D(x1, y1, z1, x2, y2, z2);
        colorDistances.push(difference);
        distantColors.push(new distantColor(remainingColors[i], difference));
      }

      //finds the minimum of all the color distances
      let min = Math.min(...colorDistances);

      //finds the color with the minimum distance from above and sets it to
      //closestColor, which is then used for the display beneath the main box output
      closestColor = distantColors.filter((color) => color.distance === min)[0]
        .object;
    }
  }

  /* enter 
  This function occurs when the user mouses over the closest color output field
  all the current rgb values of the color currently displayed in the main box are 
  saved to a state in this component. 
  The main box is then updated to the closest color rgb values and hex value. */
  const enter = () => {
    setCurrR(props.outputR);
    setCurrG(props.outputG);
    setCurrB(props.outputB);
    setCurrHex(props.hex);
    props.setOutputR(closestColor.red);
    props.setOutputG(closestColor.green);
    props.setOutputB(closestColor.blue);
    props.setHex(closestColor.hex);
  };

  /* exit
  This occurs when the users mouses away from the closest color output field
  and uses what was set in 'enter' to reset the main box to its original rgb and 
  hex values */
  const exit = () => {
    props.setOutputR(currR);
    props.setOutputG(currG);
    props.setOutputB(currB);
    props.setHex(currHex);
  };

  /* replace 
  When a user mouses over the closest color, and decides to click it, this function
  is fired. It sets the main box rgb, hex, and color name values to that of the closest 
  color the user original hovered over. Once this occurs, a new closest color is found,
   */
  const replace = () => {
    setCurrR(props.outputR);
    setCurrG(props.outputG);
    setCurrB(props.outputB);
    setCurrHex(props.hex);
    props.setOutputR(closestColor.red);
    props.setOutputG(closestColor.green);
    props.setOutputB(closestColor.blue);
    props.setHex(closestColor.hex);
    props.setColorName(closestColor.name);
  };

  return (
    <div>
      ClosestColor
      <br />
      <input
        className="closestColor"
        type="field"
        value={closestColor.name}
        readOnly
        style={{ background: `${closestColor.name}`, textAlign: "center" }}
        onMouseEnter={enter}
        onMouseLeave={exit}
        onClick={replace}
      ></input>
    </div>
  );
};

export default ClosestColor;
