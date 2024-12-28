import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import Login from "../pages/Login";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Login />
      </View>
    </SafeAreaProvider>
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
