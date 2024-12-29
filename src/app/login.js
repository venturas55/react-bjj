import { View, StyleSheet } from "react-native";
import Login from "../pages/Login";

export default function Index() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
  },
});
