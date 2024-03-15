import React from "react";
import { useState } from "react";

/* LazyParser - This is complicated and I hate that I made this, but it works
This was built to work with exclusively with  https://htmlcolorcodes.com/color-names/
This takes in colorData, the JSON file that holds all the color objects and checks
to see the color with the highest 'id' value. 
It proceeds to fire parseInput on the string that was entered providing it
passes the checks.
What is returned is the color information entered, but in a way to just copy and 
paste it into the colors.json file as one entry or the whole thing.
*/
const LazyParser = (props) => {
  const [output, setOutput] = useState("");
  let highestKey = "";

  let inputArray = [];
  let outputString = "";
  if (props.colorData.length > 0) {
    highestKey = props.colorData[props.colorData.length - 1].id;
  } else {
    highestKey = 0;
  }

  /* parseInput
  e - target event of the input field
  This function first splits the string by white space. Based on the websites format, this
  breaks the total string into groups of three similar pieces of information that represent
  one line of color information. This loop increments in three, and saves the related
  pieces of information as single entries of a new array.

  The next loop goes over the groupings( which are now identical to a normal line of color info)
  and splits the entry by tabs. This produces a name, a hex value, and a combination of rgb values. 
  The rgb values are further split by commas and saved into their own array. 

  Finally the complete string is created using the values and appropriate field names for the
  json string it will become. 
   */
  const parseInput = (e) => {
    let input = e.target.value;
    if (input.length > 2) {
      for (let i = 0; i < input.split(" ").length - 2; i += 3) {
        inputArray.push(
          input.split(" ")[i] +
            input.split(" ")[i + 1] +
            input.split(" ")[i + 2]
        );
      }
    }

    if (input.length > 2 && input.trim().length !== 0) {
      for (let j = 0; j < inputArray.length; j++) {
        let splitInput = inputArray[j].split("\t");
        let splitRGB = splitInput[2]
          .substring(4, splitInput[2].length - 1)
          .split(",");
        /*         console.log(
          `{"id": ${highestKey + j}, "name" : "${splitInput[0]}", "hex": "${
            splitInput[1]
          }" ,"red": ${splitRGB[0]}, "green": ${splitRGB[1]}, "blue": ${
            splitRGB[2]
          }},`
        ); */
        outputString =
          outputString +
          `{"id": ${highestKey + j}, "name" : "${splitInput[0]}", "hex": "${
            splitInput[1]
          }" ,"red": ${splitRGB[0]}, "green": ${splitRGB[1]}, "blue": ${
            splitRGB[2]
          }},`;
      }
      setOutput(outputString);
    }
  };

  return (
    <div>
      LazyParser <input type="text" onChange={(e) => parseInput(e)}></input>{" "}
      <br />
      <input readOnly type="text" value={output}></input>
    </div>
  );
};

export default LazyParser;
