import React from 'react';
import { Card, Header, Body,Input ,Item,Icon,Button,Content,CheckBox } from 'native-base';
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
class Address extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props){
        super(props)
        this.state={
            one: false,
            two: false,
            three: false
        }
    }
    onePressed() {
        if (this.state.one)
          this.setState({ one: false });
        else
          this.setState({ one: true, two: false, three: false });
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
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: '500',margin:10,marginLeft:"45%" }}>Address</Text>
                            </View>
                        </Body>
                    </Header>
                    </View>
<Card style={{flexDirection:'column',height:500}}>

                        <Text style={{fontSize:18,fontWeight:'500',margin:10,color:'#b80000'}}>Add New Address</Text>
                        <View style={{borderBottomWidth:0.9,borderBottomColor:'gray',marginTop:5}}/>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Item success style={{width:'40%'}}>
            <Input placeholder='State' placeholderTextColor="black" style={{color:'white',borderBottomColor:'white',borderBottomWidth:1}}/>
          </Item>
          <Item success style={{width:'40%'}}>
            <Input placeholder='City' placeholderTextColor="black" style={{color:'white',borderBottomColor:'white',borderBottomWidth:1}}/>
          </Item>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10}}>
                        <Item success style={{width:'40%'}}>
            <Input placeholder='Area' placeholderTextColor="black" style={{color:'white',borderBottomColor:'white',borderBottomWidth:1}}/>
          </Item>
         <Button style={{width:'40%',marginTop:10, borderWidth:0.9,borderColor:'#b80000',justifyContent:'center',
         backgroundColor:"white",borderRadius:10}}>
            <Text style={{fontSize:16,fontWeight:'500',color:'#b80000',}}>Add New</Text>
         </Button>
                        </View>
                        <Text style={{fontSize:18,fontWeight:'500',margin:10,color:'#b80000',marginTop:40}}>Select Delivery Address</Text>
                        <View style={{borderBottomWidth:0.9,borderBottomColor:'gray',marginTop:5}}/>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Text style={{fontSize:14,fontWeight:'500',marginTop:20}}>
                            Sector 9 , block 3 , flat :420, karachi, sindh
                        </Text>
                        <CheckBox 
checked={this.state.one}
            style={{ marginRight: 20,borderColor:'black',marginTop:20 }}
            onPress={this.onePressed.bind(this)}
            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Text style={{fontSize:14,fontWeight:'500',marginTop:20}}>
                            Sector 9 , block 3 , flat :420, karachi, sindh
                        </Text>
                        <CheckBox 
checked={this.state.one}
            style={{ marginRight: 20,borderColor:'black',marginTop:20 }}
            onPress={this.onePressed.bind(this)}
            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                        <Text style={{fontSize:14,fontWeight:'500',marginTop:20}}>
                            Sector 9 , block 3 , flat :420, karachi, sindh
                        </Text>
                        <CheckBox 
checked={this.state.one}
            style={{ marginRight: 20,borderColor:'black',marginTop:20 }}
            onPress={this.onePressed.bind(this)}
            />
                        </View>
                        <View style={{justifyContent:'center',flexDirection:'row',marginTop:30,}}>
                        <Button style={{width:'90%', borderWidth:0.9,borderColor:'#b80000',justifyContent:'center',
         backgroundColor:"white",borderRadius:10}}>
            <Text style={{fontSize:16,fontWeight:'500',color:'#b80000',}}>Save Changes</Text>
         </Button>
                        </View>

                    </Card>
               
           
                   
                    </ScrollView>
</View>

    )}}
    export default Address;