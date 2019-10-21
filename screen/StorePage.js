import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Icon,
  Drawer,
  Item as FormItem,
  Header,
  Body,
  Card,
  Button
} from "native-base";
import StarRating from "react-native-star-rating";
import ImageView from "react-native-image-view";

const images = [
  {
    source: {
      uri: "../images/optp.jpg"
    },
    title: "Paris",
    width: 100,
    height: 100
  },
  {
    source: {
      uri: "../images/optp.jpg"
    },
    title: "Paris",
    width: 100,
    height: 100
  },
  {
    source: {
      uri: "../images/optp.jpg"
    },
    title: "Paris",
    width: 100,
    height: 100
  }
];

class StorePage extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
      id: this.props.navigation.state.params.id,
      name: this.props.navigation.state.params.name,
      image: this.props.navigation.state.params.image,
      address: this.props.navigation.state.params.address,
      resta: [],
      pro_cat_id: null
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  componentWillMount() {
    fetch(`http://foodfella.net/afroeatt/api/get/categories/${this.state.id}`)
      .then(res => {
        res.json().then(data => {
          // console.log("restaurent datas",data,data[0].id)
          this.setState({
            resta: data,
            pro_cat_id: data[0].id
          });
        });
      })
      .catch(err => {
        // console.log("Fetch Student Homwork",err)
      });
  }

  render() {
    // console.log('storePage',this.state.id)
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "white"
        }}
      >
        <ScrollView>
          <View style={{ marginTop: -5 }}>
            <Card style={{ height: 340 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  {this.state.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 0
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "gray" }}
                >
                  Beverages , Burger , Fast Food
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 0
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "400", color: "gray" }}
                >
                  Karachi, Pakistan
                </Text>
              </View>
              <Image
                source={{ uri: this.state.image }}
                style={{ height: 200, width: "100%", marginTop: 10 }}
              />
              <View
                style={{
                  borderBottomWidth: 0.4,
                  borderBottomColor: "gray",
                  marginTop: 0
                }}
              />

              {/* <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
            <Text style={{fontSize:14,fontWeight:'500',color:'green'}}>
               Open Now
            </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>
            <Text style={{fontSize:14,fontWeight:'400'}}>
               Timing 12:00 PM to 1:45 AM
            </Text>
            </View> */}
              {/* <View style={{borderBottomWidth:0.4,borderBottomColor:'gray',marginTop:10}}/> */}
              {/* <View style={{flexDirection:'row'}}>
                <View style={{width:"40%",borderWidth:0.9,borderColor:'#A8C151',
                flexDirection:'row',paddingVertical:10,justifyContent:'center',borderRadius:10,marginTop:20,marginLeft:"5%"}}>
                    <Image source={require('../images/story.png')} style={{width:20,height:20,marginRight:5}}/>
                    <Text style={{color:"#A8C151",marginLeft:5}}>Review</Text>
                </View>
                <View style={{width:"40%",borderWidth:0.9,borderColor:'red',
                flexDirection:'row',paddingVertical:10,justifyContent:'center',borderRadius:10,marginTop:20,marginLeft:"5%"}}>
                    <Image source={require('../images/hearts.png')} style={{width:20,height:20,marginRight:5}}/>
                    <Text style={{color:"#red",marginLeft:5}}>Favourite</Text>
                </View>
           </View>
           <View style={{borderBottomWidth:0.4,borderBottomColor:'gray',marginTop:20}}/>
           <View>
             <Button      
           //  onPress={()=>navigate('OrderPage',{id:this.state.id})}
                      style={{
                     marginTop: 10, color: 'white', backgroundColor: 'red',
                     marginHorizontal: "5%", width: '90%', textAlign: 'center', borderRadius: 10, height: 40, marginBottom: 10
                      }}>
                 <Text style={{ color: 'white', marginLeft: '40%', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>Order Online</Text>
             </Button>
          </View> */}
              {/* <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:10}}>
              <View style={{marginLeft:10}}>
                       <Text style={{fontSize:12}}>AVG DELIVERY TIME</Text> 
                       <Text style={{fontSize:12}}>45 min</Text> 
              </View>
              <View>
                       <Text style={{fontSize:12}}>MN ORDER</Text> 
                       <Text style={{fontSize:12}}>RS.300</Text> 
              </View>
              <View style={{marginRight:10,fontSize:12}}>
                       <Text style={{fontSize:12,marginLeft:20}}>PAYMENT</Text> 
                       <Text style={{fontSize:12}}>Online & Cash</Text> 
              </View>
          </View> */}
            </Card>
            <Card style={{ height: 100 }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 16,
                    fontWeight: "500",
                    marginTop: 10
                  }}
                >
                  Rate Us
                </Text>
              </View>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={rating => this.onStarRatingPress(rating)}
                fullStarColor={"gray"}
                starSize={30}
              />
            </Card>
            <Card style={{ height: 160 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  marginTop: 10,
                  marginLeft: 10
                }}
              >
                Category
              </Text>
              {/* <View>
 
                      <ScrollView horizontal={true}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                        </View>
                      </ScrollView>
                      </View>   */}
              <View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Card
                    style={{ flexDirection: "row", width: "100%", height: 120 }}
                  >
                    {this.state.resta &&
                      this.state.resta.map(data => {
                        return (
                          <TouchableOpacity
                            style={{ flexDirection: "column" }}
                            onPress={() =>
                              navigate("OrderPage", {
                                pro_cat_id: this.state.pro_cat_id
                              })
                            }
                          >
                            <Image
                              source={{ uri: data.image }}
                              style={{
                                height: 100,
                                width: 100,
                                marginLeft: 10,
                                marginTop: 10
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                marginHorizontal: 40,
                                marginTop: 10,
                                fontWeight: "500"
                              }}
                            >
                              {data.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </Card>
                </ScrollView>
              </View>
            </Card>
            {/* 
        <Card style={{height:180}}>
              <Text style={{fontSize:18,fontWeight:'500',margin:10}}>
                  Photos</Text>            
                  <View>
                      <ScrollView horizontal={true}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                            <Image source={require('../images/optp.jpg')} style={{width:100,height:100}}/>
                        </View>
                      </ScrollView>
                      </View>  
        </Card> */}
            {/* <Card style={{height:300}}>
                            <Text style={{fontSize:18,fontWeight:'500',margin:10}}>
                                Info
                            </Text>
                            <View style={{flexDirection:'row',marginLeft:10}}>
                                <View>
                                    <View style={{marginBottom:5}}>
                                    <Text style={{color:'gray'}}>
                                        Call
                                    </Text>
                                    <Text>
                                        0900-78601
                                    </Text>
                                    </View>
                                    <View style={{marginBottom:5}}>
                                    <Text style={{color:'gray'}}>
                                        Cusiness
                                    </Text>
                                    <Text>
                                        Burger , Beverages, Cold Drink
                                    </Text>
                                    </View>
                                    
                                    <View style={{marginBottom:5}}>
                                    <Text style={{color:'gray'}}>
                                        Type
                                    </Text>
                                    <Text>
                                      Casual Drinking
                                    </Text>
                                    </View>

                                    <View style={{marginBottom:5}}>
                                    <Text style={{color:'gray'}}>
                                        Popular for
                                    </Text>
                                    <Text>
                                    Burger , Beverages, Cold Drink
                                    </Text>
                                    </View>

                                    <View style={{marginBottom:5}}>
                                    <Text style={{color:'gray'}}>
                                     Average Cost
                                    </Text>
                                    <Text>
                                    Burger , Beverages, Cold Drink
                                    </Text>
                                    </View>

                                    <View style={{marginBottom:5}}>
                                    <Text style={{color:'gray'}}>
                                     Payment Type
                                    </Text>
                                    <Text>
                                    Online & Cash Both
                                    </Text>
                                    </View>

                                </View>
                                <View style={{marginLeft:30}}>
                                    <View>
                                    <Text style={{color:'gray'}}>
                                   MORE INFO
                                    </Text>
                                    </View>

                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../images/checked.png')} style={{width:10,height:10,marginTop:5}}/>
                                        <Text style={{marginLeft:10}}>Wifi</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../images/checked.png')} style={{width:10,height:10,marginTop:5}}/>
                                        <Text style={{marginLeft:10}}>Indoor Seating</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../images/checked.png')} style={{width:10,height:10,marginTop:5}}/>
                                        <Text style={{marginLeft:10}}>Air-Conditioned</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../images/checked.png')} style={{width:10,height:10,marginTop:5}}/>
                                        <Text style={{marginLeft:10}}>Kids Chairs</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('../images/checked.png')} style={{width:10,height:10,marginTop:5}}/>
                                        <Text style={{marginLeft:10}}>Take Away</Text>
                                    </View>
                                    </View>
                                    
                            </View>
                        </Card> */}
            <Card style={{ height: 100, marginTop: 10, marginBottom: 80 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  margin: 10,
                  color: "red"
                }}
              >
                Address
              </Text>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 14, width: "100%" }}>
                  {this.state.address}
                </Text>
              </View>
            </Card>
            {/* <Card style={{height:150}}>
                        <Text style={{fontSize:18,fontWeight:'500',margin:10,color:'red'}}>
                  Promotions</Text>
                  <View style={{marginLeft:10}}>
                  <Text style={{fontSize:14,marginTop:10}}>
                     Get Your Fire House In Just 200 Rupees.
                  </Text>
                  <Text style={{fontSize:12}}>
                     Use Promo code EATBURGERLAB at checkout to get further discount.
                  </Text>
                      </View> 
                        </Card> */}
            {/* <Card styl={{height:400}}>
                            <View>
                            <Text style={{fontSize:18,fontWeight:'500',margin:10,color:'red'}}>
                  Review</Text>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={{borderWidth:0.5,backgroundColor:'#A9C14E',
                                    paddingVertical:5,paddingHorizontal:10,borderColor:'#A9C14E',marginLeft:10,borderRadius:5,color:'white'}}>
                                        3.6
                                    </Text>
                                    <Text style={{fontSize:12,color:"gray",marginLeft:10}}>
                                        Based on user ratings & feedback
                                    </Text>
                            </View>
                                <Text style={{marginLeft:10,marginTop:5}}>
                                    How was your Experience ?
                                </Text>
                                <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                                <Button  style={{width:'90%',backgroundColor:'#014EC4',borderRadius:5,justifyContent:'center',}}>
                                    <Text style={{color:'white'}}> Add your Reviews </Text>
                                </Button>
                                </View>
                                <View style={{borderBottomColor:'gray',borderBottomWidth:0.5,marginVertical:10}}/>
                                <Text style={{fontSize:16,fontWeight:'500',marginVertical:5,marginLeft:5,color:'red'}}>
                                    Most Recent
                                </Text>
                                <View style={{flexDirection:'row',marginTop:10,marginLeft:10}}>
                                    <Image source={require('../images/person.jpg')} style={{width:30,height:30,borderRadius:20}}/>
                                    <View style={{marginLeft:10}}>
                                        <Text style={{fontSize:16,fontWeight:'500'}}>
                                            Shayan Jiwa
                                        </Text>
                                        <Text style={{fontSize:14,fontWeight:'400'}}>
                                            Feb 26,2019
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{fontSize:12,color:'gray',marginLeft:10}}>
                                    Coment
                                </Text>
                                <View style={{borderBottomColor:'gray',borderBottomWidth:0.5,marginVertical:10}}/>
                                <View style={{flexDirection:'row',justifyContent:'center',marginTop:10,marginBottom:10}}>
                                <Button  style={{width:'90%',backgroundColor:'red',borderRadius:5,justifyContent:'center',}}>
                                    <Text style={{color:'white'}}> Read All Reviews </Text>
                                </Button>
                                </View>
                            </View>                              
                        </Card> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default StorePage;
