import React from 'react';
import { Card, Header, Body,Input ,Item,Icon,Button,Content } from 'native-base';
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
class Favourite extends React.Component {
    static navigationOptions={
        header:null,
    }
  render() {
    const {navigate}=this.props.navigation;
    return (
<View style={{flex:1,backgroundColor:'white'}}>
<ScrollView>
<View style={{marginTop:22}}>
            <Header style={{ backgroundColor: '#e1b827', flexDirection: 'row' }}>
            <Body style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', marginLeft: 5 }}>
                            <View style={{ marginLeft: 5,flexDirection:'row' }}>
                            <View style={{justifyContent:'center'}}>
                            <TouchableOpacity onPress={ () => navigate('Home')}>
                         <Image source={require('../images/left-arrow.png')} style={{width:20,height:20}}/>
                         </TouchableOpacity>
                            </View>
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: '500',margin:10,marginLeft:"45%" }}>Favourites</Text>
                            </View>
                        </Body>
                    </Header>
                    </View>
<Card style={{flexDirection:'row',height:100}}>
                    <TouchableOpacity onPress={() => navigate('')} style={{flexDirection:'row'}}>
                    <View>
               <Image source={require('../images/kfc.png')} style={{width:110,height:100}}/>
                    </View>
                    <View style={{marginTop:20}}>
                        <Text style={{fontSize:22,color:'#FFC425',fontWeight:'500'}}>KFC</Text>
                        <Text style={{fontSize:14,color:'gray',fontWeight:'400',width:'60%'}}>Address Address Address 
                        Address Address Address Address Address</Text>
                    </View>
                </TouchableOpacity>
                    </Card>
               
           
                   
                    </ScrollView>
</View>

    )}}
    export default Favourite;