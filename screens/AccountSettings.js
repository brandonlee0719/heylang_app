import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import { globalStyles, theme } from "../styles/styles";
import Box from "../components/Box";
import Text from "../components/Text";
import Input from "../components/Input";
import { Picker } from "@react-native-picker/picker";
import * as countries from "../assets/contries.json";
import client from '../api/api'

export default function AccountSettings() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordComfirm, setPasswordConfirm] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(
    countries[0].name
  );

  const onSubmit = async () => {
    // token
    const token = await SecureStore.getItemAsync('userToken')
    // body of the request to server
    const body = {
      "full_name": fullName,
      "email": email,
      "password": password,
      "confirm_password": passwordComfirm,
      "location": selectedCountry
    }
    const res = await client.post('/user/account', body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    Alert.alert("User updated!")
  }

  return (
    <Box backgroundColor={"background"} style={globalStyles.container}>
      <Box margin={"m"} style={globalStyles.container}>
        <Box margin={"m"} style={globalStyles.center}>
          <KeyboardAvoidingView behavior="height" style={globalStyles.center}>
            <Input
              width={300}
              margin={"s"}
              placeholder="Full Name*"
              placeholderTextColor={"#fff"}
              value={fullName}
              onChangeText={setFullName}
              style={globalStyles.input}
            />
            <Input
              width={300}
              margin={"xs"}
              placeholderTextColor={"#fff"}
              placeholder="Email*"
              value={email}
              onChangeText={setEmail}
              style={globalStyles.input}
            />
            <Input
              width={300}
              margin={"s"}
              placeholder="Password*"
              placeholderTextColor={"#fff"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={globalStyles.input}
            />
            <Input
              width={300}
              margin={"xs"}
              placeholder="Re-type Password*"
              value={passwordComfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              placeholderTextColor={"#fff"}
              style={globalStyles.input}
            />

            <Picker
              style={styles.picker}
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              {Object.values(countries).map(({ code, name }, index) => (
                <Picker.Item key={index} label={name} value={code} />
              ))}
            </Picker>
            <Pressable
              style={globalStyles.button}
              onPress={onSubmit}
            >
              <Text color={"primary"} variant={"button"}>
                Submit
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </Box>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  picker: {
    width: 250,
    height: 90,
    color: theme.colors.primary,
    backgroundColor: theme.colors.input,
    marginTop: 7,
  },
});
