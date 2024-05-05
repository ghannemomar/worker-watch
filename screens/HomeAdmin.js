import React, { useEffect, useState } from "react";
import { Fab, Icon, ScrollView, Skeleton, Text, VStack, View } from "native-base";
import DrawerHeader from "../components/headers/DrawerHeader";
import UserItem from "../components/UserItem";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, RefreshControl } from "react-native";
import axios from "axios";
import { URL } from "../utils/constants";
import { AntDesign } from "@expo/vector-icons";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function HomeAdmin({navigation}) {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshLoader, setRefreshLoader] = useState(false);
  // get user token for notification
  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#ffffff",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }

      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "46f68428-0548-4802-b92a-d0381e75011a",
        })
      ).data;

      console.log("token is : ", token);

      // if (Platform.OS == "android") {
      //   axios.put(process.env.USER_UPDATE, {
      //     notification_android: token,
      //     access_token: TOKEN,
      //   });
      // } else {
      //   axios.put(process.env.USER_UPDATE, {
      //     notification_ios: token,
      //     access_token: TOKEN,
      //   });
      // }
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    return token;
  }

  // get all users list
  const getAllUsers = async () => {
    axios.get(`${URL}/users`).then(res => {
      setUsers(res.data)
      setLoader(false)
      setRefreshLoader(false)
    }).catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
     getAllUsers()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <VStack bg="blueGray.900" flex={1}>
      <DrawerHeader />
      <ScrollView refreshControl={<RefreshControl onRefresh={getAllUsers} refreshing={refreshLoader} />} showsVerticalScrollIndicator={false}>
        
        <View px="2" mt="2">
          <Text color="gray.200" fontSize="xl" fontFamily="Bold">
            Users List
          </Text>
          {loader
            ? ["1", "2", "3", "4", "5", "6", "7"].map((el) => (
                <Skeleton mt="2" key={el} h="24" borderRadius="md" />
              ))
            : 
            <View>
{users.map((user) => <UserItem key={user._id} user={user} />)}

            </View>
            }
        </View>

      </ScrollView>
      <Fab onPress={()=> navigation.navigate('CreateUser')} renderInPortal={false} bg="blueGray.500" _pressed={{bg:'blueGray.700'}} shadow={2} size={16} icon={<Icon color="white" as={AntDesign} name="plus" size="xl" />} />
    </VStack>
  );
}

export default HomeAdmin;
