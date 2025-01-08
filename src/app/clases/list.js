//import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";
import getFetch from "../../hooks/getFetch";

// Suponiendo que 'clases' es un array que contiene la información de las clases.
const ClaseList = () => {
  //const [clases, setClases] = useState(null);
  const clases = getFetch("http://adriandeharo.es:7001/api/clases/list");
  //useEffect(() => {}, []);

  const handleJoinClase = (claseId) => {
    // Aquí manejas la lógica para unirse a la clase, por ejemplo, una petición POST.
    Alert.alert("Te has unido a la clase", `Clase ID: ${claseId}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.text}>Id: {item.clase_id}</Text>
      <Text style={styles.text}>
        {item.actividad_id} - {item.nombre_actividad}
      </Text>
      <Text style={styles.text}>
        {item.creador_id} {item.nombre_creador} {item.apellidos_creador}
      </Text>
      <Text style={styles.text}>
        {item.instructor_id} {item.nombre_instructor}{" "}
        {item.apellidos_instructor}
      </Text>
      <Text style={styles.text}>{item.fecha_hora}</Text>
      <Text style={styles.text}>{item.duracion}</Text>
      <View style={styles.actions}>
        <Link href={`/clases/edit/${item.clase_id}`} asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert(
              "Confirmar eliminación",
              `¿Seguro que deseas eliminar la clase con ID ${item.clase_id}?`,
            )
          }
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleJoinClase(item.clase_id)}
        >
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={`/clases/add/}`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>NUEVA CLASE</Text>
          </TouchableOpacity>
        </Link>

        <Link href={`/clases/week/`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.buttonText}>GESTIONAR SEMANA</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {clases.length > 0 ? (
        <FlatList
          data={clases}
          renderItem={renderItem}
          keyExtractor={(item) => item.clase_id.toString()}
        />
      ) : (
        <View style={styles.noClassesContainer}>
          <Text>
            No hay clases guardadas.{" "}
            <Link href={`/clases/edit/}`} asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Crea una!</Text>
              </TouchableOpacity>
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

export default ClaseList;
