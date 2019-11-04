import React from "react";
import { Card, Header, Body } from "native-base";
import { Text, View, Image, ScrollView, Dimensions } from "react-native";

export default class AllFavourites extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      wishlist: false
    };
  }

  componentDidMount() {
    fetch(
      `http://admin.ethlonsupplies.com/api/get-wishlist/${this.props.navigation.state.params.id}`
    )
      .then(res =>
        res.json().then(data => {
          console.log("get-wishlist >>>", data);

          if (data[0].id) {
            // let unique = data.filter((v, i, a) => {
            //   // console.log("v, i, a >>>", v, i, a);

            //   a.indexOf(v.id) === i;
            // });

            // console.log("unique >>>", unique);

            // data.filter(element => {
            //   return element.id !== element.id;
            // })

            this.setState({ wishlist: data });
          }
        })
      )
      .catch(err => {
        console.log("get-wishlist ERROR", err);
      });
  }

  render() {
    return (
      <View
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height
        }}
      >
        <ScrollView>
          <Header style={{ backgroundColor: "#D11D46" }}>
            <Body>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 30,
                  marginBottom: 10
                }}
              >
                <Image
                  source={require("../images/ic_back.png")}
                  style={{ width: 25, height: 25 }}
                />
                <Text style={{ color: "white", fontSize: 14, marginLeft: 20 }}>
                  WishList
                </Text>
              </View>
            </Body>
          </Header>

          <View>
            {this.state.wishlist &&
              this.state.wishlist.map((value, i) => {
                return (
                  <View key={i} style={{ padding: 20 }}>
                    <Card
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Image
                        source={{ uri: value.image }}
                        resizeMode="stretch"
                        style={{ width: 100, height: 100, padding: 20 }}
                      />
                      <Text
                        style={{
                          color: "#D11D46",
                          fontSize: 14,
                          fontWeight: "500",
                          width: "50%",
                          padding: 20
                        }}
                      >
                        {value.name}
                      </Text>
                    </Card>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
