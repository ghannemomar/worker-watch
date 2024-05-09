import { HStack, Icon, Pressable, Spinner, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { Fontisto } from "@expo/vector-icons";
import { mapStyle } from "../utils/mapStyle";
import { FontAwesome,Ionicons,FontAwesome5 } from "@expo/vector-icons";
import * as Location from "expo-location";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setActifSession, setUserData } from "../redux/Actions";
import axios from "axios";
import SessionChrono from "../components/SessionChrono";
import FallModal from "../components/FallModal";
import { Accelerometer } from "expo-sensors";


const handleCallPress = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

const HomeUser = ({ navigation }) => {
 const userData = useSelector(state => state.userData)
 const [loader,setLoader] = useState(true)
 const actifSession = useSelector(state => state.actifSession)
 const [showFallModal,setShowFallModal] = useState(false)
 console.log('active session is ! ', actifSession) 
 const dispatch = useDispatch()


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }      
    })();
  }, []);


  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    Accelerometer.setUpdateInterval(500); // updates every 500 ms

    Accelerometer.addListener((accelerometerData) => {
     
      const {x,y,z} = accelerometerData
      const totalForce = Math.sqrt(x * x + y * y + z * z);
    if (totalForce < 0.5 || totalForce > 2.5) {
      // Threshold values to tweak based on testing
       setShowFallModal(true)
      // After detecting a fall, you might want to do something like alerting a contact or triggering an alarm
    } else {
      
    }
    });
  };

  
  
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async() => {
      await dispatch(setUserData())
      await dispatch(setActifSession())
      setLoader(false)

    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const createSession = async () => {
    let location = await Location.getCurrentPositionAsync({});
   axios.post(`${URL}/sessions/create-session`,{
    user:userData._id,
    location : {latitude: location.coords.latitude, longitude: location.coords.longitude}
   }).then(async ()=> {
    await dispatch(setActifSession())
   }).catch(err => {
    console.log(err)
   })
  }

  return (
    <View flex={1} bg="blueGray.900">
       
        {loader ? <View flex={1} alignItems='center' justifyContent='center'>
          <Spinner  size='lg' color="white" />
        </View>:    <ScrollView showsVerticalScrollIndicator={false}>
           <View px="2" mt="2">
             {/* user */}
             <View
               mt="2"
               flexDirection="row"
               bg="blueGray.800"
               px="2"
               py="4"
               borderRadius="md"
               mb="1"
             >
              {userData.image ? <Image
                 source={{ uri: `${URL}/${userData.image}` }}
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
                   <Text fontFamily="Medium" fontSize="lg">
                     {userData.firstname} {userData.lastname}
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
                     await dispatch(removeUser())
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
             {/** session */}
{actifSession == null ?   <View
               mt="2"
               flexDirection="row"
               bg="blueGray.800"
               px="2"
               py="4"
               borderRadius="md"
               mb="1"
               w="full"
               justifyContent='space-between'
               alignItems="center"
             >
              <View>
             <Text fontFamily='Medium' fontSize="md">No active Session</Text>
             <Text fontFamily='Light' fontSize="xs" color="blueGray.300">Click on Play to start session.</Text>
                </View>
                <TouchableOpacity onPress={createSession}>
             <FontAwesome name="play-circle" size={40} color="white" />
                </TouchableOpacity>
             
             </View> : <View>
              <SessionChrono />
               {/* maps */}
             {actifSession &&       <View bg="blueGray.600" mb="1" p="1" borderRadius="md" mt="2">
                 <MapView
                   customMapStyle={mapStyle}
                   initialRegion={{
                     latitude: 36.7072051,
                     longitude: 10.4096896,
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
                     coordinate={{ latitude: actifSession.location.latitude, longitude: actifSession.location.longitude }}
                   />
                 </MapView>
               </View>}
              </View> }
             {/** emergency calls */}
            <HStack alignItems="center" space="2">
            <Pressable  bg="warning.500" py="2" flex={1} my="2" borderRadius="md" alignItems="center" justifyContent="center" alignSelf="center"  onPress={() => handleCallPress('97470082')}  >
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
                     {userData.temperature}20
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
               
             </View>
            
           </View>
         </ScrollView>}
         {showFallModal && <FallModal isOpen={showFallModal} closeHandler={()=> setShowFallModal(false)}/>}
   
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
