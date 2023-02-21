import "react-native-gesture-handler";
import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import authReducer from "./reducers/auth";
import { AuthContext } from "./context/authContext";
import { UserContext } from "./context/userContext";
import StackRoute from "./navigation/StackRoute";
import DrawerRoute from "./navigation/DrawerRoute";
import client from './api/api'
import { Alert } from "react-native";
import { useFonts } from "expo-font";

export default function App() {

  // font Montesserat
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat.ttf'),
  });

  const [state, dispatch] = React.useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  const [languages, setLanguages] = useState(["English", "French", "Italian", "Japanese", "German", "Spanish"]);
  const [difficulties, setDifficulties] = useState(["Easy", "Intermediate", "Hard"]);
  const [situations, setSituations] = useState([
    "General",
    "Restaurant",
    "Directions",
    "Describing People",
  ]);
  const [languagePicker, setLanguagePicker] = useState(false);
  const [difficultyPicker, setDifficultyPicker] = useState(false);
  const [situationPicker, setSituationPicker] = useState(false);
  const [audioControls, setAudioControls] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState("");
  const [selectedSituation, setSelectedSituation] = React.useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [value, setValue] = useState("Slow");

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        console.log("system error");
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed

        // validate
        // Alert.alert(data.password)
        // Alert.alert(data.email)
        if (!data.email || !data.password) {
          Alert.alert("Field is empty!")
          return;
        }

        // send request to server
        const res = await client.post('/user/login', {
          email: data.email.toString(),
          password: data.password.toString() 
        })
        if (!res.data.access_token) {
          Alert.alert("Credintials do not match.")
          return;
        }
        await SecureStore.setItemAsync("userToken", res.data.access_token);
        dispatch({ type: "SIGN_IN", token: res.data.access_token });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed

        /* Code added by: Muhammad M. */

        // Validate data
        if (!data.email || !data.full_name || !data.password || !data.passwordComfirm || !data.location) {
          Alert.alert("Field is empty!")
          return;
        }
        if (data.password !== data.passwordComfirm) {
          Alert.alert("Passwords do not match.")
          return;
        }

        // set headers for the request to server
        const headers = {
          'Content-Type': 'application/json'
        }

        // request to server
        const res = await client.post('/user/signup', {
          full_name: data.full_name,
          email: data.email,
          password: data.password,
          confirm_password: data.passwordComfirm,
          agree_tos: "checked",
          location: data.location,
          account_type: "free"
        })
        /* Code added by: Muhammad M. */

        await SecureStore.setItemAsync("userToken", JSON.stringify(res.data.access_token));
        dispatch({ type: "SIGN_IN", token: res.data.access_token });
      },
    }),
    []
  );

  const Stack = createNativeStackNavigator();

  // if not loaded
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <UserContext.Provider value={{ languages, setLanguages, difficulties, setDifficulties, situations, setSituations, languagePicker, setLanguagePicker, situationPicker, setSituationPicker, difficultyPicker, setDifficultyPicker, audioControls, setAudioControls, selectedLanguage, setSelectedLanguage, selectedDifficulty, setSelectedDifficulty, selectedSituation, setSelectedSituation, isEnabled, setIsEnabled, value, setValue }} >
          <Stack.Navigator>
            {state.userToken == null ? (
              <Stack.Screen
                name="Stack"
                component={StackRoute}
                options={{ headerShown: false }}
              />
            ) : (
              <Stack.Screen
                name="Drawer"
                component={DrawerRoute}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </UserContext.Provider>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
