import Avatar from "./Avatar";
import { View, Text, StyleSheet, Pressable } from "react-native";
import moment from "moment";
import { format } from "date-fns";
import BeltComponent from "./BeltComponent";

const ClaseDetail = ({ clase }) => {
  return (
    <View>
      <View>
        <Text style={styles.tittle}>
          Clase {clase.clase_id}
          {format(new Date(moment(clase.fecha_hora).toISOString()), "dd MMMM")}
        </Text>
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
            {format(new Date(moment(clase.fecha_hora).toISOString()), "HH:mm")}
            {" duración "}
            {clase.duracion} min
          </Text>
        </View>
      </View>

      <Text className="text-blue-400">{clase.descripcion_actividad}</Text>

      <View style={styles.asistentesContainer}>
        {clase?.asistentes?.length > 0 ? (
          <Text>Asistentes: {clase.asistentes.length}</Text>
        ) : (
          <Text>No hay asistentes</Text>
        )}
        <View style={styles.asistentesContainer}>
          {clase?.asistentes?.length > 0 ? (
            clase.asistentes.map((asistente, index) => (
              <View key={index} style={styles.asistente}>
                <Avatar id={asistente.usuario_id} />
                <Text>{asistente.nombre_usuario}</Text>
                <View style={styles.belt}>
                  <BeltComponent
                    cinturon={asistente.cinturon}
                    grados={asistente.grado}
                    id={asistente.asistencia_id}
                    tamano="pequeño"
                  />
                </View>
                <Pressable>
                  {asistente.asistencia ? (
                    <Text>Asistió</Text>
                  ) : (
                    <Text>Faltó</Text>
                  )}
                </Pressable>
              </View>
            ))
          ) : (
            <Text>No hay asistentes</Text>
          )}
        </View>
      </View>
    </View>
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
    flexDirection: "column",
    flexWrap: "wrap",
    marginTop: 8,
    marginBottom: 12,
  },
  asistente: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  belt: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 18,
  },
});

export default ClaseDetail;
