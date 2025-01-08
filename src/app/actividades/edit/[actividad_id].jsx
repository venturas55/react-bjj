import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import postFetch from "../../../hooks/postFetch";

const EditActividad = () => {
  const router = useRouter();
  const { actividad_id, nombre, descripcion } = useLocalSearchParams();
  console.log(actividad_id, nombre, descripcion);
  const [nombreActividad, setNombreActividad] = useState(nombre);
  const [descripcionActividad, setDescripcionActividad] = useState(descripcion);
  const navigation = useNavigation();

  const handleGuardar = async () => {
    const jsonObject = {
      actividad_id,
      nombre: nombreActividad,
      descripcion: descripcionActividad,
    };
    try {
      const response = await postFetch(
        `http://adriandeharo.es:7001/api/actividades/edit/`,
        jsonObject,
      );
      console.log(response);
      router.replace("/ListActividades");
    } catch (e) {
      Alert.alert("Error", e.message);
    } finally {
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">
        Cambios en la actividad {actividad_id} - {nombre}
      </Text>
      <View className="bg-white p-4 rounded-lg shadow">
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
          placeholder="Nombre de la actividad"
          value={nombreActividad}
          onChangeText={setNombreActividad}
        />
        <TextInput
          className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
          placeholder="Descripción de la actividad"
          value={descripcionActividad}
          onChangeText={setDescripcionActividad}
        />
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-lg mb-3"
          onPress={handleGuardar}
        >
          <Text className="text-white text-center text-lg">Guardar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-500 py-3 rounded-lg"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center text-lg">Volver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditActividad;
