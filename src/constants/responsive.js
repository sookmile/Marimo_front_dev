import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const FIGMA__WINDOW__WIDTH = 375;
const FIGMA__WINDOW__HEIGHT = 812;

export const widthPercentage = (width) => {
  const percentage = (width / FIGMA__WINDOW__WIDTH) * 100;

  return responsiveWidth(percentage);
};

export const heightPercentage = (height) => {
  const percentage = (height / FIGMA__WINDOW__HEIGHT) * 100;

  return responsiveHeight(percentage);
};

export const fontPercentage = (size) => {
  const percentage = size * 0.125;
  return responsiveFontSize(percentage);
};
