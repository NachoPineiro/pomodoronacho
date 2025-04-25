import { Audio } from "expo-av";

//Fucnion reutilizable para reproducir sonido
//Recibe un sonido como parametro y lo reproduce
async function playSonido(sonido) {
  const { sound } = await Audio.Sound.createAsync(sonido);
  await sound.playAsync(); // Reproduce el sonido
}

export default playSonido;