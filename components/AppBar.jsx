import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Constants from "expo-constants";
import theme from "./theme";

const styles = StyleSheet.create({
  appBar: {
    height: 40,
    backgroundColor: theme.appBar.primary,
    paddingTop: Constants.statusBarHeight + 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.appBar.textPrimary,
  },
});

const AppBar = () => {
  return (
    <View>
      <Text style={styles.appBar}>AppBar</Text>
    </View>
  );
};

export default AppBar;
