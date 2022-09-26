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
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { profilePics } from "../img/profiles/index.js";
import ResponsiveImageView from "react-native-responsive-image-view";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import { NativeModules } from "react-native";

function Upload({ navigation: { goBack, navigate }, route }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Sports", value: "sports" },
    { label: "Wallpaper", value: "wallpaper" },
    { label: "Art", value: "art" },
    { label: "Fitness", value: "fitness" },
    { label: "Nature", value: "nature" },
    { label: "App Design", value: "app design" },
    { label: "Decor", value: "decor" },
  ]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsEditing: false,
        quality: 1,
      });

      setImage(result.uri);
    } catch (err) {
      console.log(err);
    }
  };

  const sendPost = async () => {
    if (
      title === "" ||
      description === "" ||
      value === null ||
      image === null ||
      image === undefined
    ) {
      Toast.show({
        type: "error",
        text1: "Invaild Inputs",
        text2: "Cannot leave text field blank",
        position: "top",
      });
    } else {
      let r = `${(Math.random() + 1).toString(36).substring(2)}_img`;
      const formData = new FormData();
      formData.append("file", {
        name: r,
        type: "image/jpeg",
        uri: image,
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("catagory", value);
      formData.append("user_id", route.params.profile.id);
      // route.params.profile.id  = 1

      try {
        const res = await axios({
          url: "https://imagesharingback.herokuapp.com/upload",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        })
          .then((res) => {
            Toast.show({
              type: "success",
              text1: "Posted!",
              position: "top",
            });
            navigate("Profile", {
              profile: route.params.profile,
            });

            // NativeModules.DevSettings.reload();
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  DropDownPicker.setListMode("SCROLLVIEW");

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
              <TouchableOpacity
                onPress={() =>
                  navigate("Profile", {
                    profile: route.params.profile,
                  })
                }
              >
                <Ionicons
                  name="ios-chevron-back"
                  style={styles.back}
                  size={27}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Upload</Text>
              <TouchableOpacity
                onPress={() =>
                  navigate("Profile", {
                    profile: route.params.profile,
                  })
                }
              >
                <MaterialIcons name="cancel" size={32} style={styles.exit} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {image ? (
                <View style={styles.outerImgContainer}>
                  <View style={styles.imgContainer}>
                    <View style={styles.shadow}>
                      <ResponsiveImageView source={{ uri: image }}>
                        {({ getViewProps, getImageProps }) => (
                          <View {...getViewProps()}>
                            <Image
                              {...getImageProps({ style: styles.postImage })}
                            />
                          </View>
                        )}
                      </ResponsiveImageView>
                    </View>
                  </View>
                </View>
              ) : (
                <View></View>
              )}

              <View style={styles.uploadOuterContainer}>
                <View style={styles.userContainer}>
                  <Image
                    style={styles.owner}
                    resizeMode="contain"
                    source={{
                      uri: `https://imagesharingback.herokuapp.com/profile/${route.params.profile.profile}`,
                    }}
                  />
                  <View style={styles.ownerTextContainer}>
                    <Text style={styles.ownerText}>
                      {route.params.profile.username}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.uploadOuterContainer}>
                <View style={styles.uploadContainer}>
                  <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.uploadButton}>
                      {image ? "CHANGE PIC" : "CHOOSE A PIC"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.uploadOuterContainer}>
                <TextInput
                  style={styles.inputTitle}
                  placeholderTextColor={"white"}
                  onChangeText={(text) => setTitle(text)}
                  placeholder="Add a title..."
                />
              </View>
              <View style={styles.uploadOuterContainer}>
                <TextInput
                  style={styles.inputTitle}
                  onChangeText={(text) => setDescription(text)}
                  placeholderTextColor={"white"}
                  placeholder="Add a description..."
                />
              </View>
              <DropDownPicker
                containerStyle={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 20,
                }}
                style={{
                  backgroundColor: "#303671",
                  width: "85%",
                }}
                textStyle={{
                  color: "white",
                  backgroundColor: "#303671",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#303671",
                  width: "85%",
                }}
                placeholder="Select a catagory"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                dropDownDirection="TOP"
                setItems={setItems}
              />
              <View style={styles.uploadOuterContainer}>
                <TouchableOpacity style={{ width: "85%" }} onPress={sendPost}>
                  <View style={styles.sendButton}>
                    <Text style={styles.uploadText}>Upload</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
  userContainer: {
    marginTop: 10,
    flexDirection: "row",
    // borderWidth: 2,
    width: "85%",
  },

  owner: {
    height: 40,
    width: 40,
    borderRadius: 100,
    // marginLeft: 5,
  },

  ownerTextContainer: {
    // width: 150,
    // borderWidth: 2,
    marginLeft: 13,
  },

  ownerText: {
    color: "#E9E9E9",
    position: "relative",
    top: 9,
    fontSize: 14,
  },
  uploadText: {
    textAlign: "center",
    color: "#232951",
    letterSpacing: 1,
    opacity: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  sendButton: {
    // borderWidth: 2,

    height: 50,
    borderRadius: 10,
    backgroundColor: "#25CAAC",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 11.95,
    elevation: 108,
    marginTop: 10,
    marginBottom: 20,
  },

  inputTitle: {
    // borderWidth: 2,
    width: "85%",
    backgroundColor: "#303671",
    // height: 80,r
    padding: 10,
    paddingLeft: 15,
    borderRadius: 5,
    color: "white",
    letterSpacing: 0.9,
    opacity: 0.9,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20.95,

    elevation: 108,
  },

  uploadButton: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 7,
    borderColor: "white",
    color: "white",
    opacity: 0.9,
    // width: 100
    height: 40,
    paddingLeft: 15,
  },

  uploadContainer: {
    width: "85%",
    backgroundColor: "#303671",
    height: 80,
    borderRadius: 7,
    // borderWidth: 2,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15.95,

    elevation: 108,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadOuterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  postImage: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },

  shadow: {
    borderRadius: 7,
    padding: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.5,
    shadowRadius: 11.95,

    elevation: 108,
  },

  imgContainer: {
    width: "65%",
    // borderWidth: 2,
  },

  outerImgContainer: {
    // borderWidth: 2,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: -10,
  },

  container: {
    flex: 1,
  },

  header: {
    // borderWidth: 2,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 12,
    marginRight: 12,
    paddingBottom: 10,
  },

  exit: {
    width: 40,
    opacity: 0.8,
    // backgroundColor: "green",
    color: "white",
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
    fontSize: 16,
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

export default Upload;
