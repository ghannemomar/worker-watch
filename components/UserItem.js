import { useNavigation } from "@react-navigation/native";
import { HStack, Link, Pressable, Text, View } from "native-base";
import React from "react";
import { Image, Linking } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { URL } from "../utils/constants";

const UserItem = ({ user, onLongPress }) => {
  const navigation = useNavigation();

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <Pressable
      onPress={() => navigation.navigate("UserInfo", user)}
      onLongPress={onLongPress}
      mt="2"
      flexDirection="row"
      bg="blueGray.800"
      px="2"
      py="4"
      borderRadius="md"
    >
      {user.image ? (
        <Image
          source={{ uri: `${URL}/${user.image}` }}
          style={{ width: 60, height: 60, borderRadius: 30 }}
        />
      ) : (
        <View
          alignItems="center"
          style={{ width: 60, height: 60 }}
          justifyContent="center"
        >
          <FontAwesome5 name="user-alt" size={45} color="white" />
        </View>
      )}
      <HStack
        flex={1}
        mr="1"
        ml="3"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <View mt="1">
          <Text fontFamily="Medium">
            {user.firstname} {user.lastname}
          </Text>
          <Text fontFamily="Light" fontSize="xs" color="gray.300">
            {user.email}
          </Text>
          <Text
            color="indigo.300"
            fontWeight="medium"
            fontSize="sm"
            textDecorationLine="underline"
          >
            show more
          </Text>
        </View>
        <View alignItems="flex-end">
          <View
            borderRadius="md"
            py="0.5"
            px="3"
            bg={user.actif ? "green.700" : "red.700"}
          >
            <Text fontSize="xs">{user.actif ? "Actif" : "Inactif"}</Text>
          </View>
          <Pressable onPress={() => handleCallPress(user.phone)} mt="4">
            <Feather name="phone" size={20} color="white" />
          </Pressable>
        </View>
      </HStack>
    </Pressable>
  );
};

export default UserItem;
