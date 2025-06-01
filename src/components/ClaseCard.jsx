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
        <View className="flex-1 bg-grey-600 rounded-3xl shadow-md m-4 p-4">
          <View className="flex-row p-4 bg-grey-400">
            <Avatar id={clase.instructor_id} tamano="small"></Avatar>
            <View className="flex-1 ">
              <Text style={styles.claseTitle}>
                {clase.clase_id} - {clase.nombre_actividad}
              </Text>
              <Text>
                Fecha: {formattedDate} {formattedTime}
              </Text>
            </View>
            {/* <Text>Duración: {clase.duracion} min</Text> */}
          </View>
          <View className="flex-row flex-wrap px-4 pb-4 bg-grey-400">
            {clase.asistencias.map((asistente, index) => (
              <Avatar key={index} id={asistente.usuario_id} size="20" />
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
  claseTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  asistente: {
    marginHorizontal: 5,
  },
});

export default ClaseCard;
