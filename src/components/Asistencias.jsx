import { View, Text, StyleSheet } from "react-native";
import React from "react";
import useUsuario from "../hooks/useUsuario";
import { FlatList } from "react-native-web";

const Asistencias = (user) => {
  const usuario = useUsuario("1");

  return (
    <View style={styles.container}>
      <View style={styles.usuario}>
        {usuario ? (
          <>
            <Text>{usuario.nombre}</Text>
            <Text>{usuario.apellidos}</Text>
            <Text>{usuario.fecha_nacimiento}</Text>
            <Text>{usuario.pais}</Text>
            <Text>{usuario.telefono}</Text>
            <Text>{usuario.cinturon}</Text>
            <Text>{usuario.grado}</Text>
          </>
        ) : (
          <Text>Recibiendo datos</Text>
        )}
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
    backgroundColor: "#dfd",
    alignItems: "center",
    justifyContent: "center",
  },
  usuario: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  asistencias: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Asistencias;
