import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Titulo from "./src/components/Titulo";
import Boton from "./src/components/Boton";
import Visor from "./src/components/visor";
import Tabs from "./src/components/Tabs";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { enviarNotificacion } from "./src/utility/notificaciones.js";

export default function App() {
  const [tiempo, setTiempo] = useState(25 * 60);
  const [run, setRun] = useState(false);
  const [seleccion, setSeleccion] = useState("op1"); // valor inicial corregido

  const colores = ["#33c1ff", "#ff3333", "#33ff3f"];
  const indiceColor = seleccion === "op1" ? 0 : seleccion === "op2" ? 1 : 2;

  // Solicita permisos para notificaciones
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

  useEffect(() => {
    solicitarPermisosNotificaciones();
  }, []);

  // Efecto del temporizador
  useEffect(() => {
    let interval = null;

    if (run && tiempo > 0) {
      interval = setInterval(() => {
        setTiempo((prevTiempo) => prevTiempo - 1);
      }, 1000);
    }

    if (tiempo === 0 && run) {
      setRun(false);

      // Reiniciar el tiempo según la selección
      const nuevoTiempo =
        seleccion === "op1"
          ? 25 * 60
          : seleccion === "op2"
          ? 5 * 60
          : 15 * 60;

      setTiempo(nuevoTiempo);
      enviarNotificacion();
    }

    return () => clearInterval(interval);
  }, [run, tiempo]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? 25 : 0 },
        { backgroundColor: colores[indiceColor] },
      ]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Titulo title="Pomodoronacho" />
        <Visor tiempo={tiempo} />
        <Boton run={run} setRun={setRun} />
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
