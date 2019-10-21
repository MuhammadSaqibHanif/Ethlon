import React from 'react';
import { Card, Header, Body,Input ,Item,Icon,Button,Content } from 'native-base';
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity,Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating';

class MyReviews extends React.Component {
    static navigationOptions={
        header:null,
    }
    constructor(props) {
        super(props);
        this.state = {
          starCount: 3.5
        };
      }
      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
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
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: '500',margin:10,marginLeft:"45%" }}>My Review</Text>
                            </View>
                        </Body>
                    </Header>
                    </View>
<Card style={{height:200}}>
                    <View style={{flexDirection:'row',marginTop:10,justifyContent:'center',}}>
                        <Image source={require('../images/kfc.png')} style={{width:60,height:60}}/>
                        <Text style={{fontSize:22,color:'#b80000',fontWeight:'500',marginTop:10}}>KFC</Text>
                    </View>
                    <View style={{width:'50%',marginTop:10,marginLeft:10}}>
                    <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        fullStarColor={'gray'}
        starSize={25}

        
      />
                    </View>
                    <View style={{flexDirection:'column',justifyContent:'center'
                    ,width:'90%',marginLeft:'5%',marginTop:10}}>
                     <Text style={{fontSize:14,fontWeight:'500'}}>
                       Review :
                        </Text>
                    <Text >
                        the service was good and fast , also the food was delicious
                        </Text>
                    </View>
                    </Card>
               
           
                   
                    </ScrollView>
</View>

    )}}
    export default MyReviews;