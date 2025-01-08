import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import getFetch from "../hooks/getFetch";
import AsistenciaItem from "./AsistenciaItem";
import { format } from "date-fns";
import BeltComponent from "./BeltComponent";

const Asistencias = (user) => {
  const usuario = getFetch("http://adriandeharo.es:7001/api/usuario/1");

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
              {usuario.fecha_nacimiento
                ? format(new Date(usuario.fecha_nacimiento), " dd/MM/yyyy")
                : "--"}
            </Text>
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
          <Text style={styles.noClassesText}>No hay asistencias</Text>
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
