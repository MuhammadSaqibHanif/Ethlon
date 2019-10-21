import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Invoice extends React.Component {
  constructor() {
    super();
    this.state = {
      invoices: null
    };
  }

  componentDidMount() {
    fetch(
      `http://Elementads.co/ethlon/api/get-orders-invoices/${
        this.props.navigation.state.params.id
      }`
    )
      .then(res => {
        res.json().then(data => {
          console.log("RESPONSE INVOICES", data);

          this.setState({ invoices: data });
        });
      })
      .catch(err => {
        this.setState({ invoices: [] });
      });
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            width: Dimensions.get("window").width,
            height: "100%",
            padding: 20
          }}
        >
          {!this.state.invoices && (
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
          {this.state.invoices &&
            this.state.invoices.map(item => {
              return (
                <View>
                  <View
                    style={{
                      width: "100%",
                      marginTop: 30,
                      backgroundColor: "#D11D46",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white" }}>INVOICE</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <Text>ID:{item.order_no}</Text>
                      <Text>name : {item.name}</Text>
                      <Text>address : {item.address}</Text>
                      <Text>phone_no : {item.phone_no}</Text>
                      <Text>total_amount : {item.total_amount}</Text>
                      <Text>remaining_balance : {item.remaining_credit}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "flex-start"
                      }}
                    >
                      <Text>Date: {item.ordered_date}</Text>
                    </View>
                  </View>

                  {/* <View
                  style={{
                    width: "100%",
                    backgroundColor: "#D11D46",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "white" }}>item</Text>

                  <View
                    style={{
                      width: "30%",
                      backgroundColor: "#D11D46",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white" }}>Cost</Text>
                    <Text style={{ color: "white" }}>Qty</Text>
                    <Text style={{ color: "white" }}>Total</Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Text>MilkPack</Text>

                  <View
                    style={{
                      width: "30%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <Text>200</Text>
                    <Text>2</Text>
                    <Text>400</Text>
                  </View>
                </View> */}
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default Invoice;
