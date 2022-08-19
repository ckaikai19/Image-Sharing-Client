import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";
import Post from "../components/Post";

function Home() {
  return (
    <LinearGradient
      location={[0.35, 1.05, 0.1]}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#353B78", "#0D0F1D"]}
      style={styles.container}
    >
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor={"white"}
              placeholder="Search"
            />
            <Ionicons
              style={styles.searchIcon}
              name="ios-search"
              size={23}
              color="#E9E9E9"
            />
          </View>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profile}
              resizeMode="contain"
              source={profilePics.avatars[20]}
            />
          </View>
        </View>
        <ScrollView style={{marginBottom: 100}} showsVerticalScrollIndicator={false}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.catagorieContainer}
          >
            <View style={styles.catagories}>
              <Text style={{ color: "#E9E9E9" }}>Wallpaju0per</Text>
            </View>
            <View style={styles.catagories}>
              <Text style={{ color: "#E9E9E9" }}>Wallpaper</Text>
            </View>
            <View style={styles.catagories}>
              <Text style={{ color: "#E9E9E9" }}>Wallpaper</Text>
            </View>
            <View style={styles.catagories}>
              <Text style={{ color: "#E9E9E9" }}>Wallpaper</Text>
            </View>
            <View style={styles.catagories}>
              <Text style={{ color: "#E9E9E9" }}>Wallpaper</Text>
            </View>
          </ScrollView>
          <View style={styles.gridContainer}>
            <View style={styles.gridLeft}>
              <Post />
              <Post />
              <Post />
            </View>
            <View style={styles.gridRight}>
              <Post />
              <Post />
              <Post />
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // border: "5px solid green",
  },

  home: {
    // border: "2px solid green",
  },

  header: {
    // border: "1px solid orange",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 22,
    marginRight: 22,
    marginTop: 15,
  },

  inputContainer: {
    // border: "2px solid pink",
    // outlineStyle: 'none',
    // height: 50,
    width: 255,
    position: "relative",
    top: 8,
  },
  input: {
    // border: "2px solid white",
    // outlineStyle: 'none',
    backgroundColor: "#454FAD",
    height: 40,
    width: 225,
    borderRadius: 4,
    paddingLeft: 40,
    paddingRight: 16,
    color: "#E9E9E9",
  },

  searchIcon: {
    // border: "2px solid green",
    width: 29,
    position: "relative",
    bottom: 33,
    left: 9,
  },
  profileContainer: {
    // border: "2px solid green",
    height: 55,
    width: 55,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 5,
  },

  profile: {
    // border: "2px solid green",
    height: 55,
    width: 55,
    borderRadius: 100,
  },

  catagorieContainer: {
    // border: "1px solid orange",
    marginTop: 4,
  },

  catagories: {
    // border: "1px solid orange",
    color: "#E9E9E9",
    padding: 14,
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
  },

  gridContainer: {
    // border: "1px solid orange",
    margin: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
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
});

export default Home;
