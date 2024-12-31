import { View, StyleSheet } from "react-native";
import Perfil from "../../components/Perfil";

export default function Index() {
  return (
    <View style={styles.container}>
      <Perfil />
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
