import { HStack, Icon, Pressable, Text, View } from "native-base";
import React from "react";
import { Dimensions, Image, Linking, ScrollView, StyleSheet } from "react-native";
import BackHeader from "../components/headers/BackHeader";
import { FontAwesome6 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import { mapStyle } from "../utils/mapStyle";
import { Feather } from "@expo/vector-icons";

const UserInfo = ({ navigation, route }) => {
  const user = route.params;
  const width = Dimensions.get("window").width;
  

  
  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View flex={1} bg="blueGray.700">
      <BackHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View px="2">
          {/* user */}
          <View
      onPress={() => navigation.navigate("UserInfo", user)}
      mt="2"
      flexDirection="row"
      bg="blueGray.800"
      px="2"
      py="4"
      borderRadius='md'
      mb="1"
    >
          <Image
       source={{ uri: user.image }}
       style={{ width: 60, height: 60, borderRadius: 30 }}
     />
          <HStack
        flex={1}
        mr="1"
        ml="3"
        alignItems="center"
        justifyContent="space-between"
      >
        <View mt="1">
          <Text fontFamily="Medium" fontSize='lg'>
            {user.firstname} {user.lastname}
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
      </View>
          
          {/* cards */}
          <View >
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {/* card 1 heart */}
              <View
                bg="blueGray.800"
                borderRadius="md"
                mt="2"
                alignItems="center"
                py="4"
                style={{ width: "49%" }}
              >
                <Icon
                  as={FontAwesome6}
                  name="heart-pulse"
                  color="warmGray.200"
                  size="5xl"
                />
                <Text
                  color="warmGray.200"
                  textAlign="center"
                  fontFamily="Bold"
                  fontSize="md"
                  mt="3"
                >
                  Heart Rate
                </Text>
                <Text
                  textAlign="center"
                  color="warmGray.200"
                  fontSize="md"
                  fontFamily="Medium"
                  mt="0.5"
                >
                  81
                  <Text fontSize="sm" fontFamily="Light">
                    {" "}
                    BTS
                  </Text>
                </Text>
              </View>
              {/* card 2 blood pressure */}
              <View
                bg="blueGray.800"
                borderRadius="md"
                mt="2"
                alignItems="center"
                py="4"
                style={{ width: "49%" }}
              >
                <Icon
                  as={FontAwesome6}
                  name="heart-pulse"
                  color="warmGray.200"
                  size="5xl"
                />
                <Text
                  color="warmGray.200"
                  textAlign="center"
                  fontFamily="Bold"
                  fontSize="md"
                  mt="3"
                >
                  Blood Pressure
                </Text>
                <Text
                  textAlign="center"
                  color="warmGray.200"
                  fontSize="md"
                  fontFamily="Medium"
                  mt="0.5"
                >
                  120/75
                  <Text fontSize="sm" fontFamily="Light">
                    {" "}
                    u
                  </Text>
                </Text>
              </View>
              {/* card 3 temperature */}
              <View
                bg="blueGray.800"
                borderRadius="md"
                mt="2"
                alignItems="center"
                py="4"
                style={{ width: "49%" }}
              >
                <Icon
                  as={FontAwesome6}
                  name="temperature-high"
                  color="warmGray.200"
                  size="5xl"
                />
                <Text
                  color="warmGray.200"
                  textAlign="center"
                  fontFamily="Bold"
                  fontSize="md"
                  mt="3"
                >
                  Temperature
                </Text>
                <Text
                  textAlign="center"
                  color="warmGray.200"
                  fontSize="md"
                  fontFamily="Medium"
                  mt="0.5"
                >
                  36.5
                  <Text fontSize="sm" fontFamily="Light">
                    {" "}
                    °C
                  </Text>
                </Text>
              </View>
              {/* card 4 SpO2 */}
              <View
                bg="blueGray.800"
                borderRadius="md"
                mt="2"
                alignItems="center"
                py="4"
                style={{ width: "49%" }}
              >
                <Icon
                  as={FontAwesome6}
                  name="heart-pulse"
                  color="warmGray.200"
                  size="5xl"
                />
                <Text
                  color="warmGray.200"
                  textAlign="center"
                  fontFamily="Bold"
                  fontSize="md"
                  mt="3"
                >
                  SpO2
                </Text>
                <Text
                  textAlign="center"
                  color="warmGray.200"
                  fontSize="md"
                  fontFamily="Medium"
                  mt="0.5"
                >
                  90
                  <Text fontSize="sm" fontFamily="Light">
                    {" "}
                    %
                  </Text>
                </Text>
              </View>
            </View>

            {/* card 5 Stress */}
            <View
              bg="blueGray.800"
              borderRadius="md"
              mt="1"
              alignItems="center"
              alignSelf="center"
              py="4"
              style={{ width: "49%" }}
            >
              <Icon
                as={Fontisto}
                name="smiley"
                color="warmGray.200"
                size="5xl"
              />
              <Text
                color="warmGray.200"
                textAlign="center"
                fontFamily="Bold"
                fontSize="md"
                mt="3"
              >
                Stress
              </Text>
              <Text
                textAlign="center"
                color="warmGray.200"
                fontSize="md"
                fontFamily="Medium"
                mt="0.5"
              >
                Calm
              </Text>
            </View>
            {/* maps */}
            <View bg='blueGray.300' mb='4' p='1' borderRadius='md' mt='3'>
              <MapView
                customMapStyle={mapStyle}
                initialRegion={{
                  latitude: 36.7072051, // Specify your latitude here
                  longitude: 10.4096896, // Specify your longitude here
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.0421,
                }}
                style={{
                  width: "100%",
                  alignSelf: "center",
                 
                  height: 300,
                }}
              >
                <Marker
                  coordinate={{ latitude: 36.7072051, longitude: 10.4096896 }}
                />
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  customMarker: {
    backgroundColor: "warmGray.200",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  title: {
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
  },
});
