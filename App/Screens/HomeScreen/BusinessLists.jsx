import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";

const BusinessLists = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessLists();
  }, []);

  const getBusinessLists = () =>
    GlobalApi.getBusinessList().then((response) => {
      //   console.log(response.bussinessLists);
      setBusinessList(response?.bussinessLists);
    });

  return (
    <View style={{ marginTop: 20 }}>
      <Heading text={"Latest Business"} isViewAll={true} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginRight: 10 }}>
            <BusinessListItem business={item} />
          </View>
        )}
      />
    </View>
  );
};
export default BusinessLists;
