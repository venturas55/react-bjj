import { useState, useEffect } from "react";
import { API_URL } from "../config/constants";

const useUsuario = (id) => {
  const [usuario, setUsuario] = useState(null); // Estado para almacenar las clases

  const fetchUsuario = async () => {
    // eslint-disable-next-line prettier/prettier
    const response = await globalThis.fetch(
      `${API_URL}/api/usuarios/1`,
    );
    const json = await response.json();
    setUsuario(json);
  };
  useEffect(() => {
    fetchUsuario();
  }, []);

  return usuario;
};

export default useUsuario;
