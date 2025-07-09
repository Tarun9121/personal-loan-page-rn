import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import LinearGradient from "react-native-linear-gradient";
import theme from "../styles/theme";

export default function GradientProgressSlider({
  primaryColor,
  secondaryColor,
  step,
  max,
  min,
  value,
  onValueChange,
  minText,
  maxText,
  showVal = false,
}) {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const [currentValue, setCurrentValue] = useState(value);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, []);

  const sliderWidth = dimensions.width - 48;
  const thumbSize = 36;
  const thumbImageSize = 28;

  const normalized = max === min ? 0 : (currentValue - min) / (max - min);
  const gradientWidth = normalized * (sliderWidth - thumbSize) + thumbSize / 2;
  const thumbPosition = normalized * (sliderWidth - thumbSize);

  return (
    <View style={styles.outerContainer}>
      {/* Main Container */}
      <View style={styles.container}>
        {/* Track Background */}
        <View style={[styles.trackContainer, { width: sliderWidth }]}>
          <LinearGradient
            colors={[primaryColor, secondaryColor]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.trackFilled, { width: gradientWidth }]}
          />
          <View
            style={[
              styles.trackRemaining,
              { width: sliderWidth - gradientWidth },
            ]}
          />
        </View>

        {/* Floating Value While Sliding */}
        {showVal && isSliding && (
          <View style={[styles.valueContainer, { left: thumbPosition }]}>
            <View style={styles.valueBubble}>
              <Text style={styles.valueText}>{currentValue}</Text>
            </View>
          </View>
        )}

        {/* Hidden Native Slider */}
        <Slider
          style={[styles.slider, { width: sliderWidth }]}
          minimumValue={min}
          maximumValue={max}
          value={currentValue}
          step={step || 1}
          onValueChange={(val) => {
            setCurrentValue(val);
            onValueChange(val);
          }}
          onSlidingStart={() => setIsSliding(true)}
          onSlidingComplete={() => setIsSliding(false)}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="transparent"
        />

        {/* Custom Thumb Icon */}
        <View
          style={[
            styles.customThumb,
            {
              left: thumbPosition,
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
            },
          ]}
        >
          <Image
            source={require("../assets/instaPe.png")}
            style={{
              width: thumbImageSize,
              height: thumbImageSize,
              borderRadius: thumbImageSize / 2,
            }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Min and Max Labels */}
      <View style={styles.minMaxContainer}>
        <Text style={[theme.primaryTextSize, theme.textNeutral, styles.labelText]}>{minText}</Text>
        <Text style={[theme.primaryTextSize, theme.textNeutral, styles.labelText]}>{maxText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 12,
  },
  container: {
    paddingHorizontal: 24,
    alignItems: "center",
    paddingBottom: 4,
    height: 60,
    justifyContent: 'center',
  },
  trackContainer: {
    position: "absolute",
    top: '50%',
    marginTop: -4,
    height: 8,
    borderRadius: 20,
    flexDirection: "row",
    overflow: "hidden",
    zIndex: -1,
  },
  trackFilled: {
    height: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  trackRemaining: {
    height: 8,
    backgroundColor: "#D8D8E0",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  slider: {
    height: 48,
    marginTop: Platform.OS === 'ios' ? 0 : -4,
  },
  customThumb: {
    position: "absolute",
    top: '50%',
    marginTop: -18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#42BFE0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
    zIndex: 1,
    pointerEvents: "none",
  },
  valueContainer: {
    position: "absolute",
    top: -24, // Adjusted to appear above the thumb
    left: 0,
    width: 48,
    alignItems: "center",
    zIndex: 2, // Ensure it appears above the thumb
    marginLeft: -24, // Center the value bubble over the thumb
  },
  valueBubble: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  valueText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  minMaxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  labelText: {
    opacity: 0.8,
  },
});