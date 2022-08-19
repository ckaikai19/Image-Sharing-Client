import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as Font from 'expo-font';
import { AppLoading } from "expo";

import Home from './pages/Home';
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import Upload from './pages/Upload';
import Login from './pages/Login';





function getFonts() {
  return Font.loadAsync({
    "work-sans-reg": require("./assets/fonts/WorkSans-Regular.ttf"),
    "work-sans-med": require("./assets/fonts/WorkSans-Medium.ttf"),
  });
}


export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // if(fontsLoaded){
  //   return <Home />;
  // } else {
  //   return (
  //     <AppLoading startAsync={getFonts()} onFinish={() => setFontsLoaded(true)} />
  //   ); 
  // }
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Upload />
    </SafeAreaView>
  );

  

}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#353B78",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});



//background: linear-gradient(9.21deg, #0D0F1D 12.08%, #353B78 105.4%);