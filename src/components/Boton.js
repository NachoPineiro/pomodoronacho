import { Pressable, Text, View, StyleSheet } from "react-native";
import playSonido from "../utility/playsound";

export default function Boton(props) {
  const { run, setRun, colorBoton } = props;
  const sonido = require("../../assets/sound/click.mp3");

  const cambiarEstado = () => {
    setRun(!run);
    playSonido(sonido);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Pressable
        onPress={cambiarEstado}
        style={({ pressed }) => [
          styles.boton,
          {
            backgroundColor: colorBoton || "#ccc",
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text style={styles.textoBoton}>{run ? "Parar" : "Iniciar"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
  },
  textoBoton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});
