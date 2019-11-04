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
class MyOrder extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      order_info: null,
      user_id: this.props.navigation.state.params.id
    };
  }

  componentDidMount() {
    fetch(
      `http://admin.ethlonsupplies.com/api/get-orders/${this.state.user_id}`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("order data",data)
          if (data) {
            this.setState({
              order_info: data
            });
          } else {
            this.setState({
              order_info: null
            });
          }
        });
      })
      .catch(err => {
        console.log("Fetch order data", err);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    // console.log('order console',this.props.navigation.state.params.id)
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ marginTop: 22 }}>
            <Header
              style={{ backgroundColor: "#D11E46", flexDirection: "row" }}
            >
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
                    <TouchableOpacity onPress={() => navigate("Home")}>
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
                      marginLeft: "45%"
                    }}
                  >
                    My Orders
                  </Text>
                </View>
              </Body>
            </Header>
          </View>
          {this.state.order_info == null && (
            <View
              style={{
                height: Dimensions.get("window").height,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ color: "grey", fontWeight: "500", fontSize: 20 }}>
                sorry no invoices ...
              </Text>
            </View>
          )}
          {this.state.order_info &&
            this.state.order_info.map(data => {
              return (
                <Card style={{ flexDirection: "row", height: 130 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate("OrderDetail", { order_no: data.order_no })
                    }
                  >
                    <View style={{ marginTop: 5, marginLeft: 10 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#FFC425",
                          fontWeight: "500"
                        }}
                      >
                        Order Number : {data.order_no}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "gray",
                          fontWeight: "400",
                          width: "60%",
                          marginTop: 20
                        }}
                      >
                        Order Status : {data.order_status}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "gray",
                          fontWeight: "400",
                          width: "60%"
                        }}
                      >
                        Payment Status : {data.payment_status}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "gray",
                          fontWeight: "400",
                          width: "60%"
                        }}
                      >
                        Total : {data.total}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Card>
              );
            })}
        </ScrollView>
      </View>
    );
  }
}
export default MyOrder;
