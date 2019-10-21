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
class OrderPage extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      resta: [],
      product: [],
      // id: this.props.navigation.state.params.id,
      pro_cat_id: this.props.navigation.state.params.pro_cat_id
    };
  }

  componentWillMount() {
    // fetch(` http://Elementads.co/afroeatt/api/get/child-categories/${this.state.id}`)
    // .then(res=>{
    //     res.json().then(data=>{
    //         console.log("restaurent datas",data,data[0].id)
    //         this.setState({

    //             resta:data,
    //             pro_cat_id:data[0].id

    //         })
    //     })
    // }).catch(err=>{
    //     console.log("Fetch Student Homwork",err)
    // })
    fetch(
      `http://Elementads.co/ethlon/api/get/products-by-category/${
        this.state.pro_cat_id
      }`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("restaurent datasss",data)
          this.setState({
            product: data
          });
        });
      })
      .catch(err => {
        // console.log("Fetch Student Homwork",err)
      });
  }

  // product=()=>{
  //     fetch(`http://Elementads.co/afroeatt/api/get/products-by-category/${this.state.pro_cat_id}`)
  //     .then(res=>{
  //         res.json().then(data=>{
  //             console.log("restaurent datasss",data)
  //             this.setState({

  //                 product:data,

  //             })
  //         })
  //     }).catch(err=>{
  //         console.log("Fetch Student Homwork",err)
  //     })
  // }

  render() {
    //
    console.log("id", this.props.navigation.state.params);
    //   console.log("id",this.state.id)
    //   console.log("id product",this.state.product,this.state.pro_cat_id)
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, backgroundColor: "white", marginTop: 0 }}>
        {/* <View>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <Card style={{flexDirection:'row',width:"100%",height:60}}>
    {this.state.resta &&
            this.state.resta.map(data => {
              return (
   <TouchableOpacity style={{flexDirection:'row'}}
   onPress={()=>this.product()}
   >
          <Image source={{ uri: data.image }} style={{height:40,width:40,marginLeft:10,marginTop:5}}/>
            <Text style={{fontSize:16,marginHorizontal:10,marginTop:10,fontWeight:'500'}}>{data.name}</Text>
            </TouchableOpacity>
             );
            })}
            
    
    </Card>
</ScrollView>
</View> */}
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView>
            {this.state.product &&
              this.state.product.map(data => {
                return (
                  <TouchableOpacity
                    onPress={() => navigate("AddCart", { id: data.id })}
                    style={{ flexDirection: "row" }}
                  >
                    <Card
                      style={{
                        flexDirection: "row",
                        height: 100,
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between"
                      }}
                    >
                      {/* <View> */}

                      <View style={{ justifyContent: "center" }}>
                        {/* <Image source={require('../images/burger.jpg')} style={{width:80,height:80,marginLeft:10}}/> */}
                        {/* </View> */}
                        <View style={{ marginTop: 0, marginLeft: 10 }}>
                          <Text style={{ fontSize: 18, fontWeight: "500" }}>
                            {data.name}
                          </Text>
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
                            <View>
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
                                  fontWeight: "400"
                                }}
                              >
                                Sale Price $: {data.sale_price}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <View>
                        <Image
                          source={{ uri: data.image }}
                          style={{ width: 80, height: 80, margin: 10 }}
                        />
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
export default OrderPage;
