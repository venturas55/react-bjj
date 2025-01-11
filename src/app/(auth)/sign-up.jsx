import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { images } from "../../constants";
import { createUser } from "../../lib/funciones";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    usuario: "",
    email: "",
    password: "",
    nombre: "",
    apellidos: "",
  });

  const submit = async () => {
    if (form.usuario === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(
        form.email,
        form.password,
        form.usuario,
        form.nombre,
        form.apellidos,
      );
      setUser(result);
      setIsLogged(true);

      router.replace("/");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-slate-900 h-full">
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
            Sign Up to DreamArt
          </Text>

          <FormField
            title="Username"
            value={form.usuario}
            handleChangeText={(e) => setForm({ ...form, usuario: e })}
          />
          <FormField
            title="Nombre"
            value={form.nombre}
            handleChangeText={(e) => setForm({ ...form, nombre: e })}
          />
          <FormField
            title="Apellidos"
            value={form.apellidos}
            handleChangeText={(e) => setForm({ ...form, apellidos: e })}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-400 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/(auth)/sign-in"
              className="text-lg font-psemibold text-grey-100"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
