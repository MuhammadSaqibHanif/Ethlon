import React from 'react';
import { Text, View,Image } from 'react-native';
import { Icon } from 'native-base';
import { createBottomTabNavigator,createSwitchNavigator, createAppContainer,createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation';
import SpecialOffer from './SpecialOffer';
import Starter from './Starter';
import Desert from './Desert';
import Beverage from './Beverage';
import AddCart from './AddCart';


//  import Starter from './Starter';
//  import UltimateDeal from './UltimateDeal';
//  import StorePage from '../screen/StorePage'

const Carts = createStackNavigator({
  AddCart:{screen:AddCart,
    tabBarOptions: {
      header:null
    }
  }
});

// StorePages.navigationOptions = ({ navigation }) => {
//   return {
//     tabBarVisible: navigation.state.index === 0,
//   };
// };





  



 const OrderTabHome = createMaterialTopTabNavigator({
    SpecialOffer:{
      screen:SpecialOffer,
      navigationOptions: {
          tabBarLabel: "SpecialOffer",
          // color:"#1A5CAD",
          //tabBarActiveTintColor
        //   tabBarIcon: ({ tintColor }) => (
        //     <Icon name="ios-home" size={20} style={{ color: "white" }} />
        //   )
        }
  },
  Starter:{
      screen:Starter,
      navigationOptions: {
          tabBarLabel: "Starter",
          // color:"#1A5CAD",
          // tabBarActiveTintColor
          // tabBarIcon: ({ tintColor }) => (
         
          // <Image source={require('./images/open-book.png')} style={{ width: 20, height: 20, marginTop: 5 }} />

          // )
        }
  },
  Desert:{
    screen:Desert,
    navigationOptions: {
        tabBarLabel: "Desert",
        // color:"#1A5CAD",
        // tabBarActiveTintColor
        // tabBarIcon: ({ tintColor }) => (
       
        // <Image source={require('./images/delivery-truck.png')} style={{ width: 20, height: 20, marginTop: 5 }} />

        // )
      }
},
Beverage:{
      screen:Beverage,
      navigationOptions: {
          tabBarLabel: "Beverage",
          color:"#1A5CAD",
          // tabBarActiveTintColor
          // tabBarIcon: ({ tintColor }) => (
         
          // <Image source={require('./images/star.png')} style={{ width: 20, height: 20, marginTop: 5 }} />

          // )
        }
  },

  // Shake:{
  //     screen:Shake  ,
  //     navigationOptions: {
  //         tabBarLabel: "Shake",
          
          // color:"#1A5CAD",
          //tabBarActiveTintColor
          // tabBarIcon: ({ tintColor }) => (
         
          // <Image source={require('./images/more.png')} style={{ width: 20, height: 15, marginTop: 5 }} />

          // )
  //       }
  // },

},{
  tabBarOptions: {
    activeTintColor: "#91C322",
    inactiveTintColor: 'gray',
    scrollEnabled:true,
    header:null,
    tabStyle:{
        width: 150,
        height:50
    },
    style: {
      backgroundColor: 'white',
    },
  },
  swipeEnabled:false,
animationEnabled: true,
  initialRouteName: 'SpecialOffer',

});

const AppSwitchNavigator = createSwitchNavigator({
  OrderTabHome: { screen: OrderTabHome },
  Carts:{screen:Carts}

});

export default createAppContainer(AppSwitchNavigator);