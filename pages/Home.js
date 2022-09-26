import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";
import Post from "../components/Post";
import axios from "axios";

function Home({ navigation, route }) {
  const [catagory, setCatagory] = useState("all");
  const [posts, setPosts] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getPosts() {
      const posts = await axios
        .get(`https://imagesharingback.herokuapp.com/api/posts/${catagory}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch(() => console.log("get Post Failed"));
    }

    getPosts();
  }, [catagory]);

  async function getPosts() {
    setRefresh(true);
    const posts = await axios
      .get(`https://imagesharingback.herokuapp.com/api/posts/${catagory}`)
      .then((res) => {
        setPosts(res.data);
        setRefresh(false);
      })
      .catch(() => console.log("get Post Failed"));
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#353B78" }} />
      <SafeAreaView style={styles.AndroidSafeArea}>
        <LinearGradient
          location={[0.35, 1.05, 0.1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#353B78", "#2C2345"]}
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Profile", {
                      profile: route.params.profile,
                    })
                  }
                >
                  <Image
                    style={styles.profile}
                    resizeMode="contain"
                    source={{
                      uri: `https://imagesharingback.herokuapp.com/profile/${route.params.profile.profile}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={styles.catagorieContainer}
            >
              <TouchableOpacity onPress={() => setCatagory("all")}>
                <View
                  style= {
                    catagory === "all"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>All</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCatagory("sports")}>
                <View
                  style={
                    catagory === "sports"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>Sports</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCatagory("art")}>
                <View
                  style={
                    catagory === "art"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>Art</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCatagory("fitness")}>
                <View
                  style={
                    catagory === "fitness"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>Fitness</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCatagory("nature")}>
                <View
                  style={
                    catagory === "nature"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>Nature</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCatagory("wallpaper")}>
                <View
                  style={
                    catagory === "wallpaper"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>Wallpaper</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCatagory("decor")}>
                <View
                  style={
                    catagory === "decor"
                      ? styles.selectedContainer
                      : styles.catagories
                  }
                >
                  <Text style={styles.catagoryText}>Decor</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
            <ScrollView
              showsVerticalScrollIndicator={false}
              // refreshControl={
              //   <RefreshControl
              //     refreshing={refresh}
              //     onRefresh={() => getPosts()}
              //   />
              // }
            >
              <View style={styles.gridContainer}>
                <View style={styles.gridLeft}>
                  {posts ? (
                    posts
                      .filter((_, i) => i % 2 === 0)
                      .map((post) => (
                        <Post
                          navigation={navigation}
                          user={route.params.profile}
                          key={post.id}
                          data={post}
                        />
                      ))
                  ) : (
                    <View></View>
                  )}
                </View>
                <View style={styles.gridRight}>
                  {posts ? (
                    posts
                      .filter((_, i) => i % 2 !== 0)
                      .map((post) => (
                        <Post
                          navigation={navigation}
                          user={route.params.profile}
                          key={post.id}
                          data={post}
                        />
                      ))
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    color: "#E9E9E9",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 4,
    height: 40,
    backgroundColor: "#454FAD",
  },
  catagoryText: {
    color: "#E9E9E9",
    letterSpacing: 0.7,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#2C2345",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
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
    marginTop: 4,
    marginBottom: 8,
  },

  inputContainer: {
    // border: "2px solid pink",
    // outlineStyle: 'none',
    // height: 50,
    // width: 255,
    position: "relative",
    top: 8,
  },
  input: {
    // border: "2px solid white",
    // outlineStyle: 'none',
    backgroundColor: "#454FAD",
    height: 40,
    width: 295,
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
    shadowOpacity: 0.35,
    shadowRadius: 10,
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
    marginTop: 0,
    paddingBottom: 15,
  },

  catagories: {
    // border: "1px solid orange",
    color: "#E9E9E9",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 4,
    marginRight: 4,
    height: 40,
    backgroundColor: "#353B78",
  },

  gridContainer: {
    // border: "1px solid orange",
    margin: 5,
    marginTop: 5,
    marginBottom: 80,
    paddingBottom: 60,
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
