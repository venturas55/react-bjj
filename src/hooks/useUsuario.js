import { useState, useEffect } from "react";

const useUsuario = (id) => {
  const [usuario, setUsuario] = useState(null); // Estado para almacenar las clases

  const fetchU = async () => {
    // eslint-disable-next-line prettier/prettier
    const response = await globalThis.fetch("http://adriandeharo.es:7001/api/usuario/" + id);
    const json = await response.json();
    setUsuario(json);
  };
  useEffect(() => {
    fetchU();
  }, []);
  return usuario;
};

export default useUsuario;
