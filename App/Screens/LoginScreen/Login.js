import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../Utils/Colors";
import { useOAuth } from "@clerk/clerk-expo";

import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../../assets/login.png")}
        style={styles.loginImage}
      />
      <View style={styles.subContainer}>
        <Text
          style={{ fontSize: 27, color: Colors.WHITE, textAlign: "center" }}
        >
          Let's Find{" "}
          <Text style={{ fontWeight: "bold" }}>
            Professional cleaning and repair
          </Text>
          Services
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 17,
            marginTop: 30,
            color: Colors.WHITE,
          }}
        >
          Best App to Find services near you which deliver you a professional
          service
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              color: Colors.PRIMARY,
              fontWeight: "bold",
            }}
            onPress={onPress}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Colors.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  button: {
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 99,
    marginTop: 45,
  },
});

export default Login;
