import { Pressable, Text, View, StyleSheet } from "react-native";
import playSonido from "../utility/playSound";

export default function Boton(props) {

  const { run, setRun } = props;
 
  const sonido = require("../../assets/sound/click.mp3");



  const cambiarEstado = () => {
    setRun(!run);
   
    playSonido(sonido);
  };

  return (
    <View>
      <Pressable onPress={() => cambiarEstado()}>
        {({ pressed }) => (
          <Text style={[styles.boton, { opacity: pressed ? 0.5 : 1 }]}>
            {
             
              run ? "Parar" : "Iniciar"
            }
          </Text>
        )}
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
    marginTop: 20,
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    backgroundColor: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
