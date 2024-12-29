import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import useUsuario from "../hooks/useUsuario";
import AsistenciaItem from "./AsistenciaItem";
import { format } from "date-fns";

const Asistencias = (user) => {
  const usuario = useUsuario("1");

  return (
    <View style={styles.container}>
      <View style={styles.usuario}>
        {usuario ? (
          <>
            <Text>
              {usuario.nombre} {usuario.apellidos}
            </Text>
            <Text></Text>
            <Text>
              Nacimiento:
              {format(new Date(usuario.fecha_nacimiento), " dd/MM/yyyy")}
            </Text>
            <Text>{usuario.pais}</Text>
            <Text>{usuario.telefono}</Text>
            <Text>{usuario.cinturon}</Text>
            <Text>{usuario.grado}</Text>
          </>
        ) : (
          <Text>Recibiendo datos</Text>
        )}
      </View>

      <FlatList
        data={usuario?.asistencias}
        keyExtractor={(item) => item.asistencia_id.toString()}
        renderItem={({ item, index }) => (
          <AsistenciaItem asistencia={item} index={index} />
        )}
        ListEmptyComponent={
          <Text style={styles.noClassesText}>No hay clases para este día</Text>
        }
        style={styles.asistencias}
      />
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
    paddingVertical: 16,
  },
  asistencias: {
    flex: 1,
  },
});

export default Asistencias;
