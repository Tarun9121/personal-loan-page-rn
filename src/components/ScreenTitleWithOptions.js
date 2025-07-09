import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useState } from "react";

export default function ScreenTitleWithOptions({
  backButton,
  onBackButtonPress = () => {},
  title = "",
  options = false,
  optionButtons = [],
}) {
  const [isOptionsPressed, setIsOptionsPressed] = useState(false);

  const toggleOptions = () => setIsOptionsPressed((prev) => !prev);
  const handleOptionPress = (onPress) => {
    if (onPress) onPress();
    setIsOptionsPressed(false);
  };

  return (
    <View style={styles.wrapper}>
      {/* Header Container */}
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.sideIcon} onPress={onBackButtonPress}>
          {backButton}
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Options Button */}
        {options ? (
          <TouchableOpacity 
            style={styles.sideIcon} 
            onPress={toggleOptions}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
          >
            <Entypo name="dots-three-vertical" size={24} color="#000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideIcon} />
        )}
      </View>

      {/* Dropdown Options - Positioned outside the header container */}
      {isOptionsPressed && optionButtons.length > 0 && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownCard}>
            {optionButtons.map(({ label, icon, onPress }, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => handleOptionPress(onPress)}
                >
                  <View style={styles.optionContent}>
                    {icon && <View style={styles.optionIcon}>{icon}</View>}
                    <Text style={styles.optionText}>{label}</Text>
                  </View>
                </TouchableOpacity>
                {index !== optionButtons.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 1000,
    elevation: 1000, // For Android
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    position: 'relative',
  },
  sideIcon: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
    color: "#000",
    zIndex: 0,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 70, // Adjust based on your header height
    right: 20,
    zIndex: 1001,
    elevation: 1001,
  },
  dropdownCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    paddingVertical: 5,
    width: 180,
    marginTop: 5, // Small gap from header
    zIndex: 10,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
});