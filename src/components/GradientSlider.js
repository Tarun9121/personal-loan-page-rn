import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";

export default function GradientSlider({primaryColor, secondaryColor, min, max, value, onValueChange}) {

  return (
    <View style={styles.container}>

      {/* Gradient Track Background */}
      <LinearGradient
        colors={[primaryColor, secondaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientTrack}
      >
        <Slider
          style={styles.slider}
          minimumValue={min}
          maximumValue={max}
          value={value}
          onValueChange={(val) => onValueChange(val)}
          minimumTrackTintColor="transparent" // Because gradient is already used
          maximumTrackTintColor="transparent"
          thumbImage={require("../assets/whiteImage.jpeg")} // custom thumb image path
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  valueText: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  gradientTrack: {
    height: 40,
    justifyContent: "center",
    borderRadius: 20,
  },
  slider: {
    width: "100%",
    height: 10,
  },
});
