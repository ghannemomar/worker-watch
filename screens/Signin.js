import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Spinner,
  Text,
  VStack,
  View,
  useToast,
} from "native-base";
import { Keyboard } from "react-native";
import axios from "axios";
import ToastComponent from "../components/ToastComponent";
import { URL } from "../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("omar@live.fr");
  const [password, setpassword] = useState("123456");
  const [loader, setLoader] = useState(false);
  const [checkUserLoader, setCheckUserLoader] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const loginHandler = async () => {
    if (!loader) {
      Keyboard.dismiss();
      toast.closeAll();
      setLoader(true);
      axios
        .post(`${URL}/users/signin`, {
          email: email.trim().toLocaleLowerCase(),
          password,
        })
        .then(async (res) => {
          console.log("rep is :", res.data);
          setLoader(false);
          const user = res.data;
          const userAsString = JSON.stringify(user);
          await AsyncStorage.setItem("user", userAsString);
          if (user.role == "admin") {
            navigation.replace("DrawerNavigator");
          } else {
            navigation.replace("HomeUser");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          toast.show({
            placement: "bottom",
            duration: 2000,
            render: ({ id }) => {
              return (
                <ToastComponent
                  id={id}
                  closeHandler={() => toast.close(id)}
                  title="Something went wrong"
                  description="Please verify your Login Credentials"
                />
              );
            },
          });
        });
    }
  };
  const verifyUser = async () => {
    const user = await AsyncStorage.getItem("user");
    console.log(user);
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role == "admin") {
        navigation.replace("DrawerNavigator");
      } else {
        navigation.replace("HomeUser");
      }
    } else {
      setCheckUserLoader(false);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  if (checkUserLoader) {
    return (
      <View
        alignItems="center"
        justifyContent="center"
        flex={1}
        bg="blueGray.900"
        w="100%"
      >
        <Spinner size="lg" color="white" />
      </View>
    );
  }

  return (
    <View flex={1} bg="blueGray.900" w="100%">
      <Box safeArea px="2" py="16" w="100%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID</FormControl.Label>
            <Input
              type="text"
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              rightElement={
                showPassword ? (
                  <Ionicons
                  onPress={()=> setShowPassword(!showPassword)}
                    name="eye-off"
                    size={24}
                    color="white"
                    style={{ paddingRight: 10 }}
                  />
                ) : (
                  <Ionicons
                  onPress={()=> setShowPassword(!showPassword)}
                    name="eye"
                    size={24}
                    color="white"
                    style={{ paddingRight: 10 }}
                  />
                )
              }
              type={showPassword ?'text':'password'}
              value={password}
              onChangeText={(value) => setpassword(value)}
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.300",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            isLoading={loader}
            isLoadingText="connecting ..."
            onPress={loginHandler}
            mt="2"
            colorScheme="indigo"
          >
            Sign in
          </Button>
        </VStack>
      </Box>
    </View>
  );
};
export default Signin;
