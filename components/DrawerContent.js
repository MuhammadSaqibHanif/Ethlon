import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_info: [],
      user_id: this.props.menu.navigation.state.params.response
    };
  }

  componentDidMount() {
    fetch(
      `http://admin.ethlonsupplies.com/api/get-user-profile/${this.state.user_id}`
    )
      .then(res => {
        res.json().then(data => {
          // console.log("get-user-profile >>>", data);

          this.setState({
            user_info: data
          });
        });
      })
      .catch(err => {
        console.log("get-user-profile Error >>>", err);
      });
  }

  renderRow = (navigate, image_path, text) => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigate()}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginVertical: 10
            }}
          >
            <Image source={image_path} style={{ width: 25, height: 20 }} />
            <Text style={{ fontSize: 14, marginLeft: 10 }}>{text}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ borderBottomWidth: 0.6, borderBottomColor: "gray" }} />
      </View>
    );
  };

  render() {
    const { navigate } = this.props.menu.navigation;

    return (
      <View
        style={{
          height: Dimensions.get("window").height,
          backgroundColor: "white"
        }}
      >
        {this.state.user_info &&
          this.state.user_info.map((data, i) => {
            return (
              <View
                key={i}
                style={{
                  backgroundColor: "#D11E46",
                  height: "25%",
                  width: "100%"
                }}
              >
                <Text
                  style={{
                    marginTop: "20%",
                    marginLeft: 30,
                    color: "white",
                    fontSize: 18,
                    fontWeight: "500"
                  }}
                >
                  Name : {data.first_name} {data.last_name}
                </Text>
                <Text
                  style={{
                    marginLeft: 30,
                    color: "white",
                    fontSize: 14,
                    fontWeight: "500"
                  }}
                >
                  Number :{data.contact_no}
                </Text>
                <Text
                  style={{
                    marginLeft: 30,
                    color: "white",
                    fontSize: 14,
                    fontWeight: "500"
                  }}
                >
                  Email : {data.email}
                </Text>
                <Text
                  style={{
                    marginLeft: 30,
                    color: "white",
                    fontSize: 14,
                    fontWeight: "500"
                  }}
                >
                  Address : {data.address}
                </Text>
              </View>
            );
          })}

        <View>
          {this.renderRow(
            () => navigate("Home"),
            require("../images/home.png"),
            "Home"
          )}

          {this.renderRow(
            () => navigate("ProductRequest"),
            require("../images/interview.png"),
            "Product Request"
          )}

          {this.renderRow(
            () => navigate("Cart", { id: this.state.user_id }),
            require("../images/shopping-cart.png"),
            "Cart"
          )}

          {this.renderRow(
            () => navigate("Order", { id: this.state.user_id }),
            require("../images/shopping-bag.png"),
            "My Orders"
          )}

          {this.renderRow(
            () => navigate("Invoice", { id: this.state.user_id }),
            require("../images/receipt.png"),
            "My Invoices"
          )}

          {this.renderRow(
            () =>
              navigate("AllFavourites", {
                id: this.state.user_id
              }),
            require("../images/star.png"),
            "My Favourites"
          )}

          {this.renderRow(
            () => {
              this.props.updateUser({
                user_id: false,
                CartData: []
              });
              AsyncStorage.clear().then(() => {
                navigate("SignIn");
              });
            },
            require("../images/logout.png"),
            "Logout"
          )}

          {this.renderRow(
            () => navigate("RemainingBalance", { id: this.state.user_id }),
            require("../images/business.png"),
            "Remaining Balance : {0.0}"
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DrawerContent);
