import React from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
    color: "white",
  },
  boton: {
    backgroundColor: "#aee",
    alightItems: "center",
    justifyContent: "center",
    margin: 12,
    padding: 10,
    borderRadius: 5,
    marginBottom: 8,
    color: "white",
  },
});

export default function LogInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="First name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        styles={styles.campo}
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />

      <Button
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        style={styles.boton}
      />
    </View>
  );
}
