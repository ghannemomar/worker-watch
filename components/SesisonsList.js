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
import { Entypo, FontAwesome6, Fontisto } from "@expo/vector-icons";
import { VStack, View, Text, HStack, Icon } from "native-base";
import moment from "moment";
import { mapStyle } from "../utils/mapStyle";
import MapView, { Marker } from "react-native-maps";
import LineChartComponent from "./LineChartComponent";
import BarChartComponent from "./BarChartComponent";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
  heartArray =
    x.heart_records.length > 0 ? x.heart_records.map((el) => el.value) : [];
  caloriesArray =
    x.calories_records.length > 0
      ? x.calories_records.map((el) => el.value)
      : [];
  tempArray =
    x.temperature_records.length > 0
      ? x.temperature_records.map((el) => el.value)
      : [];
  const heartStats = calculateStats(heartArray);
  const caloriesStats = calculateStats(caloriesArray);
  const temperatureStats = calculateStats(tempArray);

  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setActive(i == active ? null : i);
  };
  const open = active == i;
  let secs = moment(new Date(x.end_time)).diff(x.start_time, "milliseconds");

  return (
    <View
      style={styles.item}
      activeOpacity={1}
      bg={!open && x.fall ? "red.500" : "#1e293b"}
      borderColor={!open && x.fall ? "red.500" : "#a19c9c"}
    >
      <Pressable onPress={onPress} style={styles.row}>
        <VStack flex={1} mr="2">
          <Text color="white" fontSize="md" fontFamily="SemiBold">
            Session of {moment(x.start_time).format("LLL")}
          </Text>
        </VStack>
        <Entypo
          name={open ? "chevron-up" : "chevron-down"}
          size={22}
          color="#ffffff"
        />
      </Pressable>
      {open && (
        <View mt="2">
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

          {/* case fall */}
          {x.fall && (
            <VStack mt="3" bg="red.500" pb="2" pt="4" borderRadius="md">
              <FontAwesome6
                name="person-falling"
                size={45}
                style={{ alignSelf: "center" }}
                color="white"
              />
              <HStack
                mt="3"
                mx="3"
                alignItems="center"
                justifyContent="space-between"
                flex={1}
                borderBottomWidth="0.5"
                borderBottomColor="white"
              >
                <Text fontFamily="Medium" fontSize="md" color="white">
                  Fall Incident
                </Text>
                <Text fontFamily="Light" fontSize="md" color="white">
                  {moment(new Date(x.fallAt)).format("LLL")}
                </Text>
              </HStack>
            </VStack>
          )}
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
                <Text color="blueGray.200" fontFamily="Bold" fontSize="lg">
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
                <Text color="blueGray.200" fontFamily="Bold" fontSize="lg">
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
                <Text color="blueGray.200" fontFamily="Bold" fontSize="lg">
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
                <Text color="blueGray.200" fontFamily="Bold" fontSize="lg">
                  {x.distance_records.length > 0
                    ? x.distance_records[x.distance_records.length - 1].value
                    : 0}{" "}
                  Km
                </Text>
              </View>
            </View>

            {/* card 5 Stress */}
            <View w="full" pb="4">
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
                  name={heartStats.average > 90 ? "nervous" : "smiley"}
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
                  Stress Level
                </Text>
                <Text color="blueGray.200" fontFamily="Bold" fontSize="lg">
                  {heartStats.average > 90 ? "Stressed" : "Calm"}
                </Text>
              </View>
            </View>
          </View>
          {/** heart chart */}
          {x.heart_records && (
            <View>
              <Text
                textAlign="center"
                fontFamily="Medium"
                fontSize="lg"
                mt="2"
                color="white"
              >
                Heart Rate Records
              </Text>
              <LineChartComponent
                min={heartStats.min - 5}
                max={heartStats.max + 5}
                data={x.heart_records}
              />
            </View>
          )}
          {/** temperature chart */}
          {x.heart_records && (
            <View>
              <Text
                textAlign="center"
                fontFamily="Medium"
                fontSize="lg"
                mt="2"
                color="white"
              >
                Temperature Records
              </Text>
              <BarChartComponent
                min={30}
                max={50}
                data={x.temperature_records}
              />
            </View>
          )}
          {/** map */}
          {x.location && (
            <VStack bg="blueGray.900" pb="4" mt="-4" pt="2" borderRadius="md">
              <Text
                textAlign="center"
                mb="2"
                fontFamily="Medium"
                fontSize="lg"
                mt="2"
                color="white"
              >
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
            </VStack>
          )}
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
    padding: 10,
    overflow: "hidden",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
});
