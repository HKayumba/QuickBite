import { Slot } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <SafeAreaView>
      <Text>Auth Layout</Text>
      {/* The Slot component renders the current route's component */}
      {/* You can add more layout components here if needed */}
      <Slot />
    </SafeAreaView>
  );
};

export default _layout;
