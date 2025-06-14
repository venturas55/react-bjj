import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
    color: "white",
  },
  boton: {
    backgroundColor: "#aee",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    color: "white",
  },
});

export default function LogInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      usuario: "",
      contrasena: "",
    },
  });
  const onSubmit = async (data) => {
    const { usuario, contrasena } = data;
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const data = await response.json();

      const { token, user } = data;
      // Guardar token en AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("userInfo", JSON.stringify(jsonValue));
      console.log("Usuario autenticado:", user);
      console.log(user.id);
      return user;
    } catch (error) {
      console.error("Error durante el login:", error.message);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Usuario"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="usuario"
      />
      {errors.usuario && <Text>This is required.</Text>}

      <Controller
        styles={styles.campo}
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Contraseña"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="contrasena"
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        style={styles.boton}
      />
    </View>
  );
}
