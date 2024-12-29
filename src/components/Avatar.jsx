import { Text, Image, StyleSheet } from "react-native";

const Avatar = ({ id }) => {
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

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
});

export default Avatar;
