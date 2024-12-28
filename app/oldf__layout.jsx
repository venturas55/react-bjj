import { Tabs } from "expo-router";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#222",
        },
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tabs.screen
        name="Home"
        options={{
          title: "Home}",
        }}
      />
      <Tabs.screen
        name="Login"
        options={{
          title: "Login",
        }}
      />
    </Tabs>
  );
}
