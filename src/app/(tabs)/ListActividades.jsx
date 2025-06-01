import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";

const ListActividad = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useGlobalContext();

  const pedirDatos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.token) {
        throw new Error("No hay token de autenticación");
      }

      const response = await axios.get("http://adriandeharo.es:7001/api/actividades/list", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        console.log("Actividades cargadas:", response.data.length);
        setActividades(response.data);
      } else {
        console.warn("No se recibieron datos de actividades");
        setActividades([]);
      }
    } catch (err) {
      console.error("Error fetching actividades:", err);
      if (err.response) {
        // Error de respuesta del servidor
        setError(`Error del servidor: ${err.response.status} - ${err.response.data?.message || 'Error desconocido'}`);
      } else if (err.request) {
        // Error de red
        setError("Error de red: No se pudo conectar con el servidor");
      } else {
        // Otros errores
        setError(err.message || "Error al cargar las actividades");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.token) {
        pedirDatos();
      } else {
        setError("No hay sesión activa");
      }
    }, [user?.token])
  );

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
        <Text style={styles.error}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={pedirDatos}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardId}>ID: {item.actividad_id}</Text>
      </View>
      
      <Text style={styles.description}>{item.descripcion}</Text>
      
      <View style={styles.actions}>
        <Link
          href={`/actividades/edit/${item.actividad_id}?nombre=${encodeURIComponent(item.nombre)}&descripcion=${encodeURIComponent(item.descripcion)}`}
          asChild
        >
          <Pressable style={[styles.button, styles.editButton]}>
            <Text style={styles.buttonText}>Editar</Text>
          </Pressable>
        </Link>
        
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={() => {
            Alert.alert(
              "Confirmar eliminación",
              `¿Seguro que deseas eliminar la actividad "${item.nombre}"?`,
              [
                {
                  text: "Cancelar",
                  style: "cancel"
                },
                {
                  text: "Eliminar",
                  style: "destructive",
                  onPress: async () => {
                    try {
                      await axios.delete(`http://adriandeharo.es:7001/api/actividades/${item.actividad_id}`, {
                        headers: {
                          Authorization: `Bearer ${user?.token}`
                        }
                      });
                      pedirDatos(); // Refresh the list
                    } catch (err) {
                      console.error("Error deleting activity:", err);
                      Alert.alert("Error", "No se pudo eliminar la actividad");
                    }
                  }
                }
              ]
            );
          }}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={actividades}
        renderItem={renderItem}
        keyExtractor={(item) => item.actividad_id?.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay actividades disponibles</Text>
        }
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardId: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4CAF50",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "#f44336",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
    marginTop: 32,
  }
};

export default ListActividad;
