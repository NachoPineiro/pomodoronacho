import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Titulo from "./src/components/Titulo";
import Boton from "./src/components/Boton";
import Visor from "./src/components/visor";
import Tabs from "./src/components/Tabs";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { enviarNotificacion } from "./src/utility/notificaciones.js";
import playSonido from "./src/utility/playsound"; // ✅ IMPORTACIÓN AGREGADA

export default function App() {
  //logica del componente
  //Definimos estados para manejar la interfaz de usuario - useState: https://react.dev/reference/react/useState
  const [tiempo, setTiempo] = useState(25 * 60);
  const [run, setRun] = useState(false);
  const [seleccion, setSeleccion] = useState("op1" | "op2" | "op3");

  const colores = ["#e633ff", "#ff3333", "#33ff86"];
  const indiceColor = seleccion === "op1" ? 0 : seleccion === "op2" ? 1 : 2;

  const solicitarPermisosNotificaciones = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        console.log("Permiso de notificación denegado");
        return;
      }
    }
    console.log("Permiso de notificación concedido");
  };

  // ✅ SONIDO A REPRODUCIR AL FINALIZAR EL TIEMPO
  const sonidoAlarma = require("./assets/sound/alarm.mp3");

  useEffect(() => {
    solicitarPermisosNotificaciones();
  }, []);

  useEffect(() => {
    let interval = null;

    if (run && tiempo > 0) {
      interval = setInterval(() => {
        setTiempo((prevTiempo) => prevTiempo - 1);
      }, 1000);
    }

    if (tiempo === 0 && run) {
      setRun(false);

      const nuevoTiempo =
        seleccion === "op1" ? 25 * 60 :
        seleccion === "op2" ? 5 * 60 :
        15 * 60;

      setTiempo(nuevoTiempo);
      enviarNotificacion();

      // ✅ REPRODUCIR SONIDO
      playSonido(sonidoAlarma);
    }

    return () => clearInterval(interval);
  }, [run, tiempo]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? 25 : 0 },
        { backgroundColor: colores[seleccion] || "33b2ff" },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Titulo title="Pomodoronacho" />
        <Visor tiempo={tiempo} />
        <Boton run={run} setRun={setRun} colorBoton={colores[seleccion]} />
        <Tabs
          seleccion={seleccion}
          setSeleccion={setSeleccion}
          setTiempo={setTiempo}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
