import React, { useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  UIManager,
} from "react-native";
import { Entypo,FontAwesome6,Fontisto } from "@expo/vector-icons";
import { VStack, View, Text, HStack, Icon } from "native-base";
import moment from "moment";
import { mapStyle } from "../utils/mapStyle";
import MapView,{ Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import LineChartComponent from "./LineChartComponent";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function SessionsList({ sessions }) {
  const [active, setActive] = useState(null);
  return (
    <ScrollView>
      {sessions.map((x, i) => (
        <Item key={x._id} active={active} i={i} setActive={setActive} x={x} />
      ))}
    </ScrollView>
  );
}
const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes % 60).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

function Item({ i, active, setActive, x }) {
  const userData = useSelector(state => state.userData)

  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setActive(i == active ? null : i);
  };
  const open = active == i;
  let secs = moment(new Date(x.end_time)).diff(x.start_time, "milliseconds");

  return (
    <View style={styles.item} activeOpacity={1}>
      <Pressable onPress={onPress} style={styles.row}>
        <VStack flex={1} mr="2">
          <Text color="white" fontSize="md" fontFamily="SemiBold">
            Session of {moment(x.start_time).format("LLL")}
          </Text>
        </VStack>
        <Entypo
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color="#737373"
        />
      </Pressable>
      {open && (
        <View mt="2" >
          {/** duration */}
          <HStack
            mt="2"
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            borderBottomWidth="0.5"
            borderBottomColor="white"
          >
            <Text fontFamily="Medium" fontSize="md" color="white">
              Session Duration
            </Text>
            <Text fontFamily="Light" fontSize="md" color="white">
              {formatTime(secs)}
            </Text>
          </HStack>
          {/** duration */}
          <HStack
            mt="3"
            alignItems="center"
            justifyContent="space-between"
            flex={1}
            borderBottomWidth="0.5"
            borderBottomColor="white"
          >
            <Text fontFamily="Medium" fontSize="md" color="white">
              Session closed at
            </Text>
            <Text fontFamily="Light" fontSize="md" color="white">
              {moment(new Date(x.end_time)).format("LLL")}
            </Text>
          </HStack>
          {/** map */}
       {x.location &&   <VStack
            mt="4"
          bg="blueGray.900"
           pb='4'
           pt="2"
           borderRadius="md"
          >
            <Text textAlign="center" mb="2" fontFamily="Medium" fontSize="lg" mt="2" color="white">
              Session Location
            </Text>
            <MapView
              customMapStyle={mapStyle}
              initialRegion={{
                latitude: x.location.latitude,
                longitude: x.location.longitude,
                latitudeDelta: 0.09,
                longitudeDelta: 0.0421,
              }}
              style={{
                width: "90%",
                alignSelf: "center",
                height: 250,
              }}
            >
              <Marker
                coordinate={{
                  latitude: x.location.latitude,
                  longitude: x.location.longitude,
                }}
              />
            </MapView>
          
          </VStack>}
             {/* cards */}
             <View w="full">
                      <View
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap" mt="2"
                      >
                        {/* card 1 heart */}
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
                          bg="blueGray.900"
                          borderRadius="md"
                          mt="2"
                          alignItems="center"
                          py="4"
                          style={{ width: "49%" }}
                        >
                          <Image
                            source={require("../assets/blood-pressure.png")}
                            style={{ width: 50, height: 50 }}
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
                          bg="blueGray.900"
                          borderRadius="md"
                          mt="2"
                          alignItems="center"
                          py="4"
                          style={{ width: "49%" }}
                        >
                          <Image
                            source={require("../assets/spo2.png")}
                            style={{ width: 50, height: 50 }}
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
                      <View w="full" pb="4" >
                      <View
                        bg="blueGray.900"
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
                    {/** chart */}
                    {x.heart_records &&     <View>
                    <Text textAlign="center"  fontFamily="Medium" fontSize="lg" mt="2" color="white">
              Heart Rate Records
            </Text>
                   <LineChartComponent data={x.heart_records} />
                      </View>}
                  
                   
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#737373",
    paddingHorizontal: 10,
    backgroundColor: "#1e293b",
    overflow: "hidden",
    paddingVertical: 10,
    marginBottom: 10,
  },
  subItem: {
    padding: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    
  },
});
