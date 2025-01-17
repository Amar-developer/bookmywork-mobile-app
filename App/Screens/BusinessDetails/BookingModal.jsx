import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  ToastAndroid,
} from "react-native";

import { format } from "date-fns";

import React, { useEffect, useState } from "react";
// import PageHead from "../../components/PageHead";
import { FontAwesome6 } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import Colors from "../../Utils/Colors";
import Heading from "../../components/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";

const BookingModal = ({ businessId, hideModal }) => {
  const [timeList, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };

  //   create booking method

  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
      ToastAndroid.show("Please Select Date and Time", ToastAndroid.LONG);

      return;
    }

    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      time: selectedTime,
      date: format(selectedDate, "dd-MM-yyyy"),

      // note: note,
      businessId: businessId,
    };

    GlobalApi.createBooking(data).then((response) => {
      console.log(response);
      ToastAndroid.show("Booking Created Successfully", ToastAndroid.LONG);
      hideModal();
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        {/* <PageHead title={"Booking"} /> */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            gap: 15,
            marginBottom: 10,
          }}
          onPress={() => hideModal()}
        >
          <FontAwesome6 name="arrow-left" size={20} color="black" />
          <Text style={{ fontSize: 20, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>
        <Heading text={"Selected Date"} />
        <View style={styles.calendarContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={350}
            minDate={Date.now()}
            todayBackgroundColor={Colors.BLACK}
            todayTextStyle={{ color: Colors.WHITE }}
            selectedDayColor={Colors.PRIMARY}
            selectedDayTextColor={Colors.WHITE}
          />
        </View>
        {/* time select section */}
        <View style={{ marginTop: 20 }}>
          <Heading text={"Select Time Slot"} />
          <FlatList
            data={timeList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime === item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        {/* note section */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Sugesstion Note"} />
          <TextInput
            placeholder="Note.."
            numberOfLines={4}
            multiline={true}
            style={styles.textInput}
            onChange={(text) => setNote(text)}
          />
        </View>
        {/* 'confirmation button' */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.confirmbtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Colors.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
    marginTop: 5,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.PRIMARY,
    paddingHorizontal: 18,
    color: Colors.PRIMARY,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.PRIMARY,
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 18,
    color: Colors.WHITE,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Colors.PRIMARY,
  },
  confirmbtn: {
    fontSize: 17,
    fontFamily: "outfit-medium",
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    textAlign: "center",
    padding: 10,
    borderRadius: 99,
    elevation: 3,
  },
});
export default BookingModal;
