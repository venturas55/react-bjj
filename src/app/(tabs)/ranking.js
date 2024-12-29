import { View, StyleSheet, Text } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Ranking</Text>
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
