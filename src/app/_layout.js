import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider from "../context/GlobalProvider";
import "../global.css";

export default function Layout() {
  return (
    <GlobalProvider>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#aaaaaa",
            },
            headerTintColor: "#afa",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {/* Optionally configure static options outside the route.*/}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </GlobalProvider>
  );
}
