import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "../components/Main";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Main />
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
