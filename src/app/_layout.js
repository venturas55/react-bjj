import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import GlobalProvider from "../context/GlobalProvider";
import "../global.css";

export default function Layout() {
  return (
    <GlobalProvider>
      <SafeAreaProvider>
        <Stack
          className="bg-slate-900"
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
          <Stack.Screen name="(actividades)" options={{ headerShown: false }} />
          <Stack.Screen name="(clases)" options={{ headerShown: false }} />
          {/*        <Stack.Screen
            name="edit" // Nombre de la ruta dinámica edit/[actividad_id]
            options={{
              headerShown: false, // Puedes mostrar u ocultar el encabezado si lo deseas
            }}
          /> */}
          <Stack.Screen
            name="actividades/edit/[actividad_id]" // Esta es la ruta dinámica que corresponde al archivo en actividades/edit/[actividad_id].jsx
            options={{
              headerShown: false, // Aquí puedes elegir si mostrar o no el encabezado
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </GlobalProvider>
  );
}
