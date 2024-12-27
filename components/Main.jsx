import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { getClases } from "../lib/bjj";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "./Logo";
import AppBar from "./AppBar";
import Calendario from "./Calendario";

export function Main() {
  const [clases, setClases] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getClases().then((clases) => {
      //console.log(clases);
      setClases(clases);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {clases.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <Calendario clases={clases} />
      )}
      <View style={{ marginTop: 20 }}>
        <AppBar />
      </View>
    </View>
  );
}
