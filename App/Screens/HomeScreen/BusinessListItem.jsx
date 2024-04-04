import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

const BusinessListItem = ({ business }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("business-details", { business: business })
      }
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={{ fontSize: 17, fontFamily: "outfit-medium" }}>
          {business?.name}
        </Text>
        <Text
          style={{ fontSize: 13, fontFamily: "outfit", color: Colors.GRAY }}
        >
          {business?.contactPerson}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "outfit",
            color: Colors.PRIMARY,
            padding: 3,
            borderRadius: 3,
            alignSelf: "flex-start",
            paddingHorizontal: 7,
            marginTop: 3,
            backgroundColor: Colors.PRIMARY_LIGHT,
          }}
        >
          {business?.category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: Colors.WHITE, borderRadius: 10 },
  infoContainer: {
    padding: 7,
    display: "flex",
    gap: 3,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
});

export default BusinessListItem;
