import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import BusinessListByCategory from "../Screens/BusinessCategory/BusinessListByCategory";
import BusinessDetails from "../Screens/BusinessDetails/BusinessDetails";

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="business-list" component={BusinessListByCategory} />
      <Stack.Screen name="business-details" component={BusinessDetails} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
