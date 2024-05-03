import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Input,
  Link,
  Text,
  VStack,
  View,
  
} from "native-base";
import { Alert } from "react-native";

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState("omar@live.fr");
  const [password, setpassword] = useState("1111");
  // const { toggleColorMode } = useColorMode();

  const Admin = {
    firstname: "khalil",
    role: "admin",
    password: "111",
    email: "khalil@live.fr",
    lastname: "chikhaoui",
  };
  const User = {
    firstname: "omar",
    role: "User",
    password: "1111",
    email: "omar@live.fr",
    lastname: "ghannem",
  };

  const loginHandler = () => {
    if (email.toLowerCase().trim() == Admin.email && password == Admin.password) {
     
        navigation.navigate("DrawerNavigator");
      
    } 
    else if (email.toLowerCase().trim() == User.email && password == User.password) {
     
    navigation.navigate("HomeUser");
      
    } else {
      Alert.alert("la2", "ghalet");
    }

  };

  return (
    <View
      flex={1}
      bg="blueGray.900"
      w="100%"
    >
      {/* <IconButton
        onPress={toggleColorMode}
        style={{ alignSelf: "flex-end" }}
        _icon={{
          as: MaterialCommunityIcons,
          name: "theme-light-dark",
          size: "xl",
          _dark: { color: "warmGray.50" },
          _light: { color: "coolGray.800" },
        }}
      /> */}

      <Center flex={1} w="100%">
        <Box safeArea px="2" py="8" w="95%">
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
                type="password"
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
            <Button onPress={loginHandler} mt="2" colorScheme="indigo">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.300",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate("Signup")}
              >
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};
export default Signin;
