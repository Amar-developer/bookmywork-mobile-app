import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../components/Heading";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalApi.getCategory().then((response) => {
      // console.log("res", response.categories);
      setCategories(response?.categories);
    });
  };
  return (
    <View style={{ marginTop: 15 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              navigation.push("business-list", { category: item.name })
            }
          >
            <View style={styles.iconsContainer}>
              <Image
                source={{ uri: item?.icons?.url }}
                style={{ width: 30, height: 30 }}
              />
            </View>
            <Text style={{ fontFamily: "outfit-medium", marginTop: 5 }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  iconsContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});

export default Categories;
