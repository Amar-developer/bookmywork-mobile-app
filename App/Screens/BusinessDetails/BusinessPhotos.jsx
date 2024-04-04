import { View, Text, Image } from "react-native";
import React from "react";
import Heading from "../../components/Heading";
import { FlatList } from "react-native-gesture-handler";

const BusinessPhotos = ({ business }) => {
  return (
    <View>
      <Heading text={"Photos"} />
      <FlatList
        data={business.images}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.url }}
            style={{
              width: "100%",
              flex: 1,
              height: 120,
              margin: 5,
              borderRadius: 10,
            }}
          />
        )}
      />
    </View>
  );
};

export default BusinessPhotos;
