import { HStack, Icon, Pressable, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import { mapStyle } from "../utils/mapStyle";
import { MaterialIcons,Ionicons,FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils/constants";


const handleCallPress = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

const HomeUser = ({ navigation }) => {
  const [location, setLocation] = useState();
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("location is : ", location);
    })();
  }, []);

  
  const getUserData = async () => {
    const u = await AsyncStorage.getItem("user");
    const userData = JSON.parse(u);   
    setUser(userData);
  };

  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const width = Dimensions.get("window").width;

  console.log(user)
  return (
    <View flex={1} bg="blueGray.900">
       {user == null ? null : (
           <ScrollView showsVerticalScrollIndicator={false}>
           <View px="2" mt="2">
             {/* user */}
             <View
               onPress={() => navigation.navigate("UserInfo", user)}
               mt="2"
               flexDirection="row"
               bg="blueGray.800"
               px="2"
               py="4"
               borderRadius="md"
               mb="1"
             >
              {user.image ? <Image
                 source={{ uri: `${URL}/${user.image}` }}
                 style={{ width: 60, height: 60, borderRadius: 30 }}
               /> : <FontAwesome5 name="user-alt" size={45}  color="white" />} 
               <HStack
                 flex={1}
                 mr="1"
                 ml="3"
                 alignItems="center"
                 justifyContent="space-between"
               >
                 <View mt="1">
                   <Text fontFamily="Medium" fontSize="md">
                     {user.firstname} {user.lastname}
                   </Text>
                 </View>
                <HStack alignItems='center' space="2">
                <Pressable
                   onPress={async () => {
                    navigation.navigate('SettingsUser')
                   }}
                   alignItems="center"
                   bg="blueGray.700"
                   justifyContent="center"
                   w="10"
                   h="10"
                   borderRadius="full"
                 >
                   <Ionicons name="settings" size={24} color="#fff" />
                 </Pressable>
   
                <Pressable
                   onPress={async () => {
                     await AsyncStorage.removeItem("user");
                     navigation.reset({
                       index: 0,
                       routes: [{ name: "Signin" }],
                     });
                   }}
                   alignItems="center"
                   bg="red.800"
                   justifyContent="center"
                   w="10"
                   h="10"
                   borderRadius="full"
                 >
                   <Ionicons name="log-out-outline" size={24} color="#fff" />
                 </Pressable>
              
                </HStack>
               </HStack>
             </View>
            <HStack alignItems="center" space="2">
            <Pressable  bg="warning.500" py="2" flex={1} my="2" borderRadius="md" alignItems="center" justifyContent="center" alignSelf="center"  onPress={() => handleCallPress('198')}  >
             <Ionicons name="warning" size={
              60
             } color="white" />
             <Text mt="1" fontFamily="Bold">Call Supervisor</Text>
             </Pressable>
            <Pressable  bg="red.500" py="2" flex={1} my="2" borderRadius="md" alignItems="center" justifyContent="center" alignSelf="center"  onPress={() => handleCallPress('198')}  >
             <Ionicons name="warning" size={
              60
             } color="white" />
             <Text mt="1" fontFamily="Bold">Call emergency</Text>
             </Pressable>
           
            </HStack>
   
             {/* cards */}
             <View>
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
                  <Image source={require('../assets/blood-pressure.png')} style={{width:50,height:50}}/>
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
                     {user.temperature}20
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
                  <Image source={require('../assets/spo2.png')} style={{width:50,height:50}}/>
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
               <View bg="blueGray.300" mb="4" p="1" borderRadius="md" mt="3">
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
       )}
   
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
