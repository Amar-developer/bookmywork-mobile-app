import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import Colors from "../../Utils/Colors";

import BusinessAboutme from "./BusinessAboutme";
import BusinessPhotos from "./BusinessPhotos";
import BookingModal from "./BookingModal";

const BusinessDetails = () => {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param.business);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // console.log(param?.business);
    // param && setBusiness(param.business);
  }, []);

  const onMessageBtnClick = () => {
    Linking.openURL(
      "mailto:" +
        business?.email +
        "?subject=I am Looking for your services&body=Hi there,"
    );
  };

  return (
    business && (
      <View>
        <ScrollView style={{ height: "91%" }}>
          <TouchableOpacity
            style={styles.backbtnContainer}
            onPress={() => navigation.goBack()}
          >
            <FontAwesome6 name="arrow-left" size={25} color="white" />
          </TouchableOpacity>

          <Image
            source={{ uri: business?.images[0]?.url }}
            style={{ width: "100%", height: 300 }}
          />

          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
              {business?.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                  color: Colors.PRIMARY,
                }}
              >
                {business?.contactPerson} ⭐
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.PRIMARY_LIGHT,
                  padding: 5,
                  borderRadius: 5,
                  fontSize: 12,
                }}
              >
                {business?.category?.name}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.GRAY,
                fontSize: 17,
                fontFamily: "outfit-regular",
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
            {/* horizontal line */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            {/* about me section */}
            <BusinessAboutme business={business} />
            {/* horizontal line */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Colors.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            <BusinessPhotos business={business} />
          </View>
        </ScrollView>
        <View
          style={{ display: "flex", flexDirection: "row", margin: 15, gap: 10 }}
        >
          <TouchableOpacity
            style={styles.msgbtn}
            onPress={() => onMessageBtnClick()}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 18,
                color: Colors.PRIMARY,
              }}
            >
              Message
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={styles.bookbtn}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                fontSize: 18,
                color: Colors.WHITE,
              }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
        {/* booking screen modal */}
        <Modal animationType="slide" visible={showModal}>
          <BookingModal
            businessId={business?.id}
            hideModal={() => setShowModal(false)}
          />
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  backbtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 15,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },
  msgbtn: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 99,
    flex: 1,
  },
  bookbtn: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
    borderWidth: 1,
    borderRadius: 99,
    flex: 1,
  },
});

export default BusinessDetails;
