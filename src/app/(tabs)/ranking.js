import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import useGetFetch from "./../../hooks/useGetFetch";
import AsistenciaItem from "./../../components/AsistenciaItem";
import Avatar from "./../../components/Avatar";
import { format } from "date-fns";
import BeltComponent from "./../../components/BeltComponent";

const Ranking = (user) => {
  const { data } = useGetFetch("http://adriandeharo.es:7001/api/asistencias");
  const { asistencias, ranking } = data;
  console.log(data.ranking);

  return (
    <View style={styles.container}>
      <View style={styles.rankingContainer}>
        <Text style={styles.rankingTitle}>Ranking</Text>
        <FlatList
          data={ranking}
          keyExtractor={(item) => item.asistencia_id}
          renderItem={({ item, index }) => (
            <Text>
              <Avatar id={item.usuario_id} />#{index + 1} {item.nombre_usuario}{" "}
              asistió a un total de {item.total_asistencias} clases
            </Text>
          )}
          ListEmptyComponent={
            <Text style={styles.noClassesText}>No hay asistencias</Text>
          }
          style={styles.asistencias}
        />
      </View>
      <View style={styles.asistencias}>
        {asistencias ? (
          <>
            <FlatList
              data={asistencias}
              keyExtractor={(item) => item.asistencia_id}
              renderItem={({ item, index }) => (
                <AsistenciaItem asistencia={item} index={index} />
              )}
              ListEmptyComponent={
                <Text style={styles.noClassesText}>No hay asistencias</Text>
              }
              style={styles.asistencias}
            />
          </>
        ) : (
          <Text>Recibiendo datos</Text>
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
    paddingVertical: 16,
  },
  asistencias: {
    flex: 1,
  },
  rankingTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  rankingContainer: {
    marginBottom: 30,
  },
});

export default Ranking;
