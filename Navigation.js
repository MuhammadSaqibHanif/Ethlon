import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Home from "./screen/Home";
import Cart from "./screen/Cart";
import Favourite from "./screen/Favourite";
import MyOrder from "./screen/MyOrder";
import Address from "./screen/Address";
import MyReviews from "./screen/MyReviews";
import ChangePassword from "./screen/ChangePassword";
import SignupDetails from "./screen/SignupDetails";
import SignIn from "./screen/SignIn";
import OrderTracking from "./screen/OrderTracking";
import Maps from "./screen/Map";
import OrderDetail from "./screen/OrderDetail";
import Invoice from "./screen/Invoice";
import Order from "./screen/Order";
import RemainingBalance from "./screen/RemainingBalance";
import ProductRequest from "./screen/ProductRequest";
import AllFavourites from "./screen/AllFavourites";

const AuthStack = createStackNavigator({
  SignIn: {
    screen: SignIn
  },
  SignupDetails: {
    screen: SignupDetails
  }
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Cart: {
    screen: Cart
  },
  Favourite: {
    screen: Favourite
  },
  MyOrder: {
    screen: MyOrder
  },
  Address: {
    screen: Address
  },
  MyReviews: {
    screen: MyReviews
  },
  ChangePassword: {
    screen: ChangePassword
  },
  OrderTracking: {
    screen: OrderTracking
  },
  Maps: {
    screen: Maps
  },
  OrderDetail: {
    screen: OrderDetail
  },
  Invoice: {
    screen: Invoice
  },
  Order: {
    screen: Order
  },
  RemainingBalance: {
    screen: RemainingBalance
  },
  ProductRequest: {
    screen: ProductRequest
  },

  AllFavourites: {
    screen: AllFavourites
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);
