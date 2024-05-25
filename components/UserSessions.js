import { HStack, Skeleton, Text, View } from "native-base";
import React, { useEffect } from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SessionsList from "./SesisonsList";
import { useSelector } from "react-redux";

const UserSessions = ({ sessions, getSessions, sessionsLoader }) => {
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    getSessions();
  }, [userData]);

  return (
    <View>
      <HStack alignItems="center" space="2">
        <FontAwesome6 name="clipboard-list" size={24} color="white" />
        <Text fontFamily="Medium" fontSize="lg" mt="4" mb="2">
          Sessions History
        </Text>
      </HStack>
      {sessionsLoader ? (
        ["1", "2", "3", "4", "5", "6", "7"].map((el) => (
          <Skeleton mt="2" key={el} h="24" borderRadius="md" />
        ))
      ) : sessions.length == 0 ? (
        <Text
          fontFamily="Light"
          textAlign="center"
          fontSize="sm"
          mt="5"
          color="gray.200"
          mb="2"
        >
          No session found.
        </Text>
      ) : (
        <View>
          <SessionsList sessions={sessions} />
        </View>
      )}
    </View>
  );
};

export default UserSessions;
