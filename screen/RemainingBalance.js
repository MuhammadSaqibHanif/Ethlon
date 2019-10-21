import React from "react";
import { View, Text, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

class RemainingBalance extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    fetch(
      `http://Elementads.co/ethlon/api/get-account-statement/ ${this.props.navigation.state.params.id}`
    )
      .then(res => {
        res.json().then(data => {
          console.log("get-account-statement >>>", data);
          this.setState({ remaining_data: data });
        });
      })
      .catch(err => console.log("NO REMAINING DATA ERROR", err));
  }

  render() {
    return (
      <ScrollView>
        <View style={{ width: Dimensions.get("window").width, height: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#D11D46",
              padding: 10,
              marginTop: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Invoice#
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Date
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Amount
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Payment
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Balance
            </Text>
          </View>

          {this.state.remaining_data &&
            this.state.remaining_data.map((item, i) => {
              return (
                <View key={i} style={{ flexDirection: "column" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "95%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "white",
                      padding: 10,
                      borderBottomColor: "lightgray",
                      borderBottomWidth: 1
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.order_no}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.ordered_date}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.total_amount}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.payment}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.remaining_credit}
                    </Text>
                  </View>
                  {item.payment_data.length > 0 &&
                    item.payment_data.map((val, ind) => (
                      <View
                        key={ind}
                        style={{
                          flexDirection: "row",
                          width: "95%",
                          justifyContent: "space-between",
                          backgroundColor: "#C0C0C0",
                          borderBottomWidth: 1,
                          borderBottomColor: "#D3D3D3",
                          alignItems: "center",
                          backgroundColor: "white",
                          padding: 10
                        }}
                      >
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {" "}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {val.created_at.split(" ")[0]}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {" "}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {val.payed_amount}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {" "}
                        </Text>
                      </View>
                    ))}
                </View>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default RemainingBalance;
