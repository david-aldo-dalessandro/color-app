/* CheckRGBToHex
  outputR - Current red value
  outputG - Current green value
  outputB - Current blue value
  colorValue - Actual value that is changing 
  colorName - Name of the color that is being manipulated (R, G, or B)
  rgbToHex - rgbToHex Function to be passed in for conversion, could I have
  just imported it? Sure, but it's JS and I skin the cat however I please.

  A check is performed on the colorName, depending on which RGB value is being
  manipulated will determine how the Hex is calculated. 
  Passed that check, the values are sent to conversion and the complete 
  hex value is returned 
  */

const CheckRGBToHex = (
  outputR,
  outputG,
  outputB,
  colorValue,
  colorName,
  rgbToHex
) => {
  let newHex = "";

  if (colorName === "Red") {
    newHex = rgbToHex(
      parseFloat(colorValue),
      parseFloat(outputG),
      parseFloat(outputB)
    );
  } else if (colorName === "Green") {
    newHex = rgbToHex(
      parseFloat(outputR),
      parseFloat(colorValue),
      parseFloat(outputB)
    );
  } else if (colorName === "Blue") {
    newHex = rgbToHex(
      parseFloat(outputR),
      parseFloat(outputG),
      parseFloat(colorValue)
    );
  }
  return newHex;
};

export default CheckRGBToHex;
