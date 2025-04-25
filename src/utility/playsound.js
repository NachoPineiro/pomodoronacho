import { Audio } from "expo-av";

export default async function playSonido(sonido) {
  const { sound } = await Audio.Sound.createAsync(sonido);
  await sound.playAsync();
}
