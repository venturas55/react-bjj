import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { Link } from "expo-router";
import getFetch from "../../hooks/getFetch";

// Suponiendo que 'actividades' es un array que contiene la información de las actividades.
const ListActividad = () => {
  const [actividades, setActividades] = useState([]);

  const pedirDatos = async () => {
    const respuesta = await getFetch(
      "http://adriandeharo.es:7001/api/actividades/list",
    );
    console.log("Respuesta del servidor:", respuesta);
    setActividades(respuesta || []); // Maneja respuestas nulas
  };

  useFocusEffect(
    useCallback(() => {
      pedirDatos(); // Llama a la función cuando la pantalla obtiene el foco
    }, []),
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.text}>Id: {item.actividad_id}</Text>
      <Text style={styles.text}>
        {item.actividad_id} - {item.nombre}
      </Text>
      <Text style={styles.text}>{item.descripcion}</Text>
      <View style={styles.actions}>
        <Link
          href={`/actividades/edit/${item.actividad_id}?nombre=${item.nombre}&descripcion=${item.descripcion}`}
          asChild
        >
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        </Link>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("click pressed");
            Alert.alert(
              "Confirmar eliminación",
              `¿Seguro que deseas eliminar la clase con ID ${item.actividad_id}?`,
            );
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={`/actividades/add/}`} asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.buttonText}>NUEVA CLASE</Text>
          </Pressable>
        </Link>

        <Link href={`/actividades/week/`} asChild>
          <Pressable style={styles.actionButton}>
            <Text style={styles.buttonText}>GESTIONAR SEMANA</Text>
          </Pressable>
        </Link>
      </View>

      {actividades && actividades.length > 0 ? (
        <FlatList
          data={actividades}
          renderItem={renderItem}
          keyExtractor={(item) => item.actividad_id.toString()}
        />
      ) : (
        <View style={styles.noClassesContainer}>
          <Text>
            No hay actividades guardadas.{" "}
            <Link href={`/actividades/edit/}`} asChild>
              <Pressable>
                <Text style={styles.link}>Crea una!</Text>
              </Pressable>
            </Link>
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = {
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  actionButton: {
    margin: 10,
    backgroundColor: "#f0ad4e",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  row: {
    backgroundColor: "#333",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 10,
    backgroundColor: "#f0ad4e",
    borderRadius: 5,
  },
  noClassesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
};

export default ListActividad;
