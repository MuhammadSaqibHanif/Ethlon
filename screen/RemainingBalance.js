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
      `http://Elementads.co/ethlon/api/get-payment/${this.props.navigation.state.params.id}`
    )
      .then(res => {
        res.json().then(data => {
          console.log("get-payment >>>", data);
          this.setState({ remaining_data: data });

          fetch(
            `http://Elementads.co/ethlon/api/get-payment-details/${this.props.navigation.state.params.id}`
          )
            .then(resp => {
              resp.json().then(details => {
                console.log("get-payment-details >>>", details);
                this.setState({ details });
              });
            })
            .catch(err => console.log("NO REMAINING DATA ERROR", err));
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
              Name
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Email Address
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Total
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Payed
            </Text>
            <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
              Balance
            </Text>
          </View>

          {this.state.remaining_data &&
            this.state.remaining_data != "No Data Found" &&
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
                      {item.customer_name}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.customer_email}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.total_payment}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.payed_amount}
                    </Text>
                    <Text
                      style={{
                        color: "black",
                        fontSize: 12,
                        fontWeight: "500"
                      }}
                    >
                      {item.remaining_amount}
                    </Text>
                  </View>

                  {this.state.details && this.state.details != "No Data Found" && (
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        backgroundColor: "lightgray",
                        borderBottomWidth: 1,
                        borderBottomColor: "#D3D3D3",
                        alignItems: "center",
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
                        Time
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 12,
                          fontWeight: "500"
                        }}
                      >
                        Date
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 12,
                          fontWeight: "500"
                        }}
                      >
                        Payment
                      </Text>
                      {/* <Text
                        style={{
                          color: "black",
                          fontSize: 12,
                          fontWeight: "500"
                        }}
                      >
                        {" "}
                      </Text> */}
                    </View>
                  )}
                  {this.state.details &&
                    this.state.details != "No Data Found" &&
                    this.state.details.map((val, ind) => (
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
                          {val.time}
                        </Text>
                        <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {val.date}
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
                        {/* <Text
                          style={{
                            color: "black",
                            fontSize: 12,
                            fontWeight: "500"
                          }}
                        >
                          {" "}
                        </Text> */}
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
