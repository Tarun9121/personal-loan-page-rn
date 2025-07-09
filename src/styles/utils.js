// theme/utils.js
import { StyleSheet } from "react-native";
import { FONT_SIZES, FONT_WEIGHTS, COLORS } from "./theme";

export const dynamicStyles = {
  p: (value) => ({ padding: value }),
  pt: (value) => ({paddingTop: value}),
  pb: (value) => ({paddingBottom: value}),
  px: (value) => ({ paddingHorizontal: value }),
  py: (value) => ({ paddingVertical: value }),
  m: (value) => ({ margin: value }),
  mx: (value) => ({marginHorizontal: value}),
  mb: (value) => ({marginBottom: value}),
  mt: (value) => ({marginTop: value}),
  my: (value) => ({marginVertical: value}),
  gap: (value) => ({gap: value}),
  fontSize: (size) => ({ fontSize: size }),
  fontWeight: (weight) => ({ fontWeight: weight }),
  color: (colorKey) => ({ color: COLORS[colorKey] || colorKey }),
  bg: (colorKey) => ({backgroundColor: COLORS[colorKey] || colorKey}),
  radius: (value) => ({borderRadius: value}),
};
