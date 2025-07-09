import { StyleSheet, Text, View } from "react-native";

export default function ScreenTitle({ icon, title }) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  icon: {
    // marginRight: 8,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: 'center',
    fontWeight: "600",
    fontSize: 20,
    color: "#000",
  },
});