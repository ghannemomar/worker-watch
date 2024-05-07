import React from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const activeColor = "#24a69a";
const inActiveColor = "#bab3ad";
export default function SwitchComponent({ toggleActive, setToggle }) {
  return (
    <View
      style={[
        styles.container,
        { borderColor: toggleActive ? activeColor : inActiveColor },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.toggleContainer,
          { borderColor: toggleActive ? activeColor : inActiveColor },
        ]}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setToggle(!toggleActive);
        }}
        activeOpacity={1}
      >
        <View
          style={[
            styles.toggleBtn,
            toggleActive
              ? { backgroundColor: activeColor, alignSelf: "flex-end" }
              : { backgroundColor: inActiveColor },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", flex: 1, alignItems: "center" },
  toggleContainer: {
    height: 22,
    width: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  toggleBtn: { height: "100%", width: "50%" },
});