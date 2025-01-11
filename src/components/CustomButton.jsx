import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
  disabled,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`bg-purple-500 rounded-xl w-full justify-center items-center mt-7 ${containerStyles} ${
        isLoading || disabled ? "opacity-50" : ""
      }`}
      style={style}
      disabled={isLoading || disabled}
    >
      <Text className={`text-inherit font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
