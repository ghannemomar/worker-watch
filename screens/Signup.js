import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from "native-base";
import { useState } from "react";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  return (
    <VStack   bg="blueGray.900" flex={1}>

    <Center w="100%">
      <Box safeArea px="2" w="95%" py="8">
        <Heading
          size="lg"
          
          fontWeight="semibold"
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
         
         
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              type="text"
              value={FirstName}
              onChangeText={(value) => setFirstName(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              type="text"
              value={LastName}
              onChangeText={(value) => setLastName(value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
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
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              value={confirmpassword}
              onChangeText={(value) => setconfirmpassword(value)}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate("Signin")} >
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
    </VStack>
  );
};

export default Signup;

// onPress={()=> console.log(email)}
