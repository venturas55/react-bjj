import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { images } from "../../constants";
import { CustomButton, FormField } from "./../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  API_URL,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
  ERROR_MESSAGES,
} from "../../config/constants";
import { getCurrentUser } from "../../lib/funciones";

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    usuario: "",
    contrasena: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.usuario.trim()) {
      newErrors.usuario = "Username is required";
    }
    if (!form.contrasena) {
      newErrors.contrasena = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = async () => {
    console.log("1. Submit started with form:", form);
    if (!validateForm()) {
      console.log("2. Form validation failed");
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      console.log("3. Making API request to:", `${API_URL}/api/login`);
      const response = await axios.post(
        `${API_URL}/api/login`,
        {
          usuario: form.usuario.trim(),
          contrasena: form.contrasena,
        },
        {
          timeout: 10000, // 10 second timeout
        },
      );
      console.log("4. API Response:", response.data);

      if (!response.data.success) {
        console.log("5. Login failed:", response.data.message);
        Alert.alert("Error", response.data.message || "Login failed");
        return;
      }

      const { token, user } = response.data;
      console.log("6. Got token and user:", {
        token,
        tokenLength: token?.length,
        user,
        userId: user?.id,
      });

      // Make sure token is properly formatted
      const finalToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      console.log("7. Final token:", finalToken);

      console.log("8. Storing token and user data...");
      await Promise.all([
        AsyncStorage.setItem(TOKEN_STORAGE_KEY, finalToken),
        AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)),
      ]);

      console.log("9. Setting axios default header");
      axios.defaults.headers.common["Authorization"] = finalToken;
      console.log(
        "10. Auth header set:",
        axios.defaults.headers.common["Authorization"],
      );

      console.log("11. Getting full user profile");
      const userProfile = await getCurrentUser();
      if (userProfile) {
        console.log("12. Setting user state with full profile");
        setUser(userProfile);
        setIsLogged(true);

        console.log("13. Navigation to home");
        router.replace("/");
      } else {
        console.log("ERROR: Could not get user profile");
        Alert.alert("Error", "Could not get user profile");
      }
    } catch (error) {
      console.log("ERROR in submit:", error.message);
      if (error.response) {
        console.log("ERROR Status:", error.response.status);
        console.log("ERROR Data:", error.response.data);
      } else if (error.request) {
        console.log("ERROR Request:", error.request);
      }
      let errorMessage = ERROR_MESSAGES.GENERAL_ERROR;

      if (error.response) {
        // Server responded with error
        errorMessage =
          error.response.data?.message || ERROR_MESSAGES.INVALID_CREDENTIALS;
      } else if (error.request) {
        // No response received
        errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      }

      Alert.alert("Error", errorMessage);
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-600">
      <ScrollView>
        <View className=" ">
          <Image source={images.dreamart} className="self-center " />
        </View>

        <View className="px-5">
          <FormField
            title="Username"
            placeholder="Enter your username"
            value={form.usuario}
            onChangeText={(text) => {
              setForm({ ...form, usuario: text });
              if (errors.usuario) setErrors({ ...errors, usuario: "" });
            }}
            error={errors.usuario}
            autoCapitalize="none"
            editable={!isSubmitting}
          />

          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.contrasena}
            onChangeText={(text) => {
              setForm({ ...form, contrasena: text });
              if (errors.contrasena) setErrors({ ...errors, contrasena: "" });
            }}
            secureTextEntry
            error={errors.contrasena}
            editable={!isSubmitting}
          />

          <CustomButton
            title={isSubmitting ? "Signing in..." : "Sign In"}
            onPress={submit}
            disabled={isSubmitting}
            style={{ marginTop: 10 }}
          >
            {isSubmitting && (
              <ActivityIndicator color="white" style={{ marginLeft: 10 }} />
            )}
          </CustomButton>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
            className="my-5"
          >
            <Text>Don't have an account? </Text>
            <Link href="/sign-up" style={{ color: "#007AFF" }}>
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
