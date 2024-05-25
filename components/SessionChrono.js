import { Pressable, View, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { setActifSession } from "../redux/Actions";
import { URL } from "../utils/constants";
const SessionChrono = ({ getSessions }) => {
  const actifSession = useSelector((state) => state.actifSession);
  const [elapsedTime, setElapsedTime] = useState(0);

  const dispatch = useDispatch();

  const stopTimer = () => {
    axios
      .put(`${URL}/sessions/update-session?session=${actifSession._id}`, {
        actif: false,
        end_time: new Date(),
      })
      .then(async (res) => {
        +getSessions();
        dispatch(setActifSession());
      });
  };

  useEffect(() => {
    let timerInterval;
    if (actifSession != null) {
      timerInterval = setInterval(() => {
        const now = new Date();
        const elapsed = now - new Date(actifSession.start_time);
        setElapsedTime(elapsed);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes % 60).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View>
      <View
        mt="2"
        flexDirection="row"
        bg="blueGray.800"
        px="2"
        py="4"
        borderRadius="md"
        mb="1"
        w="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <View>
          <Text fontFamily="Medium" fontSize="md">
            Active Session
          </Text>
          <Text fontFamily="Bold" fontSize="xl" color="blueGray.300">
            {formatTime(elapsedTime)}
          </Text>
        </View>
        <Pressable onPress={stopTimer}>
          <FontAwesome name="stop-circle" size={40} color="white" />
        </Pressable>
      </View>
      {/** fall modal */}
    </View>
  );
};

export default SessionChrono;
