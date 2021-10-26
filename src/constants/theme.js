import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  //base colors
  primary: "#B16CF6", //purple

  // colors
  gray: "#767676",
  bgPurple: "#EDE7F5",
  purple: "#C5A1F3",
  red: "#F66060",
  white: "#FAF9F8",
  darkGray: "#464D46",
  black: "#000000",
  lightGray: "#F1F1F5",
  //gameColor
  plateColor: "#B7DCE8",
  correct: "#48A8C8",
  wrong: "#BFBFBF",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 54,
  h1: 30,
  h2: 22,
  h3: 18,
  h4: 14,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: "Cafe24Ssurround ", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Cafe24Ssurround", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Cafe24Ssurround", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Cafe24Ssurround", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Cafe24Ssurround", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "NotoSansCJKkr-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "NotoSansCJKkr-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "NotoSansCJKkr-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "NotoSansCJKkr-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "NotoSansCJKkr-Regular",

    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
