// theme.js

// ✅ Raw values (can be used anywhere)
export const COLORS = {
  primaryTextDark: "#040050",
  primaryText1000: "#04285C",
  textNeutral: "#0B0B17",
  linearGradientPrimary: "#216FB8",
  linearGradientSecondary: "#040050",
  green500: "#42D12A",
  green750: "#169B00",
  blue250: "#5192F5",
  blue500: "#0C64E7",
  neutral100: "#EDEDF6",
  neutral300: "#B7B7CD",
  neutral500: "#787897",
  neutral600: "#65657D",
  neutral900: "#191A31",
  red500: "#E53636",
  yellow500: "#F2CC00",
};

export const FONT_SIZES = {
  s: 16,
  m: 24,
  l: 40,
};

export const FONT_WEIGHTS = {
  regular: "400",
  bold: "600",
};

// ✅ StyleSheet (for components)
import { StyleSheet } from "react-native";

const theme = StyleSheet.create({
  primaryTextDark: {
    color: COLORS.primaryTextDark,
  },
  primaryText1000: {
    color: COLORS.primaryText1000,
  },
  textNeutral: {
    color: COLORS.textNeutral,
  },
  textNeutral900: {
    color: COLORS.neutral900
  },
  textNeutral300: {
    color: COLORS.neutral300
  },
  textNeutral500: {
    color: COLORS.neutral500
  },
  textBlue250: {
    color: COLORS.blue250,
  },
  textBlue500: {
    color: COLORS.blue500
  },
  textNeutral600: {
    color: COLORS.neutral600
  },
  textGreen500: {
    color: COLORS.green500,
  },
  textGreen750: {
    color: COLORS.green750
  },
  textYellow500: {
    color: COLORS.yellow500,
  },
  textRed500: {
    color: COLORS.red500,
  },
  primaryTextSize: {
    fontSize: FONT_SIZES.s,
  },
  blackText: {
    color: COLORS.textNeutral,
  },
  b600: {
    fontWeight: FONT_WEIGHTS.bold,
  },
  b400: {
    fontWeight: FONT_WEIGHTS.regular,
  },
  textCenter: {
    textAlign: "center",
  },
  text12: {
    fontSize: 12,
  },
  text16: {
    fontSize: FONT_SIZES.s,
  },
  text24: {
    fontSize: FONT_SIZES.m,
  },
  text40: {
    fontSize: FONT_SIZES.l,
  },
  row: {
    flexDirection: "row"
  },
  justifyBetween: {
    justifyContent: "space-between"
  },
  justifyAround: {
    justifyContent: "space-around"
  },
  justifyCenter: {
    justifyContent: "center",
  },
  alignItemsCenter: {
    alignItems: "center",
  }
});

export default theme;
