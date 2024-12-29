import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { format } from "date-fns";
import { Link } from "expo-router";

const AsistenciaItem = ({ asistencia, index }) => {
  /*   const formattedDate = format(new Date(clase.fecha_hora), "dd/MM/yyyy");
  const formattedTime = format(new Date(clase.fecha_hora), "HH:mm"); */
  console.log(asistencia);
  return (
    <View style={styles.card}>
      <Text style={styles.header}>{asistencia.nombre_actividad}</Text>
      <Text>{asistencia.asistencia_id}</Text>
      <Text>{asistencia.nombre_actividad}</Text>
      <Text>{asistencia.descripcion_actividad}</Text>
      <Text>{asistencia.fecha_hora}</Text>
      <Text>{asistencia.fecha_hora}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#bbb",
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default AsistenciaItem;
