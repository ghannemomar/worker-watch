import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {  StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AlertDialog, Button, Text } from "native-base";
import axios from 'axios';
import { URL } from '../utils/constants';
import { useSelector } from 'react-redux';


const FallModal = ({ isOpen, closeHandler }) => {
    const [alertSent, setAlertSent] = useState(false);
    const [timer, setTimer] = useState(null);

 const userData = useSelector(state => state.userData)
  useEffect(() => {
    // Set a timeout to send an alert to the supervisor after 10 seconds
    const timeoutId = setTimeout(() => {
        if (!alertSent) {
            console.log('send notification to admin and save fall in the active session')
            axios.post(`${URL}/sessions/save-fall`,{user: userData._id }).then(res => {
              setAlertSent(true)
              closeHandler()
            })
                                  setAlertSent(true);
        }
    }, 10000);  // 10000 milliseconds = 10 seconds

    // Save the timeout ID so it can be cleared later
    setTimer(timeoutId);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
}, [alertSent]);

const handleCancel = () => {
    // User cancels the alert
    closeHandler()
    clearTimeout(timer);  // Clear the timeout
    setAlertSent(false);  // Reset alert sent state
    console.log("Fall alert canceled by the user.");
};




  return (
    <AlertDialog
      size="xl"
      _backdrop={{ backgroundColor: "#000000", opacity: 0.9 }}
      isOpen={isOpen}
      onClose={handleCancel}
    >
      <AlertDialog.Content  >
        <AlertDialog.CloseButton />
        <AlertDialog.Header bg="blueGray.800">Fall Detected !</AlertDialog.Header>
        <AlertDialog.Body bg="blueGray.800" alignItems="center" >
        <FontAwesome6 name="person-falling" size={60} color="white" />
          <Text textAlign="center" mt="4">A fall has been detected. If you are okay, please press the button below within 10 seconds.</Text>
          <Text textAlign="center" mt="2" >
          If you do not respond, we will notify your supervisor for immediate assistance.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer bg="blueGray.800">
          <Button.Group space={2}>
            <Button colorScheme="indigo" w="full" onPress={handleCancel}>
              I'am okay
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default FallModal;

const styles = StyleSheet.create({});