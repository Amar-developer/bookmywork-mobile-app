import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import PageHead from "../../components/PageHead";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Utils/GlobalApi";

import BusinessCategoryListItem from "../BusinessCategory/BusinessCategoryListItem";
import { useNavigation } from "@react-navigation/native";

const BookingScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && getUserBookings();
  }, [user]);

  // booking section

  const getUserBookings = () => {
    setLoading(true);
    GlobalApi.getUserBooking(user?.primaryEmailAddress.emailAddress).then(
      (response) => {
        setBusinessList(response.bookings);
        setLoading(false);
      }
    );
  };

  return (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() =>
        navigation.push("business-details", { business: business })
      }
    >
      <Text style={{ fontFamily: "outfit-medium", fontSize: 25 }}>
        My Bookings
      </Text>
      <View>
        <FlatList
          data={businessList}
          onRefresh={() => getUserBookings()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <View style={{ marginRight: 10 }}>
              {/* bussinessList spelling was hygraph */}
              <BusinessCategoryListItem
                business={item?.bussinessList}
                booking={item}
              />
            </View>
          )}
        />
      </View>
    </TouchableOpacity>
  );
};

export default BookingScreen;
