import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";
import Post from "../components/Post";
import axios from "axios";


function Profile({ navigation: { goBack, navigate }, route }) {
  async function signout() {
    const signout = await axios({
      url: "http://10.0.2.2:3001/api/users/logout",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 204) {
          navigate("Login");
        }
      })
      .catch(() => console.log("already logged out"));

    // navigate("Login");
  }

  console.log(route);

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <LinearGradient
        location={[0.35, 1.05, 0.1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#353B78", "#0D0F1D"]}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}>
              <Ionicons name="ios-chevron-back" style={styles.back} size={27} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
            <TouchableOpacity onPress={signout}>
              <Ionicons name="exit" size={34} style={styles.exit} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.imgContainer}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.profile}
                  resizeMode="contain"
                  source={{
                    uri: `http://10.0.2.2:3001/profile/${route.params.profile.profile}`,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Text style={styles.profileName}>Steve Anderson</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                // borderWidth: 2,
                paddingBottom: 15,
                marginBottom: -10,
              }}
            >
              <View style={styles.catagories}>
                <Text
                  style={{
                    color: "#E9E9E9",
                    letterSpacing: 1,
                    textAlign: "center",
                  }}
                >
                  Created
                </Text>
              </View>
              <View style={styles.catagories}>
                <Text
                  style={{
                    color: "#E9E9E9",
                    letterSpacing: 1,
                    textAlign: "center",
                  }}
                >
                  Saved
                </Text>
              </View>
            </View>
            <View style={styles.gridContainer}>
              <View style={styles.gridLeft}>
                {/* <Post />
                <Post />
                <Post /> */}
              </View>
              <View style={styles.gridRight}>
                {/* <Post />
                <Post />
                <Post /> */}
              </View>
            </View>
            <View></View>
          </ScrollView>
          <View style={styles.addContainer}>
            <TouchableOpacity
              onPress={() =>
                navigate("Upload", {
                  profile: route.params.profile,
                })
              }
            >
              <Ionicons name="add-circle" style={styles.add} size={63} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#4952A5",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  add: {
    color: "#25CAAC",
    // borderWidth: 2
    position: "relative",
    bottom: 15,
    right: 10,
  },
  addContainer: {
    // height: 100,

    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -75,
  },
  gridLeft: {
    // border: "1px solid yellow",
    width: "47%",
    marginRight: 5,
    // height: 500
  },

  gridRight: {
    // border: "1px solid yellow",
    width: "47%",
    marginLeft: 5,
    // height: 500
  },
  gridContainer: {
    // border: "1px solid orange",
    margin: 5,
    marginTop: 23,
    flexDirection: "row",
    justifyContent: "center",
    // borderWidth: 2
  },
  catagories: {
    // border: "1px solid orange",
    color: "#E9E9E9",
    padding: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: "#353B78",
    width: 90,
  },
  profileName: {
    color: "white",
    fontSize: 17,
    letterSpacing: 1,
    opacity: 0.9,
    fontWeight: "400",
  },

  profileContainer: {
    // borderWidth: 2,
    borderRadius: 100,
    width: 140,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1.5,
    shadowRadius: 1,
    elevation: 65,
  },
  profile: {
    // border: "2px solid green",
    height: 135,
    width: 135,
    // borderRadius: 100,
    // borderWidth: 12,
  },
  imgContainer: {
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  header: {
    // borderWidth: 2,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 5,
  },
  exit: {
    width: 40,
    opacity: 0.8,
    // backgroundColor: "green",
    color: "#EF8A6A",
  },
  back: {
    // borderWidth: 2,
    width: 40,
    opacity: 0.8,
    // backgroundColor: "green",
    color: "white",
  },
  headerTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "400",
    // borderWidth: 2,
    position: "relative",
    top: 5,
    width: 90,
    textAlign: "center",
    letterSpacing: 1,
    opacity: 0.8,
  },
});

export default Profile;
