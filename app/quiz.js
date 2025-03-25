import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import Question from "../components/Question";
import Option from "../components/Option";
import questions from "../data/questions";
import { Audio } from "expo-av";
import GStyles from "../styles/global";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const router = useRouter();

  const playSound = async (isCorrect) => {
    const sound = new Audio.Sound();
    try {
      const soundPath = isCorrect
        ? require("../assets/sounds/success.mp3")
        : require("../assets/sounds/fail.mp3");
      await sound.loadAsync(soundPath);
      await sound.playAsync();
    } catch (error) {
      console.log("Sound error: ", error);
    }
  };

  const handleOptionPress = (option) => {
    if (selectedOption) return;

    setSelectedOption(option);

    const isCorrect = option === questions[currentQuestion].answer;
    playSound(isCorrect);

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        const finalCorrect = isCorrect ? correctAnswers + 1 : correctAnswers;
        const finalWrong = !isCorrect ? wrongAnswers + 1 : wrongAnswers;

        Alert.alert("Quiz finished! 🚀", "See your results now!", [
          {
            text: "OK",
            onPress: () =>
              router.push({
                pathname: "/result",
                params: {
                  score: finalCorrect,
                  correct: finalCorrect,
                  wrong: finalWrong,
                  total: questions.length,
                },
              }),
          },
        ]);
      }
    }, 1000);
  };

  return (
    <View
      style={[GStyles.container, { padding: 20, alignItems: "none", flex: 1 }]}
    >
      <Question question={questions[currentQuestion].question} />
      {questions[currentQuestion].options.map((option, index) => (
        <Option
          key={index}
          text={option}
          isSelected={option === selectedOption}
          isCorrect={option === questions[currentQuestion].answer}
          onPress={() => handleOptionPress(option)}
        />
      ))}
    </View>
  );
};

export default Quiz;
