import { View, Text, Image, StyleSheet } from "react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import BeltComponent from "./BeltComponent";
import getFetch from "../hooks/getFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./CustomButton";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../config/constants";
import { API_URL } from "../config/constants";

const Perfil = () => {
  const { user, isLogged, setIsLogged, setUser, loading } = useGlobalContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user && user.id) {
          const data = await getFetch(`${API_URL}/api/usuario/${user.id}`);
          if (data) {
            setUser(data);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.id]);

  const handleLogout = async () => {
    try {
      console.log("Starting logout process");
      // Remove both token and user data
      await AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);
      
      // Clear global state
      setIsLogged(false);
      setUser(null);
      
      // Clear axios default header
      delete axios.defaults.headers.common["Authorization"];
      
      console.log("Logout successful, redirecting to sign-in");
      // Navigate to sign-in
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View className="text-current content-center items-center mb-5">
        <Image
          source={{ uri: user.pictureURL }}
          style={styles.profileImage}
          className="w-32 h-32 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold mb-2">
          {user.nombre} {user.apellidos}
        </Text>
        <BeltComponent cinturon={user.cinturon} grado={user.grado} />
        <Text className="text-gray-600 mb-1">{user.email}</Text>
        <Text className="text-gray-600 mb-4">{user.telefono}</Text>
      </View>

      <CustomButton
        text="Cerrar Sesión"
        onPress={handleLogout}
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#ff4444",
  }
});

export default Perfil;
