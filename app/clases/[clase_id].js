import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import ClaseDetail from "./../../components/ClaseDetail";

export default function Detail() {
  const { clase_id } = useLocalSearchParams();
  const [clase, setClase] = useState([]);
  // Estado para almacenar las clases

  useEffect(() => {
    // Fetch inicial para obtener todas las clases
    console.log("Usando effect id: " + clase_id);
    const fetchClase = async () => {
      try {
        const response = await fetch(
          `http://adriandeharo.es:7001/api/clase/${clase_id}`,
        );
        const data = await response.json();
        console.log("Data: ");
        console.log(data);
        setClase(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClase();
  }, []);

  // Función para renderizar los asistentes en la vista
  return (
    <View>
      <ClaseDetail clase={clase} />
      <Link href="/"> Volver home</Link>
    </View>
  );
}
