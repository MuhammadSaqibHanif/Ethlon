import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
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
class AddCart extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      product_detail: [],
      id: this.props.navigation.state.params.id
    };
  }

  componentDidMount() {
    fetch(
      `http://Elementads.co/ethlon/api/get-product-details/${
        this.state.id
      }`
    )
      .then(res => {
        res.json().then(data => {
          console.log("restaurent data", data);
          this.setState({
            product_detail: data
          });
        });
      })
      .catch(err => {
        console.log("Fetch Student Homwork", err);
      });
  }

  _storeData = async (key, item) => {
    const id = key.toString();

    // this.props.user && this.props.user.UserId
    // ?

    this.props.user != null
      ? this.props.updateUser({
          //   UserId: this.props.user.UserId,
          // email: this.props.user.email,
          CartData: {
            ...this.props.user.CartData,
            //  [`Cart${id}`]: item
            [`Cart${id}`]: {
              id: item.id,
              name: item.name,
              sale_price: item.sale_price,
              image: item.image,
              description: item.description,
              cost_price: item.cost_price,
              sale_price: item.sale_price,
              count: this.state.count
            }
          }
          // productCount: this.state.productCount + 1
        })
      : this.props.updateUser({
          CartData: {
            //  [`Cart${id}`]: item
            [`Cart${id}`]: {
              id: item.id,
              name: item.name,
              sale_price: item.sale_price,
              image: item.image,
              description: item.description,
              cost_price: item.cost_price,
              sale_price: item.sale_price,
              count: this.state.count
            }
          }
          // productCount: this.state.productCount + 1
        });

    // :
    // // this.props.user &&
    // this.props.user.CartData
    // ? this.props.updateUser({
    //     CartData: {
    //       ...this.props.user.CartData,
    //       [`Cart${id}`]: item
    //     }
    //   })
    // : this.props.updateUser({
    //     CartData: {
    //       [`Cart${id}`]: item
    //     }
    //   });

    // this.props.navigation.navigate("Cart", { cartProp: id });
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
    console.log("id", this.state.id);
    console.log(this.props, "props of add to cart");
    return (
      <View>
        <View style={{ marginTop: 0 }}>
          {/* <Header style={{ backgroundColor: 'white' }}>
                        <Body style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ marginLeft: 5,flexDirection:'row' }}>
                            <View style={{justifyContent:'center'}}>
                            <TouchableOpacity onPress={ () => navigate('MenuItems')}>
                         <Image source={require('../images/left-arrow.png')} style={{width:20,height:20}}/>
                         </TouchableOpacity>
                            </View>
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: '500',margin:10,marginLeft:10 }}>Deal Meal</Text>
                            </View>
                        </Body>
                        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress={ () => navigate('AddCart')}>
                      <Image source={require('../images/shopping-cart.png')} style={{width:35,height:35,margin:10}}/>
                      </TouchableOpacity>
                        </View>
                    </Header> */}
        </View>
        <View>
          {/* <Card style={{height:Dimensions.get('window').height}}> */}
          {this.state.product_detail &&
            this.state.product_detail.map(data => {
              return (
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
                        source={{ uri: data.image }}
                        style={{ width: 200, height: 200 }}
                      />
                    </View>
                    <View style={{ marginLeft: "2%", marginTop: 10 }}>
                      <View style={{ justifyContent: "flex-start" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#91C322",
                            fontWeight: "500"
                          }}
                        >
                          {" "}
                          {data.name}
                        </Text>
                        {/* <Text style={{fontSize:12,color:'gray',fontWeight:'400',marginLeft:10}}>{data.cost_price}</Text> */}
                        {data.sale_price == null ? (
                          <Text
                            style={{
                              fontSize: 14,
                              color: "gray",
                              fontWeight: "400"
                            }}
                          >
                            Cost Price $: {data.cost_price}
                          </Text>
                        ) : (
                          <View style={{}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: "gray",
                                fontWeight: "400",
                                textDecorationLine: "line-through"
                              }}
                            >
                              Cost Price $: {data.cost_price}
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                color: "gray",
                                fontWeight: "400",
                                marginVertical: 10
                              }}
                            >
                              Sale Price $: {data.sale_price}
                            </Text>
                          </View>
                        )}

                        <Text
                          style={{
                            fontSize: 12,
                            color: "gray",
                            fontWeight: "400",
                            marginLeft: 10
                          }}
                        >
                          {data.description}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end"
                        }}
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
                                  backgroundColor: "#91C322"
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
                            <TouchableOpacity
                              onPress={() => this._incrementCount()}
                            >
                              <Text
                                style={{
                                  fontSize: 20,
                                  borderWidth: 1,
                                  width: 30,
                                  textAlign: "center",
                                  borderColor: "white",
                                  backgroundColor: "#91C322",
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
                    {/* <View style={{marginLeft:'4%',marginTop:5}}>
                        <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>Rs 286</Text>
                    </View> */}
                    {/* <View style={{flexDirection:'row',marginLeft:'3%',marginTop:20}}>
                        <Text style={{marginLeft:10,fontSize:20,borderWidth:1,width:30,textAlign:'center'}}>-</Text>                     
                        <Text style={{fontSize:20,borderWidth:1,width:30,textAlign:'center'}}>1</Text>                       
                        <Text style={{fontSize:20,borderWidth:1,width:30,textAlign:'center'}}>+</Text>                    
                    </View> */}
                  </Card>
                  <View>
                    <Button
                      onPress={() => this._storeData(data.id, data)}
                      style={{
                        marginTop: 30,
                        color: "white",
                        backgroundColor: "#91C322",
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
              );
            })}
        </View>
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
)(AddCart);
//export default AddCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
