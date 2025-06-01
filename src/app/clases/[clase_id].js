import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { API_URL } from "../../config/constants";
import ClaseDetail from "./../../components/ClaseDetail";

export default function Detail() {
  const { clase_id } = useLocalSearchParams();
  const [clase, setClase] = useState(null);

  useEffect(() => {
    const fetchClase = async () => {
      try {
        const response = await fetch(`${API_URL}/api/clase/${clase_id}`);
        const data = await response.json();
        // If data is an array, take the first element
        const singleClase = Array.isArray(data) ? data[0] : data;
        setClase(singleClase);
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };

    fetchClase();
  }, [clase_id]);

  if (!clase) {
    return <View>Loading...</View>;
  }

  return (
    <View>
      <ClaseDetail clase={clase} />
      <Link href="/"> Volver home</Link>
    </View>
  );
}
