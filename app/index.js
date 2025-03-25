import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import * as Animatable from "react-native-animatable";
import GStyles from "../styles/global";

const Index = () => {
  const router = useRouter();

  return (
    <View style={[GStyles.container, { flex: 1 }]}>
      <Animatable.View
        animation="fadeInDown"
        duration={1500}
        style={GStyles.welcomeBox}
      >
        <Text style={GStyles.title1}>Welcome to QuizBuzz! 🚀</Text>
        <Text style={GStyles.emoji}>🧠</Text>
        <TouchableOpacity
          style={GStyles.startButton}
          onPress={() => router.push("/quiz")}
        >
          <Text style={GStyles.startButtonText}>Start Quiz 🚀</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Index;
