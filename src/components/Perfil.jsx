import { View, Text, Image, StyleSheet } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import React, { useState } from "react";
import BeltComponent from "./BeltComponent";
import useGetFetch from "../hooks/useGetFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./CustomButton";

const Perfil = () => {
  const { user, isLogged, setIsLogged, setUser, loading } = useGlobalContext();

  const { data } = useGetFetch(
    "http://adriandeharo.es:7001/api/usuario/" + user.id,
  );
  console.log(data);
  setUser(data);

  const handleLogout = async () => {
    // Elimina el token de AsyncStorage
    await AsyncStorage.removeItem("authToken");

    // Limpia el estado del contexto global
    setIsLogged(false);
    setUser(null);

    // Aquí puedes redirigir al usuario a la pantalla de login
    console.log("Usuario cerrado sesión");
  };

  return (
    <View style={styles.container}>
      {user ? (
        <View className="text-current content-center items-center mb-5">
          <Image
            style={styles.image}
            source={{
              uri: "http://adriandeharo.es:7001/api/usuario/foto/" + user.id,
            }}
          />
          <Text className="text-2xl my-3 text-current">
            {user.nombre} {user.apellidos}
          </Text>
          <Text className="my-3">{user.fecha_nacimiento}</Text>
          <Text className="my-3">{user.telefono}</Text>
          <Text className="my-3">{user.genero}</Text>

          <Text className="my-3">
            {user.cinturon} {user.grado}
          </Text>
          <BeltComponent
            className="my-3 py-3"
            cinturon={user.cinturon}
            grados={user.grado}
            id={user.id}
            tamano="pequeño"
          />
        </View>
      ) : (
        <Text>Recibiendo datos</Text>
      )}
      <CustomButton title="Cerrar sesión" handlePress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});

export default Perfil;
