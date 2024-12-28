import { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const ClaseCard = ({ clase }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.claseTitle}>
        {clase.clase_id} {clase.nombre_actividad}
      </Text>
      <Text>{clase.fecha_hora}</Text>
      <Text>{clase.duracion} min</Text>
      <View style={styles.asistentesContainer}>
        {clase.asistentes.map((asistente, index) => (
          <Text key={index} style={styles.asistente}>
            {asistente.pictureURL_usuario}
          </Text>
        ))}
      </View>
    </View>
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
    backgroundColor: "#f8f8f8",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  claseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  asistentesContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  asistente: {
    marginHorizontal: 5,
  },
});

export default ClaseCard;
