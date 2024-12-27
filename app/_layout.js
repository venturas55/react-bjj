import { Stack } from "expo-router";
import { View, Text } from "react-native";
/* import "../global.css"; */
import Logo from "../components/Logo"; // Adjust the import path as necessary

export default function Layour() {
  return (
    <View className="flex-1 bg-black">
      <Stack
        screenOptions={{
          HeaderStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitleStyle: "",
        }}
      />
    </View>
  );
}
