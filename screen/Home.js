import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { Drawer, Header, Body } from "native-base";
import TabMain from "../HomeComponent/TabMain";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";
import DrawerContent from "../components/DrawerContent";

class Home extends React.Component {
  static navigationOptions = {
    header: null
  };

  openDrawer = () => {
    this.drawer._root.open();
  };

  closeDrawer = () => {
    this.drawer._root.close();
  };

  renderElement() {
    if (Object.values(this.props.user.CartData).length == null) {
      return <Text>0</Text>;
    }

    return Object.values(this.props.user.CartData).length;
  }

  render() {
    const { navigate } = this.props.navigation;

    // console.log(this.props.navigation, "Home >>>");

    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<DrawerContent menu={this.props} />}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.3}
        panCloseMask={0.3}
      >
        <View style={{ backgroundColor: "#D11D46" }}>
          <View style={{ marginTop: 22 }}>
            <Header style={{ backgroundColor: "#D11E46" }}>
              <Body
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  marginLeft: 8
                }}
              >
                <View>
                  <TouchableOpacity onPress={this.openDrawer.bind(this)}>
                    <Image
                      source={require("../images/menus.png")}
                      style={{
                        height: 15,
                        width: 15,
                        marginTop: 2,
                        marginLeft: 5
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      marginLeft: "22%",
                      fontSize: 20,
                      color: "white",
                      fontWeight: "500"
                    }}
                  >
                    Ethlon Supplies
                  </Text>
                </View>
              </Body>
              <TouchableOpacity
                onPress={() => {
                  navigate("Cart", {
                    id: this.props.navigation.state.params
                  });
                }}
              >
                <View
                  style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "red",
                      borderRadius: 20,
                      width: 20,
                      height: 15,
                      position: "absolute",
                      top: -12,
                      right: -4,
                      zIndex: 1
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "500",
                        marginLeft: 5
                      }}
                    >
                      {this.props.user && this.renderElement()}
                    </Text>
                  </View>
                  <Image
                    source={require("../images/cart.png")}
                    style={{ height: 25, width: 25, marginTop: -5 }}
                  />
                </View>
              </TouchableOpacity>
            </Header>
          </View>
          <View
            style={{
              height: Dimensions.get("window").height,
              backgroundColor: "white"
            }}
          >
            <TabMain />
          </View>
        </View>
      </Drawer>
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
)(Home);
