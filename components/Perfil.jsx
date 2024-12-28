import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getUsuario } from "../lib/bjj";
import BeltComponent from "./BeltComponent";

const Perfil = (user) => {
  const [usuario, setUsuario] = useState([]); // Estado para almacenar las clases

  // Obtener el nombre de los días de la semana
  useEffect(() => {
    // Fetch inicial para obtener todas las clases
    const fetchUser = async () => {
      const response = await getUsuario(1);
      //console.log(response);
      await setUsuario(response);
    };

    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "http://adriandeharo.es:7001/api/usuario/foto/" + usuario.id,
        }}
      />
      <Text>{usuario.nombre}</Text>
      <Text>{usuario.apellidos}</Text>
      <Text>{usuario.fecha_nacimiento}</Text>
      <Text>{usuario.pais}</Text>
      <Text>{usuario.telefono}</Text>
      <Text>{usuario.cinturon}</Text>
      <Text>{usuario.grado}</Text>
      <BeltComponent
        cinturon={usuario.cinturon}
        grados={usuario.grado}
        id={usuario.id}
        tamano="pequeño"
      />
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
