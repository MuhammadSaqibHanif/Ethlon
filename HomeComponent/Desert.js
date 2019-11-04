import React from "react";
import {
  Card,
  Header,
  Body,
  Input,
  Item,
  Icon,
  Button,
  Content
} from "native-base";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
class Desert extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      resta: []
    };
  }

  componentDidMount() {
    fetch(`http://admin.ethlonsupplies.com/api/get-products-by-category/${2}`)
      .then(res => {
        res.json().then(data => {
          console.log("restaurent data", data);
          this.setState({
            resta: data
          });
        });
      })
      .catch(err => {
        console.log("Fetch Student Homwork", err);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Card
                style={{
                  height: Dimensions.get("window").height,
                  marginTop: 10,
                  width: "95%",
                  borderRadius: 5
                }}
              >
                <View syle={{ flexDirection: "column" }}>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {this.state.resta &&
                      this.state.resta.map(data => {
                        return (
                          <View
                            style={{
                              width: "30%",
                              marginLeft: 10,
                              marginTop: 10
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                navigate("StorePage", {
                                  id: data.id,
                                  image: data.image,
                                  name: data.name,
                                  address: data.address
                                })
                              }
                            >
                              <Image
                                source={{ uri: data.image }}
                                style={{
                                  width: 120,
                                  height: 120,
                                  borderRadius: 10
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "500",
                                  color: "#851A24"
                                }}
                              >
                                {data.name}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: "500",
                                  color: "gray"
                                }}
                              >
                                {data.address}
                              </Text>
                              {/* <Text style={{fontSize:12,fontWeight:'500',color:'gray'}}>
                                         Burger, Sandwich ,Fast
                                     </Text>
                                     <Text style={{fontSize:12,fontWeight:'500',color:'gray'}}>
                                        Food
                                     </Text> */}
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "500",
                                  color: "#86964B",
                                  color: "green"
                                }}
                              >
                                Order Online
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                  </View>
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Desert;
