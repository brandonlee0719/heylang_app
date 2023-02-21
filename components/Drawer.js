import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Pressable, StyleSheet, Switch } from "react-native";
import { globalStyles, theme } from "../styles/styles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as React from "react";
import { AuthContext } from "../context/authContext";
import { UserContext } from "../context/userContext";
import Box from "./Box";
import Text from "./Text";

export default function CustomDrawer(props) {
  // const languages = ["English", "French", "Spanish", "Italian", "Japanese", "German"];
  // const difficulties = ["Easy", "Intermediate", "Advanced"];
  // const situations = [
  //   "General",
  //   "Restaurant",
  //   "Directions",
  //   "Describing People",
  // ];
  // const [languagePicker, setLanguagePicker] = useState(false);
  // const [difficultyPicker, setDifficultyPicker] = useState(false);
  // const [situationPicker, setSituationPicker] = useState(false);
  // const [audioControls, setAudioControls] = useState(false);
  // const [selectedLanguage, setSelectedLanguage] = React.useState("");
  // const [selectedDifficulty, setSelectedDifficulty] = React.useState("");
  // const [selectedSituation, setSelectedSituation] = React.useState("");
  // const [isEnabled, setIsEnabled] = useState(true);
  // const [value, setValue] = useState("Slow");


  const { languages, difficulties, situations, languagePicker, setLanguagePicker, difficultyPicker, setDifficultyPicker, situationPicker, setSituationPicker, audioControls, setAudioControls, selectedLanguage, setSelectedLanguage, selectedDifficulty, setSelectedDifficulty, selectedSituation, setSelectedSituation, isEnabled, setIsEnabled, value, setValue } = React.useContext(UserContext)
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const { signOut } = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView style={styles.container} {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Select the Language"
        labelStyle={{ ...theme.textVariants.h3, color: theme.colors.secondary }}
        onPress={() => {
          setLanguagePicker(!languagePicker);
        }}
      />
      {languagePicker && (
        <Picker
          style={[styles.picker]}
          itemStyle={styles.pickerItemStyle}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        >
          {languages.map((languege, index) => (
            <Picker.Item key={index} label={languege} value={languege} />
          ))}
        </Picker>
      )}

      <DrawerItem
        label="Select the Difficulty"
        labelStyle={{ ...theme.textVariants.h3, color: theme.colors.secondary }}
        onPress={() => {
          setDifficultyPicker(!difficultyPicker);
        }}
      />
      {difficultyPicker && (
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItemStyle}
          selectedValue={selectedDifficulty}
          onValueChange={(itemValue) => setSelectedDifficulty(itemValue)}
        >
          {difficulties.map((difficulty, index) => (
            <Picker.Item key={index} label={difficulty} value={difficulty} />
          ))}
        </Picker>
      )}
      <DrawerItem
        label="Select the Situation"
        labelStyle={{ ...theme.textVariants.h3, color: theme.colors.secondary }}
        onPress={() => {
          setSituationPicker(!situationPicker);
        }}
      />
      {situationPicker && (
        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItemStyle}
          selectedValue={selectedSituation}
          onValueChange={(itemValue) => setSelectedSituation(itemValue)}
        >
          {situations.map((situation, index) => (
            <Picker.Item key={index} label={situation} value={situation} />
          ))}
        </Picker>
      )}
      <DrawerItem
        label="Audio Controls"
        labelStyle={{ ...theme.textVariants.h3, color: theme.colors.secondary }}
        onPress={() => {
          setAudioControls(!audioControls);
        }}
      />
      {audioControls && (
        <Box>
          <Box style={globalStyles.row} margin={"l"}>
            <Text variant={"h3"} color={"primary"}>
              Off / On
            </Text>
            <Box style={styles.marginLeft}>
              <Switch
                trackColor={{ true: "#00a804" }}
                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={() => setIsEnabled((previousState) => !previousState)}
                value={isEnabled}
              />
            </Box>
          </Box>
          <Box style={globalStyles.row} margin={"l"}>
            <Text variant={"h3"} color={"primary"}>
              Speed
            </Text>
            <Box
              backgroundColor={"shade"}
              style={{
                ...globalStyles.row,
                ...styles.marginLeft,
                borderRadius: 5,
              }}
            >
              <Pressable
                style={{
                  ...styles.toggler,
                  backgroundColor:
                    value === "Slow" ? theme.colors.primary : null,
                }}
                onPress={() => {
                  setValue("Slow");
                }}
              >
                <Text>Slow</Text>
              </Pressable>
              <Pressable
                style={{
                  ...styles.toggler,
                  backgroundColor:
                    value === "Normal" ? theme.colors.primary : null,
                }}
                onPress={() => {
                  setValue("Normal");
                }}
              >
                <Text>Normal</Text>
              </Pressable>
            </Box>
          </Box>
        </Box>
      )}
      <DrawerItem
        label="Sign Out"
        labelStyle={{ ...theme.textVariants.h3, color: theme.colors.secondary }}
        onPress={() => {
          signOut();
        }}
      />
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: 16,
  },
  container: {
    backgroundColor: theme.colors.background,
  },
  picker: {
    color: theme.colors.primary,
  },
  pickerItemStyle: {
    color: theme.colors.primary,
  },
  toggler: {
    width: 60,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
});
