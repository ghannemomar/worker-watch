import {
  Pressable,
  Text,
  Spinner,
  View,
  useToast,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
} from "native-base";
import React, { useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { URL } from "../utils/constants";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import ToastComponent from "../components/ToastComponent";
import SwitchComponent from "../components/SwitchComponent";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/Actions";
import BackHeader from "../components/headers/BackHeader";

const SettingsUser = ({ navigation }) => {
  
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch()
  
  const [uploadLoader, setUploadLoader] = useState(false);
  const [acceptNotif, setAcceptNotif] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState(userData.phone ? userData.phone : "")
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState(userData.firstname);
  const [lastname, setLastName] = useState(userData.lastname);
  const [loader, setLoader] = useState(false);
  const [loaderPassword, setLoaderPassword] = useState(false);

  
  const toast = useToast();

  const pickImageHandler = async () => {
    if (!uploadLoader) {
      setUploadLoader(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        aspect: [1, 1],
        quality: 1,
      });
      // IF CHANGE PHOTO UPLOAD IT AND SAVE IT TO THE USER INFO
      if (!result.canceled) {
        const size = result.assets[0].fileSize;
        const base64 = result.assets[0].base64;
        if (size > 3000000000) {
          toast.show({
            placement: "bottom",
            duration: 2000,
            render: ({ id }) => {
              return (
                <ToastComponent
                  id={id}
                  closeHandler={() => toast.close(id)}
                  title="Size of image"
                  description="Image size must be less than 800ko"
                />
              );
            },
          });
          setUploadLoader(false);
        } else {
          axios
            .post(`${URL}/users/upload-image`, {
              user: userData._id,
              image: base64,
            })
            .then(async (res) => {
              await dispatch(setUserData())
              setUploadLoader(false);
            })
            .catch((err) => {
              console.log(err);
              setUploadLoader(false);
            });
        }
      }else{
        setUploadLoader(false)
      }
    }
  };

  const updateUserInfo = async () => {
    if (!loader) {
      Keyboard.dismiss()
      setLoader(true);
      axios
        .put(`${URL}/users/update-user?user=${userData._id}`, {
          firstname,
          lastname,
          phone
        })
        .then(async (res) => {
      dispatch(setUserData())
          setLoader(false);
          toast.show({
            placement: "bottom",
            duration: 2000,
            render: ({ id }) => {
              return (
                <ToastComponent
                  id={id}
                  status="success"
                  closeHandler={() => toast.close(id)}
                  title="Success !"
                  description="User info has been updated"
                />
              );
            },
          });
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
  };

  const changePassword = async () => {
    if (!loaderPassword) {
      setLoaderPassword(true);
      Keyboard.dismiss()
       if (password.length < 6){
        setLoaderPassword(false)
        toast.show({
          placement: "bottom",
          duration: 2000,
          render: ({ id }) => {
            return (
              <ToastComponent
                id={id}
                closeHandler={() => toast.close(id)}
                title="Invalid password"
                description="new Password must have at least 6 chars."
              />
            );
          },
        });
      } else if (password != confirmPassword){
        setLoaderPassword(false)
        toast.show({
          placement: "bottom",
          duration: 2000,
          render: ({ id }) => {
            return (
              <ToastComponent
                id={id}
                closeHandler={() => toast.close(id)}
                title="Passwords does not match"
                description="Please verify your passwords"
              />
            );
          },
        });
      }else{
      axios
        .post(`${URL}/users/change-password?user=${userData._id}`, {
          password,
          currentPassword,
          
        })
        .then(async (res) => {
        dispatch(setUserData())
          setLoaderPassword(false);
          toast.show({
            placement: "bottom",
            duration: 2000,
            render: ({ id }) => {
              return (
                <ToastComponent
                  id={id}
                  status="success"
                  closeHandler={() => toast.close(id)}
                  title="Success !"
                  description="password has been updated"
                />
              );
            },
          });
          setPassword('')
          setCurrentPassword('')
          setconfirmPassword('')
        })
        .catch((err) => {
          setLoaderPassword(false)
          console.log(err)
          if (err.response.status === 403) {
            toast.show({
              placement: "bottom",
              duration: 2000,
              render: ({ id }) => {
                return (
                  <ToastComponent
                    id={id}
                    closeHandler={() => toast.close(id)}
                    title="Something went wrong"
                    description="Please verify your current password"
                  />
                );
              },
            });
          } else {
            toast.show({
              placement: "bottom",
              duration: 2000,
              render: ({ id }) => {
                return (
                  <ToastComponent
                    id={id}
                    closeHandler={() => toast.close(id)}
                    title="Something went wrong"
                    description="Please verify your Internet Connexion"
                  />
                );
              },
            });
          }
        });
    }}
  };

  return (
    <View bg="blueGray.900" flex={1}>
      <BackHeader />
        <View flex={1}>
          <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
            {/** image */}
            <Pressable
              onPress={pickImageHandler}
              style={styles.imageContainer}
              bg="blueGray.500"
              borderRadius="full"
              alignSelf="center"
            >
              {uploadLoader ? (
                <Spinner size="lg" color="white" />
              ) : userData.image ? (
                <Image
                  source={{ uri: `${URL}/${userData.image}` }}
                  style={{ width: 120, height: 120, borderRadius: 60 }}
                />
              ) : (
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={50}
                  color="white"
                />
              )}
            </Pressable>
            {/** general info */}
            <View
              mx="2"
              px="3"
              py="5"
              borderRadius="md"
              mt="6"
              bg="blueGray.800"
            >
              <Text fontFamily="Medium" fontSize="md">
                General Informations
              </Text>
              <VStack mt="2">
                <FormControl>
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    leftElement={
                      <FontAwesome5
                        name="user-alt"
                        size={20}
                        color="white"
                        style={{ paddingLeft: 5 }}
                      />
                    }
                    type="text"
                    value={firstname}
                    onChangeText={(value) => setFirstName(value)}
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                    leftElement={
                      <FontAwesome5
                        name="user-friends"
                        size={20}
                        color="white"
                        style={{ paddingLeft: 5 }}
                      />
                    }
                    type="text"
                    value={lastname}
                    onChangeText={(value) => setLastName(value)}
                  />
                </FormControl>
                <FormControl>
              <FormControl.Label>Phone number</FormControl.Label>
              <Input
              leftElement={
                <FontAwesome5
                  name="phone-alt"
                  size={20}
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
              }
                type="text"
                value={phone}
                keyboardType="phone-pad"
                onChangeText={(value) => setPhone(value)}
              />
            </FormControl>
                <Button
                  alignSelf="flex-end"
                  isLoading={loader}
                  isLoadingText="updating ..."
                  mt="4"
                  colorScheme="indigo"
                  onPress={updateUserInfo}
                >
                  Update info
                </Button>
              </VStack>
            </View>
            {/** notif */}
            <View
              mx="2"
              px="3"
              mt="3"
              py="5"
              borderRadius="md"
              bg="blueGray.800"
            >
              <Text fontFamily="Medium" fontSize="md">
                Notifications
              </Text>
              <HStack
                w="full"
                alignItems="center"
                justifyContent="space-between"
                mt="3"
              >
                <Text fontFamily="Light">Accept notifications</Text>
                <VStack>
                  <SwitchComponent
                    toggleActive={acceptNotif}
                    setToggle={setAcceptNotif}
                  />
                </VStack>
              </HStack>
            </View>
            {/** change password */}
            <View
              mx="2"
              px="3"
              mt="3"
              py="5"
              borderRadius="md"
              mb="6"
              bg="blueGray.800"
            >
              <Text fontFamily="Medium" fontSize="md">
                Change Password
              </Text>
              <FormControl>
                <FormControl.Label>Current Password</FormControl.Label>
                <Input
                  rightElement={
                    showCurrentPassword ? (
                      <Ionicons
                        onPress={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        name="eye-off"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    ) : (
                      <Ionicons
                        onPress={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        name="eye"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    )
                  }
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChangeText={(value) => setCurrentPassword(value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>New Password</FormControl.Label>
                <Input
                  rightElement={
                    showPassword ? (
                      <Ionicons
                        onPress={() => setShowPassword(!showPassword)}
                        name="eye-off"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    ) : (
                      <Ionicons
                        onPress={() => setShowPassword(!showPassword)}
                        name="eye"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    )
                  }
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChangeText={(value) => setPassword(value)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  rightElement={
                    showConfirmPassword ? (
                      <Ionicons
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        name="eye-off"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    ) : (
                      <Ionicons
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        name="eye"
                        size={24}
                        color="white"
                        style={{ paddingRight: 10 }}
                      />
                    )
                  }
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChangeText={(value) => setconfirmPassword(value)}
                />
              </FormControl>
              <Button
                alignSelf="flex-end"
                isLoading={loaderPassword}
                isLoadingText="updating password ..."
                mt="4"
                colorScheme="indigo"
                onPress={changePassword}
              >
                Update password
              </Button>
            </View>
          </ScrollView>
        </View>
    
    </View>
  );
};

export default SettingsUser;

const styles = StyleSheet.create({
  imageContainer: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
});
