import { StyleSheet, Text, View, Image, TouchableOpacity,  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";
import axios from "axios";
import { Video, AVPlaybackStatus } from "expo-av";

function Post({ navigation, data, user }) {
  const video = React.useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function getImage() {
      // console.log(data.image);
      //https://imagesharingnativeapp.herokuapp.com/image/6hvnyn87qa.jpg
      const posts = await axios
        .get(`https://imagesharingnativeapp.herokuapp.com/image/${data.image}`)
        .then((res) => {
          setImageUrl(res.config.url);
        })
        .catch((err) => console.log(err));
    }

    getImage();
  }, []);

  function toDetails() {
    navigation.navigate("Details", {
      profile: user,
      data: data,
      imageUrl: imageUrl,
    });
  }


  return (
    <View style={styles.postBox}>
      <View style={styles.bookMarkContainer}>
        <Ionicons name="bookmarks-sharp" size={25} style={styles.bookMark} />
      </View>
      <TouchableOpacity onPress={toDetails}>
        {imageUrl ? (
          <ResponsiveImageView source={{ uri: imageUrl }}>
            {({ getViewProps, getImageProps }) => (
              <View {...getViewProps()}>
                <Image {...getImageProps({ style: styles.postImage })} />
              </View>
            )}
          </ResponsiveImageView>
        ) : (
          <Image
            source={require("../img/placeholder.png")}
            style={{ width: "100%", height: 230, borderRadius: 7 }}
          />
        )}
      </TouchableOpacity>
      <View style={styles.userContainer}>
        <Image
          style={styles.owner}
          resizeMode="contain"
          source={{
            uri: `https://imagesharingnativeapp.herokuapp.com/profile/${data.user.profile}`,
          }}
        />
        <View style={styles.ownerTextContainer}>
          <Text style={styles.ownerText}>{data.user.username}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postBox: {
    marginBottom: 15,
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
    height: 35,
    width: 35,
    borderRadius: 100,
    marginLeft: 0,
  },

  ownerTextContainer: {
    width: 100,
    marginLeft: 8,
  },

  ownerText: {
    color: "white",
    position: "relative",
    top: 9,
    fontSize: 14,
    opacity: 0.9,
    fontWeight: "300",
    letterSpacing: 0.65,
  },
});

export default Post;
