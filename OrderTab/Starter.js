import React from 'react';
import { Card, Header, Body,Input ,Item,Icon,Button,Content } from 'native-base';
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
class Starter extends React.Component {
    static navigationOptions={
        header:null,
    }
  render() {
    const {navigate}=this.props.navigation;
    return (
<View style={{flex:1,backgroundColor:'white'}}>
<ScrollView>
<Card style={{flexDirection:'row',height:100}}>
                    <TouchableOpacity onPress={() => navigate('')} style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center'}}>
                {/* <Image source={require('../images/burger.jpg')} style={{width:80,height:80,marginLeft:10}}/> */}
                </View>
                <View style={{marginTop:10,marginLeft:20}}>
                <Text style={{fontSize:14,fontWeight:'500'}}>
                    Super Crispy Burger
                </Text>
                <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>
                   Rs 798
                </Text>
                <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>
                  1 Crispy Burger , French Fries , Cold Drink , colslaw
                </Text> 
                </View>
                </TouchableOpacity>
                    </Card>
                    <Card style={{flexDirection:'row',height:100}}>
                    <TouchableOpacity onPress={() => navigate('')} style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center'}}>
                {/* <Image source={require('../images/burger.jpg')} style={{width:80,height:80,marginLeft:10}}/> */}
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',marginLeft:20}}>
                <Text style={{fontSize:14,fontWeight:'500'}}>
                    Super Crispy Burger
                </Text>
                <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>
                    from Rs 798
                </Text>
                </View>
                </TouchableOpacity>
                    </Card>
                    <Card style={{flexDirection:'row',height:100}}>
                    <TouchableOpacity onPress={() => navigate('')} style={{flexDirection:'row'}}>
                    <View style={{justifyContent:'center'}}>
                {/* <Image source={require('../images/burger.jpg')} style={{width:80,height:80,marginLeft:10}}/> */}
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',marginLeft:20}}>
                <Text style={{fontSize:14,fontWeight:'500'}}>
                    Super Crispy Burger
                </Text>
                <Text style={{fontSize:12,color:'gray',fontWeight:'400'}}>
                    from Rs 798
                </Text>
                </View>
                </TouchableOpacity>
                    </Card>
                    </ScrollView>
</View>

    )}}
    export default Starter;