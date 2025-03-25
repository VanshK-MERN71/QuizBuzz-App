import React from "react";
import { TouchableOpacity, Text } from "react-native";
import GStyles from "../styles/global";

const Option = ({ text, isSelected, isCorrect, onPress, disabled }) => {
  const getBackgroundColor = () => {
    if (!isSelected) return "#FFFFFF";
    return isCorrect ? "green" : "red";
  };

  return (
    <TouchableOpacity
      style={[GStyles.option, { backgroundColor: getBackgroundColor() }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={GStyles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Option;
