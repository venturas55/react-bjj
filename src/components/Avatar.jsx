import { Image, StyleSheet } from "react-native";
import { API_URL } from "../config/constants";

const Avatar = ({ id, size }) => {
  if (size === undefined) size = 40;
  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
      borderRadius: 20,
      marginRight: 8,
    },
  });
  return (
    <>
      <Image
        style={styles.image}
        source={{
          uri: `${API_URL}/api/usuario/foto/${id}`,
        }}
      />
    </>
  );
};

export default Avatar;
