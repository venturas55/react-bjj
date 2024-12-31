import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import BeltComponent from "./BeltComponent";
import useGetFetch from "../hooks/useGetFetch";

const Perfil = () => {
  const { data: usuario } = useGetFetch(
    "http://adriandeharo.es:7001/api/usuario/1",
  );
  console.log(usuario);

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <Text>{usuario.id}</Text>
          <Image
            style={styles.image}
            source={{
              uri: "http://adriandeharo.es:7001/api/usuario/foto/" + usuario.id,
            }}
          />
          <Text>
            {usuario.cinturon} {usuario.grado}
          </Text>
          <BeltComponent
            cinturon={usuario.cinturon}
            grados={usuario.grado}
            id={usuario.id}
            tamano="pequeño"
          />
        </>
      ) : (
        <Text>Recibiendo datos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});

export default Perfil;
