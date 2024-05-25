import { HStack, Icon, Spinner, Text, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, ScrollView, StyleSheet } from "react-native";

import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import UserSessions from "../components/UserSessions";
import BackHeader from "../components/headers/BackHeader";
import { setActifSession } from "../redux/Actions";
import MapView from "react-native-maps";
import { Marker } from "react-native-svg";
import { mapStyle } from "../utils/mapStyle";

const UserInfo = ({ navigation, route }) => {
  const userData = route.params;

  const [loader, setLoader] = useState(false);
  const [sessionsLoader, setSesisonsLoader] = useState(true);
  const [refreshLoader, setRefreshLoader] = useState(false);
  const actifSession = useSelector((state) => state.actifSession);

  const dispatch = useDispatch();

  const [sessions, setSessions] = useState([]);
  const getSessions = async () => {
    setRefreshLoader(true);
    axios
      .get(`${URL}/sessions/user-sessions?user=${userData._id}`)
      .then((res) => {
        setRefreshLoader(false);
        setSessions(res.data);
        setSesisonsLoader(false);
      });
  };

  function calculateStats(numbers) {
    if (numbers.length === 0) {
      return {
        average: 0,
        min: 0,
        max: 0,
      };
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);

    return {
      average: parseFloat(average.toFixed(2)),
      min: parseFloat(min.toFixed(2)),
      max: parseFloat(max.toFixed(2)),
    };
  }

  useEffect(() => {
    dispatch(setActifSession(userData._id));
  }, []);

  const heartArray =
    actifSession && actifSession.heart_records.length > 0
      ? actifSession.heart_records.map((el) => el.value)
      : [];
  const caloriesArray =
    actifSession && actifSession.calories_records.length > 0
      ? actifSession.calories_records.map((el) => el.value)
      : [];
  const tempArray =
    actifSession && actifSession.temperature_records.length > 0
      ? actifSession.temperature_records.map((el) => el.value)
      : [];
  const heartStats = calculateStats(heartArray);
  const caloriesStats = calculateStats(caloriesArray);
  const temperatureStats = calculateStats(tempArray);
  const distance =
    actifSession && actifSession.distance_records.length > 0
      ? actifSession.distance_records[actifSession.distance_records.length - 1]
          .value
      : 0;

  /*useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await dispatch(setUserData());
      await dispatch(setActifSession());
      setLoader(false);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);*/

  return (
    <View flex={1} bg="blueGray.900">
      <BackHeader />
      {loader ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="white" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={getSessions}
              refreshing={refreshLoader}
            />
          }
          showsVerticalScrollIndicator={false}
        >
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
              {userData.image ? (
                <Image
                  source={{ uri: `${URL}/${userData.image}` }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              ) : (
                <FontAwesome5 name="user-alt" size={45} color="white" />
              )}
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
              </HStack>
            </View>
            {/** cards */}
            <View>
              {actifSession && (
                <View bg="blueGray.600" mb="1" p="1" borderRadius="md">
                  <MapView
                    customMapStyle={mapStyle}
                    initialRegion={{
                      latitude: actifSession.location.latitude,
                      longitude: actifSession.location.longitude,
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
                      coordinate={{
                        latitude: actifSession.location.latitude,
                        longitude: actifSession.location.longitude,
                      }}
                    />
                  </MapView>
                  {/* cards */}
                  <View w="full">
                    <View
                      flexDirection="row"
                      alignItems="stretch"
                      justifyContent="space-between"
                      flexWrap="wrap"
                      mt="2"
                    >
                      {/* card 1 heart rate */}
                      <View
                        bg="blueGray.900"
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
                          fontSize="xl"
                          mt="3"
                          borderBottomWidth="1"
                          borderBottomColor="white"
                          mb="2"
                        >
                          Heart Rate
                        </Text>
                        <Text
                          color="blueGray.200"
                          fontFamily="Bold"
                          fontSize="lg"
                        >
                          {heartStats.average} bpm
                        </Text>
                        <Text
                          textAlign="center"
                          color="blueGray.300"
                          fontSize="md"
                          fontFamily="Medium"
                          mt="0.5"
                        >
                          {heartStats.min} - {heartStats.max}
                          <Text fontSize="md" fontFamily="Light">
                            {" "}
                            bpm
                          </Text>
                        </Text>
                      </View>
                      {/* card 2 Calories */}
                      <View
                        bg="blueGray.900"
                        borderRadius="md"
                        mt="2"
                        alignItems="center"
                        py="4"
                        style={{ width: "49%" }}
                      >
                        <Icon
                          as={FontAwesome6}
                          name="fire"
                          color="warmGray.200"
                          size="5xl"
                        />

                        <Text
                          color="warmGray.200"
                          textAlign="center"
                          fontFamily="Bold"
                          fontSize="xl"
                          mt="3"
                          borderBottomWidth="1"
                          borderBottomColor="white"
                          mb="2"
                        >
                          Calories
                        </Text>
                        <Text
                          color="blueGray.200"
                          fontFamily="Bold"
                          fontSize="lg"
                        >
                          {caloriesStats.average} kcal
                        </Text>
                        <Text
                          textAlign="center"
                          color="blueGray.300"
                          fontSize="md"
                          fontFamily="Medium"
                          mt="0.5"
                        >
                          {caloriesStats.min} - {caloriesStats.max}
                          <Text fontSize="md" fontFamily="Light">
                            {" "}
                            kcal
                          </Text>
                        </Text>
                      </View>
                      {/* card 3 temperature */}
                      <View
                        bg="blueGray.900"
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
                          fontSize="xl"
                          mt="3"
                          borderBottomWidth="1"
                          borderBottomColor="white"
                          mb="2"
                        >
                          Temperature
                        </Text>
                        <Text
                          color="blueGray.200"
                          fontFamily="Bold"
                          fontSize="lg"
                        >
                          {temperatureStats.average} °C
                        </Text>
                        <Text
                          textAlign="center"
                          color="blueGray.300"
                          fontSize="md"
                          fontFamily="Medium"
                          mt="0.5"
                        >
                          {temperatureStats.min} - {temperatureStats.max}
                          <Text fontSize="md" fontFamily="Light">
                            {" "}
                            °C
                          </Text>
                        </Text>
                      </View>
                      {/* card 4 Distance */}
                      <View
                        bg="blueGray.900"
                        borderRadius="md"
                        mt="2"
                        alignItems="center"
                        justifyContent="center"
                        py="4"
                        style={{ width: "49%" }}
                      >
                        <Icon
                          as={FontAwesome6}
                          name="person-running"
                          color="warmGray.200"
                          size="5xl"
                        />

                        <Text
                          color="warmGray.200"
                          textAlign="center"
                          fontFamily="Bold"
                          fontSize="xl"
                          mt="3"
                          borderBottomWidth="1"
                          borderBottomColor="white"
                          mb="2"
                        >
                          Distance
                        </Text>
                        <Text
                          color="blueGray.200"
                          fontFamily="Bold"
                          fontSize="lg"
                        >
                          {distance} Km
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
            <UserSessions
              sessions={sessions}
              getSessions={getSessions}
              setSessions={setSessions}
              sessionsLoader={sessionsLoader}
            />
          </View>
        </ScrollView>
      )}
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
