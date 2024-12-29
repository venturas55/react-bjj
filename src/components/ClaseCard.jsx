import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { format } from "date-fns";
import { Link } from "expo-router";
import Avatar from "./Avatar";

const ClaseCard = ({ clase }) => {
  const formattedDate = format(new Date(clase.fecha_hora), "dd/MM/yyyy");
  const formattedTime = format(new Date(clase.fecha_hora), "HH:mm");
  return (
    <Link href={`/clases/${clase.clase_id}`} asChild>
      <Pressable>
        <View style={styles.card}>
          <Text style={styles.claseTitle}>
            {clase.clase_id} {clase.nombre_actividad}
          </Text>
          <Text>Fecha: {formattedDate}</Text>
          <Text>Hora: {formattedTime}</Text>
          {/* <Text>Duración: {clase.duracion} min</Text> */}
          <View style={styles.asistentesContainer}>
            {clase.asistentes.map((asistente, index) => (
              <Avatar key={index} id={asistente.usuario_id} />
            ))}
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export function AnimatedClaseCard({ clase, index }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      delay: index * 25,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return (
    <Animated.View style={{ opacity }}>
      <ClaseCard clase={clase} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ddd",
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
  claseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  asistentesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  asistente: {
    marginHorizontal: 5,
  },
});

export default ClaseCard;
