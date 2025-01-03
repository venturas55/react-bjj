import { useState } from "react";
import { Text, View, ScrollView, Image, Dimensions, Alert } from "react-native";
import { Link, router } from "expo-router";
import { FormField, CustomButton } from "./../../components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser } from "./../../lib/funciones";
export default function Index() {
  const { setUser, setIsLogged } = useGlobalContext();
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
      //await signIn(form.usuario, form.password);
      const result = await getCurrentUser(form.usuario, form.contrasena);
      setUser(result);
      setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaProvider className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to DreamArt
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
    </SafeAreaProvider>
  );
}
