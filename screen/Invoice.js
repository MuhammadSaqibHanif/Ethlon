import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class Invoice extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      invoices: null
    };
  }

  componentDidMount() {
    fetch(
      `http://admin.ethlonsupplies.com/api/get-orders-invoices/${this.props.navigation.state.params.id}`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("get-orders-invoices", data);

          this.setState({ invoices: data });
        });
      })
      .catch(err => {
        this.setState({ invoices: [] });

        console.log("get-orders-invoices err", err);
      });
  }

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
            this.state.invoices.map((item, index) => {
              return (
                <View key={index}>
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
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default Invoice;
