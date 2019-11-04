import React from "react";
import { Card, Input, Item, Icon } from "native-base";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import ImageSlider from "../screen/ImageSlider";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class Food extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      search: "",
      searchFood: false
    };
  }

  componentDidMount() {
    fetch(`http://admin.ethlonsupplies.com/api/get-parent-categories`)
      .then(res => {
        res.json().then(data => {
          // console.log("restaurent data", data);
          this.setState({
            resta: data
          });
        });
      })
      .catch(err => {
        console.log("Fetch Student Homwork", err);
      });
  }

  search() {
    fetch(
      `http://admin.ethlonsupplies.com/api/search-products?name=${this.state.search}`
    )
      .then(res => {
        res.json().then(data => {
          console.log("search-products >>>", data);

          this.setState({
            searchFood: data
          });
        });
      })
      .catch(err => {
        console.log("restaurent search data error", err);
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    // console.log(this.state.resta, "resta");

    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                borderWidth: 0.5,
                borderRadius: 20,
                width: "90%",
                marginLeft: "5%",
                marginTop: 10,
                height: 40,
                backgroundColor: "#E8EAED"
              }}
            >
              <Item style={{ width: "90%" }}>
                <Icon name="md-restaurant" />
                <Input
                  placeholder="Search"
                  value={this.state.search}
                  onChangeText={search => this.setState({ search })}
                />
                <TouchableOpacity onPress={() => this.search()}>
                  <Icon name="ios-search" />
                </TouchableOpacity>
              </Item>
            </View>

            <View style={{ width: "90%" }}>
              {this.state.searchFood &&
                this.state.searchFood.map((data, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigate("FoodCart", {
                          id: data.id,
                          image: data.image,
                          name: data.name,
                          regural_price: data.regural_price
                        })
                      }
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 15,
                        width: "100%"
                      }}
                    >
                      <View
                        style={{ marginTop: 10, marginLeft: 20, width: "70%" }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "500",
                            width: "70%"
                          }}
                        >
                          {data.name}
                        </Text>

                        <Text
                          style={{
                            fontSize: 12,
                            color: "gray",
                            fontWeight: "400"
                          }}
                        >
                          {data.regural_price} PKR
                        </Text>
                      </View>

                      <View>
                        <Image
                          source={{ uri: data.image }}
                          style={{ width: 80, height: 80, marginLeft: 20 }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Card style={{ width: "95%" }}>
                <ImageSlider />
              </Card>
            </View>

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
                      this.state.resta != "No Data Found" &&
                      this.state.resta.map((data, i) => {
                        return (
                          <View
                            key={i}
                            style={{
                              width: "30%",
                              marginLeft: 10,
                              marginTop: 10
                            }}
                          >
                            <TouchableOpacity
                              onPress={() =>
                                navigate("Products", { PID: data.id })
                              }
                            >
                              <Image
                                source={{ uri: data.image }}
                                style={{
                                  width: 100,
                                  height: 100,
                                  borderRadius: 10
                                }}
                              />
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "500",
                                  color: "#D11E46"
                                }}
                              >
                                {data.name}
                              </Text>

                              <Text
                                style={{
                                  fontSize: 12,
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
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Food);
// export default Food;
