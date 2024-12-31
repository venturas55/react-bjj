import {
  HomeIcon,
  ChatIcon,
  CreditCardIcon,
  SearchIcon,
  RankingIcon,
  UserIcon,
  CalendarIcon,
} from "../../components/Icons";
import { Redirect, Tabs } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

export default function TabLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendario",
          tabBarIcon: ({ color }) => <CalendarIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="asistencia"
        options={{
          title: "Historia",
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />

      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ color }) => <RankingIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="mensajeria"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <ChatIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="membresia"
        options={{
          title: "Membresia",
          tabBarIcon: ({ color }) => <CreditCardIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="sign-in"
        options={{
          title: "Login",
          tabBarIcon: ({ color }) => <UserIcon color={color} />,
        }}
      />
    </Tabs>
  );
}
