import { Stack } from "expo-router";
import { View } from "react-native";
import AppBar from "../components/AppBar";
import "../global.css";

export default function Layour() {
  return (
    <View>
      <Stack
        screenOptions={{
          HeaderStyle: { backgroundColor: "#222" },
          headerTintColor: "#fff",
          headerTitleStyle: "",
        }}
      />
      <View>
        <AppBar />
      </View>
    </View>
  );
}
