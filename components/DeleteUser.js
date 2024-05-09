import { Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AlertDialog, Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/Actions";
import { URL } from "../utils/constants";

const DeleteUser = ({ isOpen, closeHandler, userToDelete,getAllUsers }) => {
  const [deleteLoader, setDeleteLoader] = useState(false);

  const onClose = () => {
    if (!deleteLoader) {
      closeHandler();
    }
  };

  const deleteHandler = async () => {
    if (!deleteLoader) {
      setDeleteLoader(true);
      axios
        .delete(
          `${URL}/users/delete-user?user=${userToDelete._id}`
        )
        .then(async () => {
            getAllUsers()
          setDeleteLoader(false);
          closeHandler();
        }).catch(err => {
            setDeleteLoader(false)
            console.log(err)
        })
    }
  };

  return (
    <AlertDialog
      size="xl"
      _backdrop={{ backgroundColor: "#000000", opacity: 0.9 }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content  >
        <AlertDialog.CloseButton />
        <AlertDialog.Header bg="blueGray.800">Delete User ?</AlertDialog.Header>
        <AlertDialog.Body bg="blueGray.800" >
       
          <Text>This will remove all data relating to this user.</Text>
          <Text mt="1">
            This action cannot be reversed. Deleted data can not be recovered.
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer bg="blueGray.800">
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={deleteLoader}
              isLoadingText="Deleting ..."
              colorScheme="danger"
              onPress={deleteHandler}
            >
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({});