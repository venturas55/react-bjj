import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";
import getFetch from "../hooks/getFetch";
import AsistenciaItem from "./AsistenciaItem";
import { format } from "date-fns";
import BeltComponent from "./BeltComponent";
import { API_URL } from "../config/constants";

const Asistencias = () => {
  const { user } = useGlobalContext();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!user?.id) {
          throw new Error("User ID not found");
        }

        const data = await getFetch(`${API_URL}/api/usuario/${user.id}`);
        if (data) {
          setUserData(data);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.id]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.usuario}>
        <Text style={styles.name}>
          {userData.nombre} {userData.apellidos}
        </Text>
        
        <Text style={styles.info}>
          Nacimiento:
          {userData.fecha_nacimiento
            ? format(new Date(userData.fecha_nacimiento), " dd/MM/yyyy")
            : "--"}
        </Text>
        
        <Text style={styles.info}>{userData.pais}</Text>
        <Text style={styles.info}>{userData.telefono}</Text>
        
        <View style={styles.beltContainer}>
          <BeltComponent
            cinturon={userData.cinturon}
            grado={userData.grado}
            tamano="pequeño"
          />
        </View>
      </View>

      <View style={styles.asistenciasContainer}>
        <Text style={styles.sectionTitle}>Historial de Asistencias</Text>
        {userData?.asistencias && Array.isArray(userData.asistencias) && userData.asistencias.length > 0 ? (
          <FlatList
            data={userData.asistencias}
            keyExtractor={(item) => (item.id || item.asistencia_id || Math.random().toString()).toString()}
            renderItem={({ item }) => <AsistenciaItem asistencia={item} />}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <Text style={styles.noData}>No hay asistencias registradas</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  usuario: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    color: "#666",
  },
  beltContainer: {
    marginTop: 8,
  },
  asistenciasContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  noData: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  listContainer: {
    paddingVertical: 16,
  }
});

export default Asistencias;
