import { Pressable, View, Text, StyleSheet } from "react-native";

export default function Tabs(props) {
  const { seleccion, setSeleccion, setTiempo } = props;
  const opciones = ["Pomodoro", "Descanso cortito", "Descanso "];

  //logica del componente
  function cambiarSeleccion(index) {
    setSeleccion(index);
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {opciones.map((opcion, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [
            styles.boton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
          onPress={() => cambiarSeleccion(index)}
        >
          <Text>{opcion}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    borderWidth: 3,
    width: "33%",
    padding: 8,
    borderRadius: 10,
    borderColor: "white",
    alignItems: "center",
    marginTop: 15,
  },
});
