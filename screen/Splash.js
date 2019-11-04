import React from "react";
import { View, Image, ImageBackground } from "react-native";

class Splash extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../images/ethlon-splash.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={require("../images/ethlon-branding.png")}
            style={{ width: "90%", height: 100 }}
            resizeMode="stretch"
          />
        </View>
      </ImageBackground>
    );
  }
}

export default Splash;
