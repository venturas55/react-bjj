import { Alert } from "react-native";

const postFetch = async (link, jsonObject) => {
  try {
    const response = await fetch(link, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    });

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} ${response.statusText}`,
      );
    }

    // Verificar si hay contenido antes de llamar a response.json()
    const text = await response.text();
    if (text) {
      return JSON.parse(text); // Convertir el texto a JSON
    } else {
      return {}; // Si no hay contenido, devolver un objeto vacío
    }
  } catch (e) {
    Alert.alert("Error", e.message);
    throw e; // Propaga el error para que pueda manejarse donde se llame
  }
};

export default postFetch;
