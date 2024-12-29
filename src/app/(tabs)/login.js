import { View, StyleSheet } from "react-native";
import Login from "./../../pages/Login";

export default function Index() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#898",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
    padding: 20,
  },
});
