import { useState, useEffect } from "react";

const useClases = () => {
  const [clases, setClases] = useState(null); // Estado para almacenar las clases

  const fetchClases = async () => {
    // eslint-disable-next-line prettier/prettier
    const response = await globalThis.fetch("http://adriandeharo.es:7001/api/clases");
    const json = await response.json();
    setClases(json);
  };
  useEffect(() => {
    fetchClases();
  }, []);

  return clases;
};

export default useClases;
