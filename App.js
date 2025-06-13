import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Titulo from "./src/components/Titulo";
import Boton from "./src/components/Boton";
import Visor from "./src/components/Visor";
import Tabs from "./src/components/Tabs";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { enviarNotificacion } from "./src/utility/notificaciones.js";
import playSonido from "./src/utility/playsound";

export default function App() {
  const [tiempo, setTiempo] = useState(25 * 60);
  const [run, setRun] = useState(false);
  const [seleccion, setSeleccion] = useState(0); // 0: Pomodoro, 1: Descanso corto, 2: Descanso largo
  const [endTime, setEndTime] = useState(null);

  const colores = ["#e633ff", "#ff3333", "#33ff86"];

  const sonidoAlarma = require("./assets/sound/alarm.mp3");

  // Pedir permisos para notificaciones
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

  // Cuando cambie la selección de tab, setear tiempo
  useEffect(() => {
    let nuevoTiempo = seleccion === 0 ? 25 * 60 : seleccion === 1 ? 5 * 60 : 15 * 60;
    setTiempo(nuevoTiempo);
    setRun(false);
    setEndTime(null);
  }, [seleccion]);

  // Lógica del temporizador
  useEffect(() => {
    if (run && !endTime) {
      // Al iniciar, guardo el tiempo final
      setEndTime(Date.now() + tiempo * 1000);

      // Programar la notificación para que salte justo cuando termina el tiempo
      Notifications.cancelAllScheduledNotificationsAsync(); // limpio las anteriores
      Notifications.scheduleNotificationAsync({
        content: {
          title: "⏳ Pomodoro Finalizado",
          body: "Tu tiempo ha terminado. ¡Tómate un descanso!",
          sound: true,
        },
        trigger: {
          seconds: tiempo,
          repeats: false,
        },
      });
    }

    if (!run) {
      // Si paro el timer, limpio el endTime y las notificaciones programadas
      setEndTime(null);
      Notifications.cancelAllScheduledNotificationsAsync();
    }

    if (!run || !endTime) return;

    // Intervalo que actualiza el tiempo restante calculando la diferencia real
    const interval = setInterval(() => {
      const segundosRestantes = Math.round((endTime - Date.now()) / 1000);

      if (segundosRestantes <= 0) {
        setRun(false);
        setTiempo(0);
        setEndTime(null);

        // Sonido y notificación local cuando termina el tiempo (por si la notificación falló)
        enviarNotificacion();
        playSonido(sonidoAlarma);
        clearInterval(interval);
      } else {
        setTiempo(segundosRestantes);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [run, endTime]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? 25 : 0 },
        { backgroundColor: colores[seleccion] || "#33b2ff" },
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
