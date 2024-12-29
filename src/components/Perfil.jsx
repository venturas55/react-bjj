import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import BeltComponent from "./BeltComponent";
import useUsuario from "../hooks/useUsuario";

const Perfil = ({ user }) => {
  const usuario = useUsuario(1);
  console.log(usuario);

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <Image
            style={styles.image}
            source={{
              uri: "http://adriandeharo.es:7001/api/usuario/foto/" + usuario.id,
            }}
          />
          <Text>{usuario.nombre}</Text>
          <Text>{usuario.apellidos}</Text>
          <Text>{usuario.pais}</Text>
          <Text>{usuario.fecha_nacimiento}</Text>
          <Text>{usuario.pais}</Text>
          <Text>{usuario.genero}</Text>
          <Text>{usuario.codigo_iso}</Text>
          <Text>
            {usuario.pais_telefono} {usuario.telefono}
          </Text>
          <Text>{usuario.cinturon}</Text>
          <Text>{usuario.grado}</Text>
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
