import React from 'react';
import { Card, Header, Body,Input ,Item,Icon,Button,Content } from 'native-base';
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import { MapView,Marker } from 'expo';
import Maps from '../screen/Map'
class OrderTracking extends React.Component {
    static navigationOptions={
        header:null,
    }
  render() {
    const {navigate}=this.props.navigation;
    // let coords={
    //     latitude: '24.9088',
    //     longitude: '67.0839',
    // }
    return (
<View style={{marginTop:22,flex:1}}>
<Header style={{ backgroundColor: '#e1b827', flexDirection: 'row' }}>
            <Body style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ marginLeft: 5,flexDirection:'row' }}>
                            <View style={{justifyContent:'center'}}>
                            <TouchableOpacity onPress={ () => navigate('Home')}>
                         <Image source={require('../images/left-arrow.png')} style={{width:20,height:20}}/>
                         </TouchableOpacity>
                            </View>
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: '500',margin:10,marginLeft:"40%" }}>Track Order</Text>
                            </View>
                        </Body>
                    </Header>

<Maps />

</View>
    )}}

    export default OrderTracking;