import React from "react";
import { Card, Input, Item, Icon } from "native-base";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import ImageSlider from "../screen/ImageSlider";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import Constants from "expo-constants";

class Food extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      search: "",
      searchFood: false,
      liked: false,
      selected_Id: null
    };
  }

  componentDidMount() {
    // console.log("THE PRODUCT ID", this.props.navigation.state.params.PID);

    fetch(
      `http://admin.ethlonsupplies.com/api/get-products-by-category/${this.props.navigation.state.params.PID}`
    )
      .then(res => {
        res.json().then(data => {
          console.log("get-products-by-category >>>", data);

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

  add_To_WishList = (pid, uid) => {
    console.log("WISH DATA", pid, uid);
    console.log(Constants.deviceId);
    var UserID;
    AsyncStorage.getItem("UID")
      .then(UID => {
        UserID = UID;
        let form = new FormData();
        form.append("ip_address", Constants.deviceId);
        form.append("user_id", UserID);
        form.append("product_id", pid);

        fetch("http://admin.ethlonsupplies.com/api/post-add-to-wishlist", {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: form
        }).then(res => {
          console.log("SHAZAIB RES", res);
          if (res._bodyText === "success") {
            alert("added to wishlist");
          }
        });
      })
      .catch(err => {
        console.log("ADD TO WISHLIST ERR", err);
      });
  };

  render() {
    const { navigate } = this.props.navigation;

    // console.log(this.props.user, "user  food");

    return (
      <View
        style={{
          backgroundColor: "white",
          height: "100%"
        }}
      >
        <ScrollView>
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

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <Card
              style={{
                height: "100%",
                marginBottom: 80,
                width: "95%",
                borderRadius: 5
              }}
            >
              <View
                style={{
                  flexDirection: "column"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  {this.state.resta &&
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
                              navigate("FoodCart", {
                                id: data.id,
                                image: data.image,
                                name: data.name,
                                regural_price: data.regural_price
                              })
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
                                fontSize: 12,
                                fontWeight: "500",
                                color: "#D11E46"
                              }}
                            >
                              {data.name}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 12,
                                  fontWeight: "500",
                                  color: "green"
                                }}
                              >
                                {data.regural_price} PKR
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  this.add_To_WishList(
                                    data.id,
                                    this.props.navigation.state.params.PID
                                  );
                                  this.setState({
                                    liked: true,
                                    selected_Id: i
                                  });
                                }}
                              >
                                {this.state.liked == true &&
                                this.state.selected_Id == i ? (
                                  <Image
                                    source={require("../images/heart-2.png")}
                                    style={{ width: 20, height: 20 }}
                                  />
                                ) : (
                                  <Image
                                    source={require("../images/heart.png")}
                                    style={{ width: 20, height: 20 }}
                                  />
                                )}
                              </TouchableOpacity>
                            </View>

                            {/* <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              color: "green"
                            }}
                          >
                            description : {data.description}
                          </Text> */}
                            {/* <Text style={{fontSize:12,fontWeight:'500',color:'green'}}>
                                         Burger, Sandwich ,Fast
                                     </Text>
                                     <Text style={{fontSize:12,fontWeight:'500',color:'green'}}>
                                        Food
                                     </Text> */}
                            {/* <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              color: "#86964B",
                              color: "green"
                            }}
                          >
                            Order Online
                          </Text> */}
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                </View>
              </View>
            </Card>
          </View>
        </ScrollView>
      </View>
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
