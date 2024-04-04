import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

const PageHead = ({ title }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: 15,
      }}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome6 name="arrow-left" size={20} color="black" />
      <Text style={{ fontSize: 20, fontFamily: "outfit-medium" }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PageHead;
