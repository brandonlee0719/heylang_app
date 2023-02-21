import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

const CustomPicker = ({ options, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState(options[0]);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const animation = new Animated.Value(0);

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);

    if (isPickerVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const onOptionPress = (value) => {
    setSelectedValue(value);
    onValueChange(value);
    togglePicker();
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedValueContainer}
        onPress={togglePicker}
      >
        <Text style={styles.selectedValueText}>{selectedValue}</Text>
      </TouchableOpacity>
      <Animated.View
        style={[styles.pickerContainer, { transform: [{ translateY }] }]}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionContainer}
            onPress={() => onOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  selectedValueContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  selectedValueText: {
    fontSize: 18,
  },
  pickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  optionContainer: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
});

export default CustomPicker;
