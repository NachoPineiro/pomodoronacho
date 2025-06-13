import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Tabs = ({ seleccion, setSeleccion, setTiempo }) => {
  const opciones = [
    { label: "Pomodoro", tiempo: 25 * 60 },
    { label: "Descanso Corto", tiempo: 5 * 60 },
    { label: "Descanso Largo", tiempo: 15 * 60 },
  ];

  return (
    <View style={styles.container}>
      {opciones.map((opcion, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.boton, seleccion === index && styles.botonActivo]}
          onPress={() => {
            setSeleccion(index);
            setTiempo(opcion.tiempo);
          }}
        >
          <Text style={[styles.texto, seleccion === index && styles.textoActivo]}>
            {opcion.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#ffffff55",
  },
  botonActivo: {
    backgroundColor: "#ffffff",
  },
  texto: {
    color: "#fff",
    fontWeight: "bold",
  },
  textoActivo: {
    color: "#000",
  },
});

export default Tabs;
