import { Text, View, Animated } from "react-native";
import { useEffect, useRef } from "react";
import GStyles from "../styles/global";

const Question = ({ question }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [question]);

  return (
    <Animated.View
      style={[
        GStyles.container,
        {
          opacity: fadeAnim,
          padding: 40,
          height: "30%",
          borderRadius: 20,
          marginBottom: 30,
          borderRadius: 20,
          backgroundColor: "#2E2E3E",
        },
      ]}
    >
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          borderRadius: 20,
          padding: 12,
        }}
      >
        <Text style={GStyles.questionText}>{question}</Text>
      </View>
    </Animated.View>
  );
};

export default Question;
