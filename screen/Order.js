import React from "react";
import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import { Item } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Card } from "native-base";
class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: null,
      index: null,
      clickStatus: false,
      orderdetails: null
    };
  }

  static navigationOptions = {
    header: null
  };

  second_Card_Holder = (index, clickStatus) => {
    this.setState({ index, clickStatus });
  };

  componentDidMount() {
    fetch(
      `http://Elementads.co/ethlon/api/get-orders/${this.props.navigation.state.params.id}`
    )
      .then(res => {
        res.json().then(data => {
          console.log("get-orders", data);

          if (data) {
            this.setState({ orders: data });
          } else {
            this.setState({ orders: [] });
          }
        });
      })
      .catch(err => console.log("NO ORDERS ERROR", err));
  }

  get_Order_Detail = (order_ID, index, clickStatus) => {
    console.log("ORDER ID PASSED TO FETCH ", order_ID);
    fetch(`http://Elementads.co/ethlon/api/get-order-details/${order_ID}`)
      .then(res => {
        res.json().then(data => {
          console.log("RESPONSE ORDER DETAILS", data);
          this.setState({ orderdetails: data }, () => {
            this.second_Card_Holder(index, clickStatus);
          });
        });
      })
      .catch(err => console.log("NO ORDER DETAILS ERROR", err));
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            padding: 20,
            width: Dimensions.get("window").width,
            height: "100%"
          }}
        >
          {!this.state.orders && (
            <View
              style={{
                height: Dimensions.get("window").height,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "grey", fontWeight: "500", fontSize: 20 }}>
                sorry no orders ...
              </Text>
            </View>
          )}
          {this.state.orders &&
            this.state.orders.map((item, i) => {
              return (
                <View key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(this.state.clickStatus);
                      if (this.state.clickStatus == true) {
                        this.second_Card_Holder(i, false);
                      } else if (this.state.clickStatus == false) {
                        this.get_Order_Detail(item.order_no, i, true);
                      }
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: 100,
                        backgroundColor: "#D11D46",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20,
                        marginBottom: 20
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "500",
                          color: "white",
                          fontSize: 18
                        }}
                      >
                        ORDER # {item.order_no}
                      </Text>
                    </View>

                    {this.state.clickStatus == true &&
                      this.state.index == i &&
                      this.state.orderdetails != null &&
                      this.state.orderdetails.map(item => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              width: "100%"
                            }}
                          >
                            <Card
                              style={{
                                width: "100%",
                                height: 100,
                                padding: 10,
                                shadowOffset: { width: 10, height: 10 },
                                shadowColor: "black",
                                shadowOpacity: 1.0,
                                flexDirection: "row",
                                justifyContent: "space-between"
                              }}
                            >
                              <Image
                                source={{ uri: item.featured_image }}
                                style={{ width: 50, height: 50 }}
                              />

                              <View style={{ width: "70%" }}>
                                <Text style={{ fontSize: 12 }}>
                                  Name : {item.name}
                                </Text>
                                <Text>Qty : {item.quantity}</Text>
                                <Text>Amount : {item.product_amount}</Text>
                              </View>
                            </Card>
                          </View>
                        );
                      })}
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default Order;
