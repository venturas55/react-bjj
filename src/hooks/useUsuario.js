import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUsuario = (id) => {
  const [usuario, setUsuario] = useState(null); // Estado para almacenar las clases

  const fetchU = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const user = await AsyncStorage.getItem("user");
    console.log("Id del usuario: ", user.id);

    const response = await globalThis.fetch(
      "http://adriandeharo.es:7001/api/usuario/" + user.id,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("No autorizado");
    }

    const json = await response.json();
    setUsuario(json);
  };
  useEffect(() => {
    fetchU();
  }, []);
  return usuario;
};

export default useUsuario;
