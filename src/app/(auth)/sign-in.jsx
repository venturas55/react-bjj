import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "../../constants";
import { CustomButton, FormField } from "./../../components";
/* import { getCurrentUser, signIn } from "../../lib/appwrite"; */
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLogged, setLoading } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    usuario: "",
    contrasena: "",
  });

  const submit = async () => {
    if (form.usuario === "" || form.contrasena === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        "http://adriandeharo.es:7001/api/login",
        {
          usuario: form.usuario, // Usamos el email como 'username'
          contrasena: form.contrasena,
        },
      );
      const { token, user } = response.data;

      // Guardar el token JWT en AsyncStorage
      await AsyncStorage.setItem("authToken", token);

      if (response.data.success) {
        // Si el login es exitoso, navega al siguiente screen
        setIsLogged(true);
        setUser(user);
        router.replace("/");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.dreamart}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to DreamArt (auth)/sign-in
          </Text>

          <FormField
            title="Usuario"
            value={form.usuario}
            handleChangeText={(e) => setForm({ ...form, usuario: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.contrasena}
            handleChangeText={(e) => setForm({ ...form, contrasena: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
