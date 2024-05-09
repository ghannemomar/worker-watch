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
import { FontAwesome5, Ionicons,AntDesign } from "@expo/vector-icons";

const CreateUser = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
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

  const re = /\S+@\S+\.\S+/;
  const isValid = re.test(email);


  const createNewUser = async () => {
    if (!loader) {
      Keyboard.dismiss();
      toast.closeAll();
      setLoader(true);
      if(firstname.length <2 || lastname.length < 2){
        setLoader(false)
        toast.show({
          placement: "bottom",
          duration: 2000,
          render: ({ id }) => {
            return (
              <ToastComponent
                id={id}
                closeHandler={() => toast.close(id)}
                title="Invalid name"
                description="Firstname & lastname must have at least 2 chars."
              />
            );
          },
        });
      }
      else if(!isValid){
        setLoader(false)
        toast.show({
          placement: "bottom",
          duration: 2000,
          render: ({ id }) => {
            return (
              <ToastComponent
                id={id}
                closeHandler={() => toast.close(id)}
                title="Invalid email"
                description="Please verify mail address"
              />
            );
          },
        });
      } else if (password.length < 6){
        setLoader(false)
        toast.show({
          placement: "bottom",
          duration: 2000,
          render: ({ id }) => {
            return (
              <ToastComponent
                id={id}
                closeHandler={() => toast.close(id)}
                title="Invalid password"
                description="Password must have at least 6 chars."
              />
            );
          },
        });
      } else if (password != confirmpassword){
        setLoader(false)
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
        .post(`${URL}/users/create-user`, {
          firstname,
          lastname,
          email : email.trim().toLocaleLowerCase(),
          password,
          role,
          phone
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
                    leftElement={
                      <FontAwesome5
                        name="user-alt"
                        size={20}
                        color="white"
                        style={{ paddingLeft: 10 }}
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
                        style={{ paddingLeft: 10 }}
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
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
               leftElement={
                <Ionicons
                  name="mail"
                  size={22}
                  color="white"
                  style={{ paddingLeft: 8 }}
                />
              }
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
               leftElement={
                <FontAwesome5
                  name="lock"
                  size={20}
                  color="white"
                  style={{ paddingLeft: 10 }}
                />
              }
                type="password"
                value={password}
                onChangeText={(value) => setpassword(value)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                leftElement={
                  <AntDesign
                    name="checkcircle"
                    size={20}
                    color="white"
                    style={{ paddingLeft: 10 }}
                  />
                }
                type="password"
                value={confirmpassword}
                onChangeText={(value) => setconfirmpassword(value)}
              />
            </FormControl>
            <Button
             
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
