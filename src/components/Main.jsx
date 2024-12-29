import { View, ActivityIndicator } from "react-native";
import Calendario from "./Calendario";

export function Main() {
  return (
    <View>
      <ActivityIndicator color={"#a9a9a9"} size={"large"} />
      <Calendario />
      <View style={{ marginBottom: 20 }}></View>
    </View>
  );
}
