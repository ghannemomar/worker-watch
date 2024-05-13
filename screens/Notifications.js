import { Center, Text, VStack, View } from "native-base";
import React from "react";
import DrawerHeader from "../components/headers/DrawerHeader";
import { Ionicons } from "@expo/vector-icons";

const Notifications = () => {
  return (
    <VStack bg="blueGray.900" flex={1}>
      <DrawerHeader />
      <View>
        <Text
          textAlign="center"
          fontFamily="Medium"
          fontSize="lg"
          mt="2"
          color="white"
        >
          Notifications Here
        </Text>
      </View>
    </VStack>
  );
};

export default Notifications;
