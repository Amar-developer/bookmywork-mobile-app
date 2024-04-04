import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";
import BusinessLists from "./BusinessLists";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor="red"
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      {/* header section */}
      <Header />

      <View style={{ padding: 20 }}>
        {/* slider section */}
        <Slider />
        {/* categories section */}
        <Categories />
        {/* Busineslist section */}
        <BusinessLists />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
