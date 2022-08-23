import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  TouchableOpacity,
  Linking,
} from "react-native";
import Background from "../img/profile-back.svg";
import BottomBackground from "../img/Vector.svg";
import Logo from "../img/logo.svg";
import { FontAwesome5, SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function validate() {
    let inputData = { username, password };

    if (username.length < 3 || password.length < 3) {
      Toast.show({
        type: "error",
        text1: "Invaild Input",
        text2: "Either the username or password is invalid",
        position: "top",
      });
    } else {
      const res = await axios({
        url: "http://10.0.2.2:3001/api/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(inputData),
      })
        .then((res) => {
          if (res.status === 200) {
            Toast.show({
              type: "success",
              text1: "Success",
              position: "bottom",
            });
            navigation.navigate("Home");
            setUsername("");
            setPassword("");
          }
        })
        .catch(() => {
          Toast.show({
            type: "error",
            text1: "Invaild Input",
            text2: "Either the username or password is invalid",
            position: "top",
          });
        });
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Background style={styles.bigSvg} />
        <View style={styles.innerContainer}>
          <Logo />
          <Text style={styles.loginTitle}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              placeholder="Username"
              style={styles.input}
            />
            <FontAwesome5
              style={styles.userIcon}
              name="user"
              size={15}
              color="black"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              style={styles.input}
            />
            <SimpleLineIcons
              name="lock"
              style={styles.userIcon}
              size={15}
              color="black"
            />
          </View>
          <TouchableOpacity onPress={validate} style={{ width: "65%" }}>
            <View style={styles.loginButtonContainer}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.signupTextContainer}>
            <Text
              style={{
                color: "white",
                opacity: 0.9,
                letterSpacing: 0.7,
                marginRight: 10,
              }}
            >
              Don’t have account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text
                style={{
                  color: "#6A74CF",
                  fontSize: 16,
                  position: "relative",
                  bottom: 2,
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <BottomBackground style={styles.botSvg} />
      <View style={styles.githubContainer}>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/ckaikai19")}
        >
          <View style={styles.github}>
            <AntDesign name="github" size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 10 }}>Github</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  github: {
    // borderWidth: 2,
    width: 120,
    backgroundColor: "black",
    height: 45,
    borderRadius: 30,
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
  },

  githubContainer: {
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  signupTextContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",

    // borderWidth: 2,
    width: "65%",
  },
  loginText: {
    color: "white",
    // letterSpacing: 1,
  },

  loginButtonContainer: {
    width: "100%",
    // borderWidth: 2,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A74CF",
    height: 42,
  },

  inputContainer: {
    width: "65%",
  },

  userIcon: {
    // borderWidth: 2,
    width: 30,
    marginLeft: 15,
    position: "relative",
    bottom: 27,
  },

  input: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 30,
    paddingTop: 7,
    paddingLeft: 40,
    paddingRight: 5,
    paddingBottom: 7,
  },

  loginTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 22,
    color: "white",
    fontWeight: "600",
    letterSpacing: 1,
    opacity: 0.9,
  },

  innerContainer: {
    // borderWidth: 2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    height: "83%",
    // borderWidth: 2,
    // // margin: 10,
  },

  bigSvg: {
    // borderWidth: 2,
    position: "absolute",
    top: 0,
    left: 0,
    // right: 156,
    bottom: 0,
    // zIndex: 10,
    // marginTop: 20,
    // marginBottom: 20,
  },
  botSvg: {
    // borderWidth: 2,
    marginTop: -95,
    zIndex: -1,
  },
});

export default Login;
