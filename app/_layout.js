import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const Layout = () => {
  return (
    <>
      <StatusBar
        barStyle="default"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </>
  );
};

export default Layout;
