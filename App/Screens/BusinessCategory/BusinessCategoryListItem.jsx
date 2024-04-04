import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const BusinessCategoryListItem = ({ business, booking }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("business-details", { business: business })
      }
    >
      <Image source={{ uri: business?.images[0]?.url }} style={styles.image} />
      <View style={styles.subContainer}>
        <Text
          style={{ fontFamily: "outfit", fontSize: 15, color: Colors.GRAY }}
        >
          {business?.contactPerson}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 18 }}>
          {business?.name}
        </Text>
        {!booking?.id ? (
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 16,
              color: Colors.GRAY,
            }}
          >
            <FontAwesome6
              name="location-dot"
              size={20}
              color={Colors.PRIMARY}
            />
            {"  "}
            {business?.address}
          </Text>
        ) : (
          <Text
            style={[
              {
                padding: 3,
                borderRadius: 5,
                fontSize: 12,
                fontWeight: "bold",
                alignSelf: "flex-start",
              },
              booking?.bookingStatus == "Completed"
                ? { backgroundColor: Colors.GREEN, color: Colors.WHITE }
                : booking?.bookingStatus == "Canceled"
                ? { backgroundColor: Colors.RED, color: Colors.WHITE }
                : {
                    color: Colors.PRIMARY,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                  },
            ]}
          >
            {booking?.bookingStatus}
          </Text>
        )}
        {booking?.id ? (
          <Text
            style={{
              fontFamily: "outfit-regular",
              color: Colors.GRAY,
              fontSize: 16,
            }}
          >
            <AntDesign name="calendar" size={20} color={Colors.PRIMARY} />
            {"    "}
            {booking.date} at {booking.time}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  subContainer: {
    display: "flex",
    gap: 4,
    justifyContent: "center",
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});

export default BusinessCategoryListItem;
