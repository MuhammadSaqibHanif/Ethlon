import {
  createAppContainer,
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Food from "./Food";
import StorePage from "../screen/StorePage";
import OrderPage from "../screen/OrderPage";
import OrderTabMain from "../OrderTab/OrderTabMain";
import AddCart from "../OrderTab/AddCart";
import FoodCart from "../screen/FoodCart";
import Products from "./Products";

const StorePages = createStackNavigator({
  Food: Food,
  Products: Products,
  StorePage: StorePage,
  OrderTabMain: OrderTabMain,
  OrderPage: OrderPage,
  AddCart: AddCart,
  FoodCart: FoodCart
});

StorePages.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 0
  };
};

const TabHome = createMaterialTopTabNavigator(
  {
    Food: {
      screen: StorePages,
      navigationOptions: {
        tabBarLabel: "Categories",
        color: "#D11E46"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#D11E46",
      inactiveTintColor: "gray",
      scrollEnabled: true,
      tabStyle: {
        width: 150,
        height: 50,
        fontWeight: "500",
        fontSize: 14
      },
      indicatorStyle: {
        backgroundColor: "#D11E46"
      },
      style: {
        backgroundColor: "white",
        fontWeight: "500",
        fontSize: 14
      },
      labelStyle: {
        fontWeight: "500",
        fontSize: 14
      }
    },
    swipeEnabled: false,
    animationEnabled: true,
    initialRouteName: "Food"
  }
);

export default createAppContainer(TabHome);
