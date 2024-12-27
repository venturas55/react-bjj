import { useEffect, useRef } from "react";
import Avatar from "./Avatar";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { Link } from "expo-router";
import moment from "moment";
import { format } from "date-fns";
import BeltComponent from "./BeltComponent";

const ClaseDetail = ({ clase }) => {
  return (
    <>
      <View>
        <View style={styles.tittle}>
          {format(new Date(moment(clase.fecha_hora).toISOString()), "dd MMMM")}
        </View>
        <View style={styles.card}>
          <View style={styles.instructor}>
            <Avatar id={clase.instructor_id} />
            <Text>{clase.nombre_instructor}</Text>
          </View>
          <View style={styles.actividad}>
            <Text>
              {" "}
              {clase.clase_id} {clase.nombre_actividad}{" "}
            </Text>
            <Text>
              {format(
                new Date(moment(clase.fecha_hora).toISOString()),
                "HH:mm",
              )}
              {" duración "}
              {clase.duracion} min
            </Text>
          </View>
        </View>
        <Text>{clase.descripcion_actividad}</Text>
        <View style={styles.asistentesContainer}>
          <Text>Asistentes: {clase.asistentes.length}</Text>
          <View style={styles.asistentesContainer}>
            {clase.asistentes.map((asistente, index) => (
              <View style={styles.asistente}>
                <Avatar key={index} id={asistente.usuario_id} />
                <Text>{asistente.nombre_usuario}</Text>
                <View style={styles.belt}>
                  <BeltComponent
                    cinturon={asistente.cinturon}
                    grados={asistente.grado}
                    id={asistente.grado}
                    tamano="pequeño"
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tittle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  instructor: {
    alignItems: "center",
  },
  actividad: {
    flex: 1,
    alignItems: "center",
  },
  asistentesContainer: {
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 12,
  },
  asistente: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginBottom: 8,
    alignItems: "center",
  },
  belt: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
});

export default ClaseDetail;
