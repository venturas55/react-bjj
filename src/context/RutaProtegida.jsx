import React, { useContext } from "react";
import GlobalContext from "./GlobalProvider"; // Ajusta la ruta
import { Link } from "expo-router";

const RutaProtegida = ({ children }) => {
  const { isLogged } = useContext(GlobalContext);

  return isLogged ? children : <Link href="/login" />;
};

export default RutaProtegida;
