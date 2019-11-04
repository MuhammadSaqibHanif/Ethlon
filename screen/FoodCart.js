import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import {
  Card,
  Header,
  Body,
  Input,
  Item,
  Icon,
  Button,
  Toast
} from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class FoodCart extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      product_detail: "",
      id: this.props.navigation.state.params.id,
      image: this.props.navigation.state.params.image,
      name: this.props.navigation.state.params.name,
      regural_price: this.props.navigation.state.params.regural_price,
      obj: {
        id: this.props.navigation.state.params.id,
        image: this.props.navigation.state.params.image,
        name: this.props.navigation.state.params.name,
        regural_price: this.props.navigation.state.params.regural_price
      }
    };
  }

  componentDidMount() {
    fetch(
      `http://admin.ethlonsupplies.com/api/get-product-details/${this.props.navigation.state.params.id}`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("PRODUCT_DETAIL", data);
          this.setState({
            product_detail: data[0].description
          });
        });
      })
      .catch(err => {
        console.log("NO PRODUCT DETAIL", err);
      });
  }

  _storeData = async (key, item) => {
    const id = key.toString();
    // console.log("STORE DATA ITEM",item);
    this.props.user != null
      ? this.props.updateUser({
          CartData: {
            ...this.props.user.CartData,

            [`Cart${id}`]: {
              id: item.id,
              name: item.name,
              sale_price: item.sale_price,
              image: item.image,
              description: item.description,
              cost_price: item.cost_price,
              sale_price: item.sale_price,
              regural_price: item.regural_price,
              count: this.state.count
            }
          }
        })
      : this.props.updateUser({
          CartData: {
            [`Cart${id}`]: {
              id: item.id,
              name: item.name,
              sale_price: item.sale_price,
              image: item.image,
              description: item.description,
              cost_price: item.cost_price,
              sale_price: item.sale_price,
              count: this.state.count,
              regural_price: item.regural_price
            }
          }
        });

    alert("Item added Successfully ");
  };

  _incrementCount = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  };
  _decrement = () => {
    if (this.state.count == 1) {
      alert("Can't go to below 1");
    } else {
      this.setState(prevState => ({ count: prevState.count - 1 }));
    }
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <View style={{ marginTop: 0 }}>
          <View>
            <Card style={{ height: 380 }}>
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  borderBottomWidth: 0.3,
                  borderBottomColor: "gray"
                }}
              >
                <Image
                  source={{ uri: this.state.image }}
                  style={{ width: 200, height: 200 }}
                />
              </View>
              <View style={{ marginLeft: "2%", marginTop: 10 }}>
                <View style={{ justifyContent: "flex-start" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#D11E46",
                      fontWeight: "500"
                    }}
                  >
                    {this.state.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      fontWeight: "400",
                      marginLeft: 10
                    }}
                  >
                    {this.props.navigation.state.params.regural_price}
                    PKR
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "500",
                      color: "#D11E46",
                      lineHeight: 17
                    }}
                  >
                    description :{this.state.product_detail}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <View style={{ flexDirection: "row", marginRight: 10 }}>
                    <View>
                      <TouchableOpacity onPress={() => this._decrement()}>
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 20,
                            borderWidth: 1,
                            width: 30,
                            textAlign: "center",
                            borderColor: "white",
                            color: "white",
                            backgroundColor: "#D11E46"
                          }}
                        >
                          -
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        borderWidth: 1,
                        width: 30,
                        textAlign: "center",
                        color: "red",
                        borderColor: "white"
                      }}
                    >
                      {this.state.count}
                    </Text>
                    <View>
                      <TouchableOpacity onPress={() => this._incrementCount()}>
                        <Text
                          style={{
                            fontSize: 20,
                            borderWidth: 1,
                            width: 30,
                            textAlign: "center",
                            borderColor: "white",
                            backgroundColor: "#D11E46",
                            color: "white"
                          }}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
            <View>
              <Button
                onPress={() => this._storeData(this.state.id, this.state.obj)}
                style={{
                  marginTop: 30,
                  color: "white",
                  backgroundColor: "#D11D46",
                  marginHorizontal: "5%",
                  width: "90%",
                  textAlign: "center",
                  borderRadius: 20,
                  height: 40,
                  marginBottom: 100
                }}
              >
                <Text
                  style={{
                    color: "white",
                    marginLeft: "40%",
                    fontWeight: "bold",
                    fontSize: 16,
                    textAlign: "center"
                  }}
                >
                  Add To Cart
                </Text>
              </Button>
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
)(FoodCart);
//export default AddCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
