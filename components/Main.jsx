import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { getClases } from "../lib/bjj";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Calendario from "./Calendario";

export function Main() {
  const [clases, setClases] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getClases().then((clases) => {
      setClases(clases);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {clases.length === 0 ? (
        <ActivityIndicator color={"#a9a9a9"} size={"large"} />
      ) : (
        <Calendario clases={clases} />
      )}
      <View style={{ marginBottom: 20 }}></View>
    </View>
  );
}
