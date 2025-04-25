import { View, StyleSheet, Text } from "react-native";

export default function Visor({ tiempo }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>{tiempo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.8,
    borderWidth: 3,
    marginTop: 30,
    borderRadius: 30,
    backgroundColor: "orange",
  },
});
