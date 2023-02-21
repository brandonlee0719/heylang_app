import * as React from "react";
import { StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../context/authContext";
import { globalStyles, theme } from "../styles/styles";
import Box from "../components/Box";
import Text from "../components/Text";
import Input from "../components/Input";

export default function SignInScreen() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  return (
    <Box
      backgroundColor={"background"}
      style={{ ...globalStyles.flex, ...globalStyles.center }}
    >
      <Box margin={"s"}>
        <Box style={globalStyles.center}>
          <Text variant={"h1"} color={"primary"}>
            Login
          </Text>
        </Box>
        <Box style={globalStyles.center}>
          <Box
            style={styles.inputContainer}
            backgroundColor={"input"}
            margin={"l"}
            padding={"m"}
          >
            <Input
              width={300}
              margin={"s"}
              placeholder="Email*"
              placeholderTextColor={"#fff"}
              value={fullName}
              onChangeText={setFullName}
              style={globalStyles.secondaryInput}
            />
            <Input
              width={300}
              margin={"s"}
              placeholder="Password*"
              placeholderTextColor={"#fff"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={globalStyles.secondaryInput}
            />
          </Box>
          <Pressable
            style={globalStyles.button}
            onPress={() => signIn({ email: fullName, password })}
          >
            <Text color={"primary"} variant={"button"} style={{ fontSize: 20.45 }}>
              Login
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    paddingVertical: 30,
  },
});
