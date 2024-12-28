import { View, StyleSheet, Text } from "react-native";
import Asistencia from "../../components/Asistencias";

export default function Index() {
  return (
    <View style={styles.container}>
      <Asistencia />
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
