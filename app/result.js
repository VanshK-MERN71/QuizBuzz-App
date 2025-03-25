import React, { useEffect } from "react";
import { View, Text, Animated, BackHandler } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Card, Button } from "@rneui/themed";
import GStyles from "../styles/global";

export default function Result() {
  const { score, correct, wrong, total } = useLocalSearchParams();
  const router = useRouter();

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const backAction = () => {
      router.replace("/");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const getResultMessage = () => {
    if (score == total) {
      return { message: "Perfect Score! 🎉 You Passed!", color: "green" };
    } else if (score > total / 2) {
      return { message: "Great Job! 👍 You Passed!", color: "blue" };
    } else {
      return { message: "Better Luck Next Time ❌", color: "red" };
    }
  };

  const { message, color } = getResultMessage();

  return (
    <Animated.View style={[GStyles.container, { opacity: fadeAnim, flex: 1 }]}>
      <Card containerStyle={GStyles.card}>
        <Card.Title style={GStyles.title}>🎉 Quiz Complete! 🎉</Card.Title>
        <Card.Divider />

        <Text style={GStyles.score}>Total Questions: {total}</Text>
        <Text style={[GStyles.score, { color: "green" }]}>
          ✅ Correct Answers: {correct}
        </Text>
        <Text style={[GStyles.score, { color: "red" }]}>
          ❌ Wrong Answers: {wrong}
        </Text>

        <Text style={GStyles.resultMessage}>{message}</Text>

        <Animated.View
          style={{
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          }}
        >
          <Button
            title="🔄 Play Again"
            onPress={() => router.push("/quiz")}
            containerStyle={GStyles.buttonContainer}
            buttonStyle={GStyles.button}
          />
        </Animated.View>
      </Card>
    </Animated.View>
  );
}
