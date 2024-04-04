import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  StatusBar,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../Utils/Colors";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";

const Header = () => {
  const { user, isLoading } = useUser();
  return (
    user && (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            <Image style={styles.userImage} source={{ uri: user?.imageUrl }} />
            <View>
              <Text
                style={{ color: Colors.WHITE, fontFamily: "outfit-regular" }}
              >
                Welcome
              </Text>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                }}
              >
                {user?.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome6 name="bookmark" size={27} color="white" />
        </View>
        {/* search bar */}
        <View style={styles.searchbarContainer}>
          <TextInput style={styles.textInput} placeholder="search" />
          <FontAwesome
            style={styles.searchbtn}
            name="search"
            size={27}
            color={Colors.PRIMARY}
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    backgroundColor: Colors.WHITE,
    padding: 7,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "80%",
    fontFamily: "outfit-regular",
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  searchbarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchbtn: {
    backgroundColor: Colors.WHITE,
    padding: 8,
    borderRadius: 8,
  },
});

export default Header;
