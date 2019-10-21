import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Card, Header, Body } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import { Constants } from "expo";

class Cart extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      checkoutData: {
        total: 0
      },
      types: null
    };
  }

  removeCart(key) {
    let id = key.toString();

    let target = "Cart" + id;
    delete this.props.user.CartData[target];

    this.props.updateUser({
      // UserId: this.props.user.UserId,
      // email: this.props.user.email,
      CartData: {
        ...this.props.user.CartData
      }
    });

    this.setState({
      runRender: true
    });

    // this._toggleModal();
  }

  checkOut = () => {
    console.log(this.props.user.CartData);
    let deviceSerial = null;
    try {
      deviceSerial = Constants.deviceId;
      console.log("DEVICE ID FOUND: " + deviceSerial);
    } catch (e) {
      console.log("error reading device ID");
    }

    let buyer_id = this.props.navigation.state.params.id.response;
    console.log("buyer_id", buyer_id);

    let products = [];
    let total = 0;
    Object.values(this.props.user.CartData).map((value, index) => {
      products.push({
        product_id: value.id,
        quantity: value.count,
        product_amount:
          // Number(value.sale_price) > 0
          //   ? value.sale_price
          //   : value.cost_price
          //   ? Number(value.sale_price) > 0
          //     ? value.sale_price
          //     : value.cost_price
          //   : 0,
          value.regural_price ? value.regural_price : 0,
        type: 1
      });
    });
    console.log(products);

    products.forEach(product => {
      total += product.quantity * product.product_amount;
    });

    console.log("TOTAL AMOUNT", total);

    let req_body = JSON.stringify({
      ip_address: deviceSerial.toString(),
      buyer_id,
      total: total,
      products
    });

    console.log(">>>>>>>", req_body);

    fetch(`http://Elementads.co/ethlon/api/post-cart-data`, {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: req_body
    })
      // .then(res => res.json())
      .then(response => {
        // console.log("CHECKOUT RESPONSE", response._bodyInit);
        // console.log("CHECKOUT RESPONSE", response, "CHECKOUT RESPONSE");
        if (response._bodyInit) {
          let form = new FormData();
          form.append("order_no", response._bodyInit);

          // let OrderNo = response._bodyInit;
          // console.log(OrderNo, typeof parsedOrderNo);

          fetch(`http://Elementads.co/ethlon/api/post-payment-by-app`, {
            method: "POST",
            header: {
              "Content-Type": "multipart/form-data"
            },
            body: form
          }).then(res => {
            console.log("2ND RES", res);
            if (res._bodyInit === '"success"') {
              this.props.updateUser({
                CartData: {}
              });
              fetch(
                `http://Elementads.co/ethlon/api/get-user-profile/${this.props.navigation.state.params.id}`
              )
                .then(res => {
                  res.json().then(data => {
                    console.log(data);
                    let contact = data[0].contact_no.split(" ");
                    console.log("SPLITTED CONTACT", contact);
                    fetch(
                      `http://csms.dotklick.com/api_sms/api.php?key=096c4f6c43a663002db224eec67b426f&receiver=${data[0].contact_no}&sender=ETHLON&msgdata=Thankyou for shopping with EthlonSupplies`
                    )
                      .then(res => {
                        res.json().then(otp_response => {
                          console.log("OTP RESPONSE", otp_response);
                          if (otp_response.response.status === "Success") {
                            alert("Checkout Successfully!");
                          } else {
                            alert("Checkout again please!");
                            this.setState({
                              checkoutData: {
                                total: 0
                              }
                            });
                          }
                        });
                      })
                      .catch(err => {
                        console.log("OTP SENDING ERROR IN CART.JS", err);
                      });
                  });
                })
                .catch(err => {
                  console.log("USER PROFILE FETCH ERROR IN CART.JS", err);
                });
            }
          });
        }
        // if (response._bodyInit != "success") {
        //   alert("Checkout again please");
        //   this.setState({
        //     checkoutData: {
        //       total: 0
        //     }
        //   });
        // }
      })
      .catch(() => {
        this.setState({
          checkoutData: {
            total: 0
          }
        });
        alert("Error");
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    // console.log(this.props, "check out data");

    this.props.user &&
      this.props.user.CartData &&
      Object.values(this.props.user.CartData).map((value, index) => {
        console.log("For Badge >>>>>>>>>>>>>>>", index + 1);
      });

    return (
      <ScrollView>
        <View>
          <View style={{ marginTop: 22 }}>
            <Header style={{ backgroundColor: "#D11E46" }}>
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
                        source={require("../images/ic_back.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      fontWeight: "500",
                      margin: 10,
                      marginLeft: "12%"
                    }}
                  >
                    Ethlon Supplies
                  </Text>
                </View>
              </Body>
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity onPress={() => this.checkOut()}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "white",
                        fontWeight: "800"
                      }}
                    >
                      CHECK OUT
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Header>
          </View>
          <View>
            {/* <View style={{flexDirection:'row',justifyContent:'flex-end',marginVertical:10,marginRight:10}}>
                            <Text  style={{fontSize:16,fontWeight:'500',color:'#A3A3A3'}}>
                                SUBTOTAL
                            </Text>
                            <Text  style={{fontSize:16,fontWeight:'500',color:'#A3A3A3'}}>
                               (2 ITEMS) : . 
                            </Text>
                            <Text  style={{fontSize:16,fontWeight:'500',color:'#5FA030'}}>
                             Rs 798
                            </Text>
                        </View> */}
            {/* <Card style={{height:200}}>
                    <View style={{flexDirection:'row',}}>
                    <TouchableOpacity onPress={() => navigate('ItemInfo')} style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center'}}>
                <Image source={require('../images/burger.jpg')} style={{width:150,height:150,marginLeft:10,marginTop:10}}/>
                </View>
                <View style={{flexDirection:'column',marginTop:40,marginLeft:20}}>
                <Text style={{fontSize:16,fontWeight:'500'}}>
                    Super Crispy Burger
                </Text>
                <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>
                   Chilli Sauce
                </Text>
                <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>
                  Ketchup
                </Text>
                </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'flex-end',marginBottom:30,marginRight:40}}>
                <Text style={{fontSize:14,color:'#5FA030',fontWeight:'500',}}>
                     Rs 798
                </Text>
                </View>
                </TouchableOpacity>
                    </Card> */}

            {/* Saqib */}

            <View>
              {this.props.user &&
              this.props.user.CartData &&
              Object.keys(this.props.user.CartData).length == 0 ? (
                <View>
                  <Card style={{ height: 200, justifyContent: "center" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around"
                      }}
                    >
                      <TouchableOpacity>
                        <Text style={{ color: "gray" }}>
                          There is no item available in this cart right now
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Card>
                  {/* <ScrollView>
               <ProductsLess
                  Heading="Also View"
                  navigate={this.props.navigation.navigate}
                />
              </ScrollView> */}
                </View>
              ) : (
                <View>
                  {this.props.user &&
                    this.props.user.CartData &&
                    Object.values(this.props.user.CartData).map(
                      (value, index) => {
                        console.log("YE SALE PRICE", value.sale_price);

                        if (value.sale_price == null) {
                          console.log("NULL HAI");
                          this.state.types = 1;
                        } else {
                          console.log("NULL NAE HAI");
                          this.state.types = 0;
                        }
                        return (
                          <Card key={value.id} style={{ height: 240 }}>
                            <View style={{ flexDirection: "row" }}>
                              <View
                                style={{
                                  flexDirection: "column",
                                  justifyContent: "flex-start"
                                }}
                              >
                                <Image
                                  source={{ uri: value.image }}
                                  style={{
                                    width: 150,
                                    height: 150,
                                    margin: 10
                                  }}
                                />
                                <TouchableOpacity
                                  onPress={() => this.removeCart(value.id)}
                                >
                                  <Text
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                      fontSize: 18,
                                      textAlign: "center",
                                      marginTop: 20
                                    }}
                                  >
                                    Confirm Remove
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ marginTop: 30, marginLeft: 10 }}>
                                <Text style={{ fontSize: 18 }}>
                                  Name : {value.name}
                                </Text>

                                {/* <Text style={{fontSize:14}}>Price : {value.cost_price}</Text>
					  <Text style={{fontSize:14}}>Price : {value.sale_price}</Text> */}

                                {value.sale_price == null ? (
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: "gray",
                                      fontWeight: "400"
                                    }}
                                  >
                                    Cost Price $: {value.cost_price}
                                  </Text>
                                ) : (
                                  <View style={{}}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight: "400",
                                        textDecorationLine: "line-through"
                                      }}
                                    >
                                      Cost Price $: {value.cost_price}
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        fontWeight: "400"
                                      }}
                                    >
                                      Sale Price $: {value.sale_price}
                                    </Text>
                                  </View>
                                )}
                                <Text style={{ fontSize: 14 }}>
                                  Quantity : {value.count}
                                </Text>
                                <View style={{ width: "75%" }}>
                                  <Text style={{ fontSize: 14 }}>
                                    Description : {value.description}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* <Button
                  block
                  onPress={() => this.removeCart(value.id)}
                  style={{ borderWidth:0,backgroundColor: "white", marginBottom: 40 }}
                > */}

                            {/* </Button> */}
                          </Card>
                        );
                      }
                    )}
                  {/* <ProductsLess
                Heading="Also View"
                navigate={this.props.navigation.navigate}
              /> */}
                </View>
              )}
            </View>

            {/* <View >
                                <Button
                                    onPress={()=>this.checkOut()}
                                    style={{
                                        marginTop: 30, color: 'white', backgroundColor: '#FFC425',
                                        marginHorizontal: "5%", width: '90%', textAlign: 'center', borderRadius: 20, height: 40, marginBottom: 100
                                    }}>
                                    <Text style={{ color: '#AE831D', marginLeft: '40%', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>CHECK OUT</Text>
                                </Button>

                            </View> */}
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
)(Cart);

//export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
