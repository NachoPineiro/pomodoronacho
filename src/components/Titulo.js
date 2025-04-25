//Componente

import { StyleSheet, Text, View } from "react-native";

export default function Titulo({ title }) {
  //logica del componente
  return (
    <View>
      <Text style={styles.texto}>{title}</Text>
    </View>
  );
}

//Creando el elemento estilos
const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
  },
});
