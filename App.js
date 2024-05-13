import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox, StatusBar } from "react-native";
import HomeAdmin from "./screens/HomeAdmin";
import UserInfo from "./screens/UserInfo";
import Notifications from "./screens/Notifications";
import { useFonts } from "expo-font";
import SettingsAdmin from "./screens/SettingsAdmin";
import { NativeBaseProvider, View, extendTheme } from "native-base";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import Signin from "./screens/Signin";
import SettingsUser from "./screens/SettingsUser";
import HomeUser from "./screens/HomeUser";
import DrawerMenu from "./components/headers/DrawerMenu";
import CreateUser from "./screens/CreateUser";
import { Provider } from "react-redux";
import store from "./redux/store";


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Black: require("./assets/fonts/Poppins-Black.ttf"),
    Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    ExtraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    ExtraLight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
    Light: require("./assets/fonts/Poppins-Light.ttf"),
    Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Regular: require("./assets/fonts/Poppins-Regular.ttf"),
    SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Thin: require("./assets/fonts/Poppins-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      LogBox.ignoreAllLogs()
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const customTheme = extendTheme({
    config: {
      useSystemColorMode: false,
      initialColorMode: "dark",
    },
    fontConfig: {
      OpenSans: {
        100: {
          normal: "Thin",
          italic: "Thin",
        },
        200: {
          normal: "ExtraLight",
          italic: "ExtraLight",
        },
        300: {
          normal: "Light",
          italic: "Light",
        },
        400: {
          normal: "Regular",
          italic: "Regular",
        },
        500: {
          normal: "Medium",
          italic: "Medium",
        },
        600: {
          normal: "SemiBold",
          italic: "SemiBold",
        },
        700: {
          normal: "Bold",
          italic: "Bold",
        },
        800: {
          normal: "ExtraBold",
          italic: "ExtraBold",
        },
        900: {
          normal: "Black",
          italic: "Black",
        },
      },
    },

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "Medium",
      body: "Regular",
      mono: "Light",
    },
  });

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
       screenOptions={{ headerShown: false }}
       drawerContent={(props) => <DrawerMenu {...props} />}
      >
        <Drawer.Screen component={HomeAdmin} name="HomeAdmin" />
       
        <Drawer.Screen component={Notifications} name="Notifications" />
        <Drawer.Screen component={SettingsAdmin} name="SettingsAdmin" />
      </Drawer.Navigator>
    );
  };

  return (
    <Provider store={store}>
 <NativeBaseProvider theme={customTheme}>
       <StatusBar style="auto" backgroundColor="#0f172a" />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView} bg="white">
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          
            <Stack.Screen component={Signin} name="Signin" />
            <Stack.Screen component={CreateUser} name="CreateUser" />
            <Stack.Screen component={DrawerNavigator} name="DrawerNavigator" />
            <Stack.Screen component={HomeUser} name="HomeUser" />
            <Stack.Screen component={SettingsUser} name="SettingsUser" />
            <Stack.Screen component={UserInfo} name="UserInfo" />
          </Stack.Navigator>
        </NavigationContainer>
       
      </View>
    </NativeBaseProvider>
    </Provider>
   
  );
}
