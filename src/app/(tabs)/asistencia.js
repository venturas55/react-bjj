import { View, StyleSheet } from "react-native";
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
    margin: 1,
  },
});
