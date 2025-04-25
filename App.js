import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Titulo from "./src/components/Titulo";
import Boton from "./src/components/Boton";
import Visor from "./src/components/visor";
import Tabs from "./src/components/Tabs";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Audio } from "expo-av"; // para reproducir sonidos

export default function App() {
  const [tiempo, setTiempo] = useState(25 * 60); // en segundos
  const [run, setRun] = useState(false);
  const [seleccion, setSeleccion] = useState("op1");

  const colores = ["#33c1ff", "#ff3333", "33ff3f"];
  const indiceColor = seleccion === "op1" ? 0 : seleccion === "op2" ? 1 : 2;

  // Formatear tiempo en mm:ss
  const formatearTiempo = (segundos) => {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, "0");
    const sec = (segundos % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };


  //solicitar permisos
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

  // Función para reproducir alarma
  const sonido = require("./assets/click.mp3");

  const cambiarEstado = () => {
    setRun(!run);
    playSonido(sonido); // Reproduce el sonido
    
  };
  useEffect(()=> {
    solicitarPermisosNotificaciones();
  },[]);
  

  // Temporizador con useEffect
  useEffect(() => {
    let interval=null;

    if (run && tiempo > 0) {
      interval = setInterval(() => {
        setTiempo((prev) => prev - 1);
      }, 1000);
    }

    if (tiempo === 0 && run) {
      setRun(false);
      reproducirAlarma();
    }

    return () => clearInterval(interval); // limpieza
  }, [run, tiempo]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          { paddingTop: Platform.OS === "ios" ? 25 : 0 },
          { backgroundColor: colores[indiceColor] },
        ]}
      >
        <StatusBar style="auto" />
        <Titulo title="Pomodoronacho" />
        <Visor tiempo={formatearTiempo(tiempo)} />
        <Boton run={run} setRun={setRun} />
        <Tabs
          seleccion={seleccion}
          setSeleccion={(op) => {
            setSeleccion(op);
            if (op === "op1") setTiempo(25 * 60);
            if (op === "op2") setTiempo(5 * 60);
            if (op === "op3") setTiempo(15 * 60);
            setRun(false); // parar temporizador al cambiar opción
          }}
          setTiempo={setTiempo}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
