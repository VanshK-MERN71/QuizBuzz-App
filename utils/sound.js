import { Audio } from "expo-av";

export const playSound = async (type) => {
  const soundObject = new Audio.Sound();
  try {
    const soundPath =
      type === "success"
        ? require("../assets/sounds/success.mp3")
        : require("../assets/sounds/fail.mp3");

    await soundObject.loadAsync(soundPath);
    await soundObject.playAsync();
    await soundObject.setPositionAsync(0);
  } catch (error) {
    console.log("Sound play error:", error);
  }
};
