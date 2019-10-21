import React, { Component } from 'react';
import { StyleSheet, Text, View ,Image,KeyboardAvoidingView,ScrollView,TouchableOpacity } from 'react-native';
import { Card, Header, Body,Item,Input,Button,CheckBox } from 'native-base';
class ChangePassword extends Component {
    static navigationOptions = {
        header: null,
   
    };
    constructor(props){
        super(props)
        this.state={
       
        }
    }
  
    render() {
        const {navigate}=this.props.navigation;
        return (
            <View >
            <View style={{marginTop:22}}>
                        <Header style={{ backgroundColor: '#e1b827' }}>
                                    <Body style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', marginLeft: 5 }}>
                                        <View style={{ marginLeft: 5,flexDirection:'row' }}>
                                        <View style={{justifyContent:'center'}}>
                                        <TouchableOpacity onPress={ () => navigate('Home')}>
                                     <Image source={require('../images/left-arrow.png')} style={{width:20,height:20}}/>
                                     </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={ () => navigate('Profile')}>
                                            <Text style={{ fontSize: 18, color: 'white', fontWeight: '500',margin:10,marginLeft:10 }}>CHANGE PASSWORD</Text>
                                            </TouchableOpacity>
                                        </View>
                                        </Body>
                    </Header>
                    </View>
                    <ScrollView>
                    <View >
                    <View style={{flexDirection:'row',marginTop:20,marginBottom:5,marginLeft:30}}>
     <Text style={{fontSize:16,fontWeight:'500',color:'#91C322',}}>PLEASE ENTER OLD AND NEW PASSWORD</Text>
     </View>
     <View style={{borderBottomWidth:1,borderBottomColor:'#b80000',width:'90%',marginLeft:'5%',marginBottom:10,}}/>
     
     <View  style={{marginTop:20,flexDirection:'row',justifyContent:'center'}}>
<Input placeholder='Current Password' style={{marginLeft:20}}/>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:'#b80000',width:'90%',marginLeft:'5%',}}/>

<View  style={{marginTop:10,flexDirection:'row',justifyContent:'center'}}>
<Input placeholder='New Password' style={{marginLeft:20}}/>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:'#b80000',width:'90%',marginLeft:'5%',}}/>

<View  style={{marginTop:10,flexDirection:'row',justifyContent:'center'}}>
<Input placeholder='Re-enter Password' style={{marginLeft:20}}/>
</View>
<View style={{borderBottomWidth:1,borderBottomColor:'#b80000',width:'90%',marginLeft:'5%',}}/>

<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
    <Text style={{fontSize:16,fontWeight:'600',width:"90%",color:'#91C322'}}>Password Must Be At Least 8 Characters With 1 Numeric Digit .</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
    <Text style={{fontSize:16,fontWeight:'600',width:"90%",color:'#91C322'}}>Once You Changed Your Password , You Will Be Required To Login Again.</Text>
</View>
<View>
                <Button
                                 
                                    style={{
                                        marginTop: 40, color: 'white', backgroundColor: '#91C322',
                                        marginHorizontal: "5%", width: '90%', textAlign: 'center', borderRadius: 10, height: 40
                                    }}>
                                    <Text style={{ color: 'white', marginLeft: '45%', fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>SAVE</Text>
                                </Button>
          </View>
                    </View>
                    </ScrollView>
                    </View>
                    

)}
}

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
  });