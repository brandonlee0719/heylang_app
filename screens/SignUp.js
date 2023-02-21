import * as React from "react";
import { View, StyleSheet, Pressable, Alert, KeyboardAvoidingView, StatusBar } from "react-native";
import { AuthContext } from "../context/authContext";
import { globalStyles, theme } from "../styles/styles";
import Box from "../components/Box";
import Text from "../components/Text";
import Input from "../components/Input";
import { Picker } from "@react-native-picker/picker";
import * as countries from "../assets/contries.json";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordComfirm, setPasswordConfirm] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState(
    countries[0].name
  );

  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(28, 29, 43)'}}>
      <StatusBar color='#fff' />
      <View style={{  flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={globalStyles.center}>
          <Text variant={"logo"} color={"secondary"}>
            heyLaing
          </Text>
          <Text variant={"h4"} color={"primary"}>
            Speak, listen, read and write like a local
          </Text>
        </View>
        <View style={globalStyles.center}>
          <Pressable
            style={globalStyles.button}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text color={"primary"} variant={"button"}>
              Login
            </Text>
          </Pressable>
          <View style={globalStyles.center}>
            <Text variant={"h3"} color={"primary"}>
              Or
            </Text>
            <Text variant={"h3"} color={"primary"}>
              Sign Up Below
            </Text>
          </View>
          <KeyboardAvoidingView behavior="padding" style={globalStyles.center}>
            <Input
              width={300}
              margin={"s"}
              placeholder="Full Name*"
              placeholderTextColor={'#fff'}
              value={fullName}
              onChangeText={setFullName}
              style={globalStyles.input}
            />
            <Input
              width={300}
              margin={"xs"}
              placeholderTextColor={'#fff'}
              placeholder="Email*"
              value={email}
              onChangeText={setEmail}
              style={globalStyles.input}
            />
            <Input
              width={300}
              placeholderTextColor={'#fff'}
              margin={"s"}
              placeholder="Password*"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={globalStyles.input}
            />
            <Input
              width={300}
              margin={"xs"}
              placeholder="Re-type Password*"
              placeholderTextColor={'#fff'}
              value={passwordComfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              style={globalStyles.input}
            />

            <Picker
              style={styles.picker}
              itemStyle={styles.pickerItemStyle}
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            >
              {Object.values(countries).map(({ code, name }, index) => (
                <Picker.Item key={index} label={name} value={code} />
              ))}
            </Picker>
            <Pressable
              style={globalStyles.button}
              onPress={() => {
                Alert.alert(
                  "Changes Successfully Saved",
                  "Press the back button get back to practicing!",
                  [
                    {
                      text: "OK",
                      onPress: () => signUp({ full_name: fullName, email, password, location: selectedCountry.toString(), passwordComfirm }),
                    },
                  ]
                );
              }}
            >
              <Text color={"primary"} variant={"button"}>
                Sign Up Today
              </Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  picker: {
    width: 250,
    height: 70,
    color: theme.colors.primary,
    backgroundColor: theme.colors.input,
    marginTop: 7,
  },
  pickerItemStyle: {
    color: theme.colors.primary,
  },
});
