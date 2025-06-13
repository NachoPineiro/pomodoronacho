import { StyleSheet, Text, View } from "react-native";

export default function Titulo({ title }) {
  return (
    <View>
      <Text style={styles.texto}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
  },
});
