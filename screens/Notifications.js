import { HStack, ScrollView, Spinner, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { URL } from "../utils/constants";
import DrawerHeader from "../components/headers/DrawerHeader";
import axios from "axios";
import { RefreshControl } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const Notifications = ({ navigation }) => {
  const [loader, setLoader] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [refreshLoader, setRefreshLoader] = useState(false);

  const getNotifications = async () => {
    setRefreshLoader(true);
    axios.get(`${URL}/notifications`).then((res) => {
      setNotifications(res.data);
      setRefreshLoader(false);
      setLoader(false);
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getNotifications();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <VStack bg="blueGray.900" flex={1}>
      <DrawerHeader />
      {loader ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Spinner color="white" size="lg" />
        </View>
      ) : (
        <View px="2" flex={1}>
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={getNotifications}
                refreshing={refreshLoader}
              />
            }
            showsVerticalScrollIndicator={false}
          >
            {notifications.map((notif) => {
              return (
                <View
                  bg="blueGray.700"
                  borderRadius="md"
                  mt="4"
                  px="2"
                  py="4"
                  key={notif._id}
                >
                  <HStack
                    borderBottomWidth="1"
                    paddingBottom="2"
                    borderBottomColor="white"
                    alignItems="flex-start"
                  >
                    <Ionicons
                      name="notifications-sharp"
                      size={24}
                      color="white"
                    />
                    <VStack flex={1}>
                      <Text ml="2" mb="1" fontFamily="Bold" fontSize="md">
                        {notif.title}
                      </Text>
                      <Text ml="2" fontFamily="Light">
                        {notif.body}
                      </Text>
                    </VStack>
                  </HStack>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    mx="2"
                    mt="3"
                  >
                    <Text fontFamily="Medium">Session started at</Text>
                    <Text fontFamily="Light">
                      {moment(notif.sessionData.start_time).format("LLL")}
                    </Text>
                  </HStack>
                  <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    mx="2"
                    mt="1"
                  >
                    <Text fontFamily="Medium">Fall incident at</Text>
                    <Text fontFamily="Light">
                      {moment(notif.sessionData.fallAt).format("LLL")}
                    </Text>
                  </HStack>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </VStack>
  );
};

export default Notifications;
