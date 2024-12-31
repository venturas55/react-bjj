import React from "react";
import { View, StyleSheet } from "react-native";

const BeltComponent = ({ cinturon, grados, id, tamano }) => {
  console.log(grados);
  const getBeltStyle = (size) => {
    return size === "grande" ? styles.beltLarge : styles.beltSmall;
  };

  const getColorStyle = (color) => {
    switch (color) {
      case "blanco":
        return styles.blanco;
      case "gris":
        return styles.gris;
      case "amarillo":
        return styles.amarillo;
      case "naranja":
        return styles.naranja;
      case "verde":
        return styles.verde;
      case "azul":
        return styles.azul;
      case "morado":
        return styles.morado;
      case "marron":
        return styles.marron;
      case "negro":
        return styles.negro;
      default:
        return {};
    }
  };

  const getStripes = (grados) => {
    return grados?.split("I").length - 1;
  };

  const stripes = Array.from({ length: getStripes(grados) }).map((_, index) => (
    <View key={index} style={[styles.stripe, { right: 12 + index * 7 }]} />
  ));

  return (
    <View
      style={[
        styles.asistente,
        getBeltStyle(tamano),
        getColorStyle(cinturon),
        styles.beltContainer,
      ]}
      data-id={id}
    >
      <View style={styles.belt}>
        {stripes}
        <View style={styles.finalBand} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Contenedor principal
  asistente: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  beltContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  belt: {
    position: "relative",
    width: "100%",
    height: "100%",
    lineHeight: "100%",
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#333",
    display: "flex",
  },
  stripe: {
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: 3,
    backgroundColor: "#fff",
    zIndex: 1,
  },
  finalBand: {
    position: "absolute",
    top: 0,
    right: "5%",
    width: "40%",
    height: "100%",
    backgroundColor: "#000",
  },

  // Tamaños de cinturones
  beltLarge: {
    height: 35,
    width: 260,
  },
  beltSmall: {
    height: 20,
    width: 100,
  },

  // Colores de cinturones
  blanco: { backgroundColor: "#fefefe", color: "#333" },
  gris: { backgroundColor: "#a9a9a9" },
  amarillo: { backgroundColor: "#ffdd00", color: "#333" },
  naranja: { backgroundColor: "#ff8800" },
  verde: { backgroundColor: "#008000" },
  azul: { backgroundColor: "#0000ff" },
  morado: { backgroundColor: "#800080" },
  marron: { backgroundColor: "#8b4513" },
  negro: { backgroundColor: "#000000" },
});

export default BeltComponent;
