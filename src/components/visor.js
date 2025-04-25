import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Visor = ({ tiempo }) => {
  const formatearTiempo = (tiempo) => {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tiempoTexto}>{formatearTiempo(tiempo)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  tiempoTexto: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Visor;
