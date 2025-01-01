import { Image, StyleSheet } from "react-native";

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
          uri: "http://adriandeharo.es:7001/api/usuario/foto/" + id,
        }}
      />
    </>
  );
};

export default Avatar;
