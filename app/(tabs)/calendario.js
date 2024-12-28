import { Main } from "../../components/Main";
import { View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
  },
});
