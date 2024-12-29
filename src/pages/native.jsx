import React from "react";
import { Text } from "react-native";
import { verifyInstallation } from "nativewind";

function Native() {
  // Ensure to call inside a component, not globally
  verifyInstallation();

  return <Text>Native Wind</Text>;
}

export default Native;
