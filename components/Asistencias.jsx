import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { getUsuario } from "../lib/bjj";

const Asistencias = (user) => {
  const [usuario, setUsuario] = useState([]); // Estado para almacenar las clases

  // Obtener el nombre de los días de la semana
  useEffect(() => {
    // Fetch inicial para obtener todas las clases
    const fetchUser = async () => {
      const response = await getUsuario(1);
      console.log(response);
      await setUsuario(response);
    };

    fetchUser();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.usuario}>
        <Text>{usuario.nombre}</Text>
        <Text>{usuario.apellidos}</Text>
        <Text>{usuario.fecha_nacimiento}</Text>
        <Text>{usuario.pais}</Text>
        <Text>{usuario.telefono}</Text>
        <Text>{usuario.cinturon}</Text>
        <Text>{usuario.grado}</Text>
      </View>
      <View style={styles.asistencias}>
        {usuario?.asistencias?.length > 0 ? (
          usuario.asistencias.map((asistencia, index) => (
            <View key={index} style={styles.asistencia}>
              <Text>{asistencia.asistencia_id}</Text>
            </View>
          ))
        ) : (
          <Text>No hay asistencias</Text>
        )}
      </View>
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
  usuario: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  asistencias: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Asistencias;
