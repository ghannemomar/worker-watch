import axios from "axios";
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
} from "native-base";
import { useState } from "react";
import { Keyboard, ScrollView } from "react-native";
import { URL } from "../utils/constants";
import ToastComponent from "../components/ToastComponent";
import BackHeader from "../components/headers/BackHeader";

const CreateUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [role, setRole] = useState("user");

  const toast = useToast();

  const rolesOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const createNewUser = async () => {
    if (!loader) {
      Keyboard.dismiss();
      toast.closeAll();
      setLoader(true);
      axios
        .post(`${URL}/users/create-user`, {
          firstname,
          lastname,
          email : email.trim().toLocaleLowerCase(),
          password,
          role,
        })
        .then((res) => {
          setLoader(false);
          navigation.goBack()
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
                  description="Please verify your internet connexion"
                />
              );
            },
          });
        });
    }
  };

  return (
    <VStack bg="blueGray.900" flex={1}>
      
     <ScrollView keyboardShouldPersistTaps='handled' >
        <Box safeArea px="2" w="100%" py="8">
          <BackHeader />
          <Heading mt="1" fontFamily="Medium" size="md" textAlign="center">
            Create new User
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>First Name</FormControl.Label>
              <Input
                type="text"
                value={firstname}
                onChangeText={(value) => setFirstName(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                type="text"
                value={lastname}
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
            <FormControl isReadOnly>
              <FormControl.Label>Role</FormControl.Label>
              <Select
                _actionSheet={{ bg: "#00000020" }}
                _actionSheetContent={{ bg: "blueGray.800" }}
                _item={{ bg: "transparent" }}
                selectedValue={role}
                placeholder="Choose role"
                _selectedItem={{
                  bg: "blueGray.400",
                  startIcon: <CheckIcon size="5" color="white" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setRole(itemValue)}
              >
                {rolesOptions.map((el) => {
                  return (
                    <Select.Item
                      key={el.label}
                      label={el.label}
                      value={el.value}
                    />
                  );
                })}
              </Select>
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
            <Button
              isDisabled={
                password.length < 6 ||
                password != confirmpassword ||
                firstname.length < 2 ||
                lastname.length < 2
              }
              isLoading={loader}
              isLoadingText="Creating account..."
              mt="2"
              colorScheme="indigo"
              onPress={createNewUser}
            >
              Create new user
            </Button>
          </VStack>
        </Box>
        <VStack h="96"></VStack>
     </ScrollView>
   
    </VStack>
  );
};

export default CreateUser;
