import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";

function Details({ navigation, route }) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState(null);
  const [refresh, setRefresh] = useState(false);


  async function sendComment() {
    if (comment.length < 1) {
      Toast.show({
        type: "error",
        text1: "Invaild Input",
        text2: "Either in a comment",
        position: "top",
      });
    } else {
      let commentData = {
        post_id: route.params.data.id,
        user_id: route.params.profile.id,
        comment_text: comment,
      };

      const res = await axios({
        url: "https://imagesharingback.herokuapp.com/api/comments",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(commentData),
      })
        .then((res) => {
          Toast.show({
            type: "success",
            text1: "Posted!",
            position: "top",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  async function getComments() {
    const res = await axios
      .get("https://imagesharingback.herokuapp.com/api/comments", {
        params: {
          post_id: route.params.data.id,
        },
      })
      .then((res) => setAllComments(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    async function getComments() {
      const res = await axios
        .get("https://imagesharingback.herokuapp.com/api/comments", {
          params: {
            post_id: route.params.data.id,
          },
        })
        .then((res) => setAllComments(res.data))
        .catch((err) => console.log(err));
    }

    getComments();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#353B78" }} />
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="ios-chevron-back"
                  style={styles.back}
                  size={27}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Details</Text>
              <Ionicons name="bookmark-sharp" style={styles.back} size={34} />
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => getComments()}
                />
              }
            >
              <View style={styles.outerImgContainer}>
                <View style={styles.imgContainer}>
                  <View style={styles.addContainer}>
                    <Ionicons
                      name="arrow-down-circle"
                      size={50}
                      style={styles.add}
                    />
                  </View>
                  <View style={styles.shadow}>
                    {route.params.imageUrl ? (
                      <ResponsiveImageView
                        source={{ uri: route.params.imageUrl }}
                      >
                        {({ getViewProps, getImageProps }) => (
                          <View {...getViewProps()}>
                            <Image
                              {...getImageProps({ style: styles.postImage })}
                            />
                          </View>
                        )}
                      </ResponsiveImageView>
                    ) : (
                      <Text>No Pic</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.descriptionOuterContainer}>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>
                    {route.params.data.title}
                  </Text>
                  <Text style={styles.descriptionBody}>
                    {route.params.data.content}
                  </Text>
                  <View style={styles.userContainer}>
                    <Image
                      style={styles.owner}
                      resizeMode="contain"
                      source={{
                        uri: `https://imagesharingback.herokuapp.com/profile/${route.params.data.user.profile}`,
                      }}
                    />
                    <View style={styles.ownerTextContainer}>
                      <Text style={styles.ownerText}>
                        {route.params.data.user.username}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {allComments ? (
                allComments.map((comment) => {
                  return (
                    <View
                      key={comment.id}
                      style={styles.descriptionOuterContainer}
                    >
                      <View style={styles.descriptionContainer}>
                        <View style={styles.userContainer}>
                          <Image
                            style={styles.owner}
                            resizeMode="contain"
                            source={{
                              uri: `https://imagesharingback.herokuapp.com/profile/${comment.user.profile}`,
                            }}
                          />
                          <View style={styles.ownerTextContainer}>
                            <Text style={styles.ownerText}>
                              {comment.user.username}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.comment}>
                          {comment.comment_text}
                        </Text>
                      </View>
                    </View>
                  );
                })
              ) : (
                <View></View>
              )}
            </ScrollView>
            <View style={styles.outerFooterContainer}>
              <View style={styles.footerContainer}>
                <View style={styles.uploadContainer}>
                  <TouchableOpacity onPress={sendComment}>
                    <AntDesign
                      name="upcircle"
                      style={styles.upload}
                      size={35}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholderTextColor={"white"}
                  style={styles.input}
                  onChangeText={(text) => setComment(text)}
                  placeholder="Write a comment.."
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#0D0F1D",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  uploadContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // position: "relative",
    // bottom: 46,
    marginTop: -25,
    // borderWidth: 2
  },

  upload: {
    // borderWidth: 2,
    width: 38,
    color: "#25CAAC",
    marginRight: 12,

    // borderWidth: 2,
    // borderColor: "green",
    position: "relative",
    zIndex: 100,
    top: 40,
    left: 3,
  },

  outerFooterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    // marginTop: 50
  },
  footerContainer: {
    width: "95%",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 100.48,
    shadowRadius: 11.95,
  },

  input: {
    // borderWidth: 2,
    // borderColor: "green",
    borderRadius: 8,
    color: "white",
    backgroundColor: "#3A3F65",
    // opacity: 0.9,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    letterSpacing: 0.9,
    zIndex: -1,
    position: "relative",
  },

  comment: {
    color: "white",
    opacity: 0.7,
    //   borderWidth: 2,
    lineHeight: 23,
    marginBottom: 2,
    marginLeft: 54,
    marginRight: -15,
  },

  shadow: {
    borderRadius: 7,
    padding: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 15.95,

    elevation: 108,
  },
  userContainer: {
    marginTop: 10,
    flexDirection: "row",
  },

  owner: {
    height: 40,
    width: 40,
    borderRadius: 100,
    // marginLeft: 5,
  },

  ownerTextContainer: {
    width: 100,
    marginLeft: 13,
  },

  ownerText: {
    color: "#E9E9E9",
    position: "relative",
    top: 9,
    fontSize: 14,
  },

  descriptionBody: {
    color: "white",
    opacity: 0.7,
    // borderWidth: 2,
    lineHeight: 23,
    marginBottom: 2,
  },

  descriptionTitle: {
    color: "white",
    fontSize: 17,
    // borderWidth: 2
    marginBottom: 6,
  },

  descriptionOuterContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  descriptionContainer: {
    width: "87%",
    // borderWidth: 2,
    backgroundColor: "#232744",
    // height: 100,
    borderRadius: 7,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 15,
  },

  addContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 100,
    // borderWidth: 2,
    position: "relative",
    top: 35,
    left: 18,
    marginTop: -40,
  },

  add: {
    color: "#25CAAC",
    // width: 35,
    // borderWidth: 2
    // marginRight: -4,
  },

  postImage: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },

  outerImgContainer: {
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
  },

  imgContainer: {
    // borderWidth: 2,
    width: "80%",
    marginTop: 19,
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

  container: {
    flex: 1,
    // backgroundColor: "#282D5E",
  },
  header: {
    // borderWidth: 2,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 10,
  },
  back: {
    // borderWidth: 2,
    width: 30,
    opacity: 0.8,
    // backgroundColor: "green",
    color: "white",
  },
});

export default Details;
