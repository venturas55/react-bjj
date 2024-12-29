import { Text, View, StyleSheet } from "react-native";
import Perfil from "../../components/Perfil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  return (
    <View style={styles.container}>
      {async () => {
        const user = await AsyncStorage.getItem("user").json();
        user ? (
          <>
            <Text> Usuario{user.usuario} </Text>;
            <Perfil user={{ user }} />;
          </>
        ) : (
          <Text>Recibiendo datos</Text>
        );
      }}
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
