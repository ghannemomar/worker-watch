import { Center, VStack, View } from "native-base";
import React from "react";
import DrawerHeader from "../components/headers/DrawerHeader";
import { Ionicons } from "@expo/vector-icons";

const Notifications = () => {
  return (
    <VStack bg="blueGray.900" flex={1}>
      <DrawerHeader />
      <View>
        <Ionicons name="notifications-outline" size={28} color="#d4d4d8"  />
      </View>
    </VStack>
  );
};

export default Notifications;
