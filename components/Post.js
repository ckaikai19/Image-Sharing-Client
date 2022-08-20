import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";

function Post({ navigation }) {
  function toDetails() {
    navigation.navigate("Details");
  }
  return (
    <View style={styles.postBox}>
      <View style={styles.bookMarkContainer}>
        <Ionicons name="bookmarks-sharp" size={25} style={styles.bookMark} />
      </View>
      <TouchableOpacity onPress={toDetails}>
        <ResponsiveImageView source={require("../img/posts/leb.gif")}>
          {({ getViewProps, getImageProps }) => (
            <View {...getViewProps()}>
              <Image {...getImageProps({ style: styles.postImage })} />
            </View>
          )}
        </ResponsiveImageView>
      </TouchableOpacity>
      <View style={styles.userContainer}>
        <Image
          style={styles.owner}
          resizeMode="contain"
          source={profilePics.avatars[2]}
        />
        <View style={styles.ownerTextContainer}>
          <Text style={styles.ownerText}>Dave Johson</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postBox: {
    marginBottom: 23,
  },

  bookMarkContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: -27,
    position: "relative",
    top: 43,
    zIndex: 100,
  },

  bookMark: {
    color: "white",
    width: 35,
    marginRight: 4,
  },

  postImage: {
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },

  userContainer: {
    marginTop: 10,
    flexDirection: "row",
  },

  owner: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: 5,
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
});

export default Post;
