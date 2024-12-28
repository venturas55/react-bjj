import { useEffect, useRef } from "react";
import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import theme from "./theme";

const styles = StyleSheet.create({
  appBar: {
    flexDirection: "row",
    height: 40,
    backgroundColor: theme.appBar.primary,
    paddingBottom: Constants.statusBarHeight + 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  text: {
    color: theme.appBar.textPrimary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.appBar}>
      <Link href="/">Home</Link>
      <Link href="/clases/2455">Clase 2455</Link>
      <Link href="/login">LogIn</Link>
    </View>
  );
};

export default AppBar;
