import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { FlatList } from "react-native-gesture-handler";
import BusinessCategoryListItem from "./BusinessCategoryListItem";
import GlobalApi from "../../Utils/GlobalApi";
import Colors from "../../Utils/Colors";
import PageHead from "../../components/PageHead";

const BusinessListByCategory = () => {
  const param = useRoute().params;

  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    // console.log("category:", param.category);
    param && getBusinessByCategory();
  }, [param]);

  // business list by category

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((response) => {
      setBusinessList(response.bussinessLists);
    });
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
      <PageHead title={param?.category} />

      {businessList?.length > 0 ? (
        <FlatList
          data={businessList}
          style={{ marginTop: 15 }}
          renderItem={({ item, index }) => (
            <BusinessCategoryListItem business={item} />
          )}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: "20%",
            fontFamily: "outfit-medium",
            color: Colors.GRAY,
            fontSize: 20,
          }}
        >
          No Business Found
        </Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;
