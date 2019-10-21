import React from "react";
import {
  Card,
  Header,
  Body,
  Input,
  Item,
  Icon,
  Button,
  Content,
  CardItem,
  Left,
  Toast,
  Root
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
class OrderDetail extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      order_info: [],
      order_no: this.props.navigation.state.params.order_no
    };
  }
  componentDidMount() {
    fetch(
      `http://Elementads.co/ethlon/api/get/order-details/${
        this.state.order_no
      }`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("order data",data)
          this.setState({
            order_info: data
          });
        });
      })
      .catch(err => {
        // console.log("Fetch order data",err)
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    // console.log('order console',this.props,this.state.order_info)
    return (
      <View style={{ marginTop: 22 }}>
        <Header style={{ backgroundColor: "#D11E46", flexDirection: "row" }}>
          <Body
            style={{
              flex: 1,
              justifyContent: "flex-start",
              flexDirection: "row",
              marginLeft: 5
            }}
          >
            <View style={{ marginLeft: 5, flexDirection: "row" }}>
              <View style={{ justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("MyOrder")}>
                  <Image
                    source={require("../images/left-arrow.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: "white",
                  fontWeight: "500",
                  margin: 10,
                  marginLeft: "40%"
                }}
              >
                Order Detail
              </Text>
            </View>
          </Body>
        </Header>
        <ScrollView>
          {this.state.order_info &&
            this.state.order_info.map((value, i) => {
              return (
                <Card
                  style={{
                    flexDirection: "column",
                    height: 200,
                    marginBottom: 20
                  }}
                >
                  <Text
                    style={{
                      marginTop: 5,
                      marginLeft: 10,
                      fontSize: 14,
                      fontWeight: "500"
                    }}
                  >
                    Order No : {value.order_no}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <View>
                      <Image
                        source={{ uri: value.product_image }}
                        style={{ height: 150, width: 180 }}
                      />
                    </View>
                    <View style={{ marginLeft: 30 }}>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Product Name : {value.product_name}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Quantity : {value.quantity}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Price : {value.price}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Order Total : {value.order_total}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Type : {value.order_total}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Order Status : {value.order_status}
                      </Text>
                      <Text style={{ fontSize: 14, fontWeight: "500" }}>
                        Payment Status : {value.payment_status}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <Text
                      style={{
                        marginTop: 5,
                        marginLeft: 10,
                        fontSize: 14,
                        fontWeight: "500",
                        marginRight: 20
                      }}
                    >
                      Total : {value.total}
                    </Text>
                  </View>
                </Card>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
export default OrderDetail;
