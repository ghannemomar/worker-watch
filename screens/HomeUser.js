import { HStack, Icon, Pressable, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Linking, ScrollView, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import { mapStyle } from "../utils/mapStyle";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeUser = ({ navigation }) => {

  const [location, setLocation] = useState()

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('location is : ',location)
    })();
  }, []);

  const user = {
    id:'2',
    firstname: "Khalil",
    role: "user",
    email: "khalil@live.fr",
    phone:'54132634',
    lastname: "chikhaoui",
    temperature:34,
    actif:false,
    image:'https://scontent.ftun15-1.fna.fbcdn.net/v/t39.30808-6/319117343_531472655570294_2471450120294739614_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XcUfL6jSys8Ab4r0Tc1&_nc_ht=scontent.ftun15-1.fna&oh=00_AfBVES5KGJpBwGUwbtiKRps2YSJO_56EUgMHJufmm5IDvg&oe=663153F0'
  }
  const width = Dimensions.get("window").width;
  
  return (
    <View flex={1} bg="blueGray.700">
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View px="2" mt='2'>
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
        <Pressable  onPress={async()=> {
           await AsyncStorage.removeItem('user')
            navigation.reset({
                index: 0,
                routes: [{ name: "Signin" }],
              });
        }} alignItems="center" bg='blueGray.700' justifyContent='center'  w='12' h='12' borderRadius='full'>
        <Ionicons name="log-out-outline" size={28} color="#d4d4d8" />
        </Pressable>
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
                  {user.temperature}
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

export default HomeUser;

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
