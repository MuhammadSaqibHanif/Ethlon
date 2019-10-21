import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Image
} from "react-native";
import { Root, Toast } from "native-base";
import ImageSlider from "react-native-image-slider";

class Slider extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    fetch("http://Elementads.co/ethlon/api/get-banners")
      .then(res => res.json())
      .then(response => {
        // console.log("BANNER IMAGES", response);
        if (response[0]) {
          if (response[0].image) {
            response.map(value =>
              this.setState(prevState => ({
                data: [...prevState.data, value.image]
              }))
            );
          }
        }
      })
      .catch(() => {
        Toast.show({
          text: "Error in Loading Banner Images!",
          position: "bottom",
          duration: 3000
        });
      });
  }

  render() {
    const { data } = this.state;
    const images = data;

    return (
      <Root>
        <SafeAreaView style={styles.containers}>
          <ImageSlider
            loop
            autoPlayWithInterval={3000}
            images={images}
            onPress={({ index }) => alert(index)}
            customSlide={({ index, item, style, width }) => (
              // It's important to put style here because it's got offset inside
              <View
                key={index}
                style={[
                  style,
                  styles.customSlide,
                  { backgroundColor: index % 2 === 0 ? "white" : "white" }
                ]}
              >
                <Image source={{ uri: item }} style={styles.customImage} />
              </View>
            )}
            customButtons={(position, move) => (
              <View style={styles.buttons}>
                {images.map((image, index) => {
                  return (
                    <TouchableHighlight
                      key={index}
                      underlayColor="#ccc"
                      onPress={() => move(index)}
                      style={styles.button}
                    >
                      <Text
                        style={position === index && styles.buttonSelected}
                        style={{ fontWeight: "bold", fontSize: 25 }}
                      >
                        {/* {index + 1} */}.
                      </Text>
                    </TouchableHighlight>
                  );
                })}
              </View>
            )}
          />
        </SafeAreaView>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    justifyContent: "flex-start",
    height: 200
  },
  content1: {
    width: "100%",
    height: 50,
    marginBottom: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  content2: {
    width: "100%",
    height: 100,
    marginTop: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  contentText: { color: "#fff" },
  buttons: {
    zIndex: 1,
    height: 15,
    marginTop: -25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonSelected: {
    opacity: 1,
    color: "red"
  },
  customSlide: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    height: 200
  },
  customImage: {
    width: "100%",
    height: "100%"
  }
});

export default Slider;
