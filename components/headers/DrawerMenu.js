import { Image } from "react-native";
import React from "react";
import { Pressable, Text, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerMenu = ({navigation}) => {
  return (
    <View bg='blueGray.900' flex={1}>
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 120, height: 120, alignSelf: "center" }}
      />
      {/* home admin */}
      <Pressable
       mt='5'
        p="3"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        borderBottomWidth="1"
        borderColor="gray.600"
        onPress={()=> navigation.navigate('HomeAdmin')}
      >
        <View>
          <Ionicons name="home-outline" size={28} color="#d4d4d8" />
        </View>
        <View mx="3">
          <Text color="gray.300" fontFamily="SemiBold" fontSize="md">
            Dashboard
          </Text>
        </View>
      </Pressable>
      {/* notifcations */}
      <Pressable
        p="3"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        borderBottomWidth="1"
        borderColor="gray.600"
        onPress={()=> navigation.navigate('Notifications')}
      >
        <View>
          <Ionicons name="notifications-outline" size={28} color="#d4d4d8" />
        </View>
        <View mx="3">
          <Text color="gray.300" fontFamily="SemiBold" fontSize="md">
            Notifications
          </Text>
        </View>
      </Pressable>
      {/* settings */}
      <Pressable
        p="3"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
        borderBottomWidth="1"
        borderColor="gray.600"
        onPress={()=> navigation.navigate('SettingsAdmin')}
      >
        <View>
          <Ionicons name="settings-outline" size={28} color="#d4d4d8" />
        </View>
        <View mx="3">
          <Text color="gray.300" fontFamily="SemiBold" fontSize="md">
            Settings
          </Text>
        </View>
      </Pressable>
       {/* settings */}
       <Pressable
        p="3"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
       
        onPress={ async()=> {
          await AsyncStorage.removeItem('user')
            navigation.reset({
                index: 0,
                routes: [{ name: "Signin" }],
              });
        }}
      >
        <View>
          <Ionicons name="log-out-outline" size={28} color="#d4d4d8" />
        </View>
        <View mx="3">
          <Text color="gray.300" fontFamily="SemiBold" fontSize="md">
            Log Out
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default DrawerMenu;
