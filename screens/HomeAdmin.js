import React, { useEffect } from "react";
import { ScrollView,  Text, VStack, View } from "native-base";
import DrawerHeader from "../components/headers/DrawerHeader";
import UserItem from "../components/UserItem";
import * as Notifications from 'expo-notifications';
import * as Device from "expo-device";
import { Platform } from "react-native";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const users = [
  {
    id:'1',
    firstname: "Omar",
    role: "user",
    email: "Omar@live.fr",
    phone:'97484810',
    lastname: "Ghannem",
    actif:true,
    image:'https://scontent.ftun15-1.fna.fbcdn.net/v/t1.6435-9/165062964_895476864542969_4323307619325186755_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BeXWoqsGgK4Ab7rO5ry&_nc_ht=scontent.ftun15-1.fna&oh=00_AfAnS5ggZtmzOxpxedJQW57_JmfOnuzNU2OjjfE6vN3BBg&oe=66531C14'
  },
  {
    id:'2',
    firstname: "Khalil",
    role: "user",
    email: "khalil@live.fr",
    phone:'54132634',
    lastname: "chikhaoui",
    actif:false,
    image:'https://scontent.ftun15-1.fna.fbcdn.net/v/t39.30808-6/319117343_531472655570294_2471450120294739614_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XcUfL6jSys8Ab4r0Tc1&_nc_ht=scontent.ftun15-1.fna&oh=00_AfBVES5KGJpBwGUwbtiKRps2YSJO_56EUgMHJufmm5IDvg&oe=663153F0'
  },
  
]

function HomeAdmin() {

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

      console.log('token is : ', token)
     
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

useEffect(()=> {
  registerForPushNotificationsAsync()
},[])

  return <VStack bg='blueGray.900' flex={1}>
    <DrawerHeader />
    <ScrollView showsVerticalScrollIndicator={false}>
    <View px="2" mt="2">
    <Text color='gray.200' fontSize="xl" fontFamily="Bold">Users List</Text>
    {users.map(user => <UserItem key={user.id} user={user} />)}
    </View>
      
    </ScrollView>
  </VStack>
}

export default HomeAdmin;

