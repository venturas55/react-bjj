import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { format } from "date-fns";
import { Link } from "expo-router";
import BeltComponent from "./BeltComponent";

const AsistenciaItem = ({ asistencia }) => {
  if (!asistencia) {
    return null;
  }

  const id = asistencia.id || asistencia.asistencia_id;
  const fecha = asistencia.fecha_hora ? new Date(asistencia.fecha_hora) : new Date();

  return (
    <Link href={`/clases/${asistencia.clase_id}`} asChild>
      <Pressable style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}>
        <View>
          <Text style={styles.header}>
            {asistencia.nombre_actividad || 'Actividad'} 
            {id && ` - ${id}`}
          </Text>
          
          {asistencia.descripcion_actividad && (
            <Text style={styles.description}>{asistencia.descripcion_actividad}</Text>
          )}
          
          <Text style={styles.dateTime}>
            {format(fecha, "dd/MM/yyyy")}
            {" - "}
            {format(fecha, "HH:mm")}
          </Text>
          
          {asistencia.cinturon && (
            <View style={styles.beltContainer}>
              <BeltComponent
                cinturon={asistencia.cinturon}
                grado={asistencia.grado}
                id={id}
                tamano="pequeño"
              />
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.7,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  beltContainer: {
    marginTop: 8,
  }
});

export default AsistenciaItem;
