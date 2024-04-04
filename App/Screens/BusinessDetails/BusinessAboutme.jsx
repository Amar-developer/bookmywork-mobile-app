import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Heading from "../../components/Heading";

import Colors from "../../Utils/Colors";

const BusinessAboutme = ({ business }) => {
  const [isReadMore, setIsReadMore] = useState(false);

  return (
    business && (
      <View>
        {/* about me section */}
        <Heading text={"About Me"} />
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 16,
            color: Colors.GRAY,
            lineHeight: 20,
          }}
          numberOfLines={isReadMore ? 10 : 5}
        >
          {business?.about}
        </Text>
        <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
          <Text
            style={{
              fontFamily: "outfit-regular",
              color: Colors.PRIMARY,
              fontSize: 16,
            }}
          >
            {isReadMore ? "Read Less" : "Read More"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default BusinessAboutme;
