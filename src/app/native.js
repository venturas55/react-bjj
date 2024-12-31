import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, StyleSheet } from "react-native";
import Native from "../pages/native";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Native />
        <Text className="text-grey100">Hola</Text>
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
