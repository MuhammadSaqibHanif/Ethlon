import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Item, Input, Button, Toast, Root } from "native-base";
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/authActions";

class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "sabeehsultan@gmail.com",
      password: "1234"
    };
  }

  componentDidMount() {
    this.props.user &&
      this.props.user.user_id &&
      this.props.navigation.navigate("Home", {
        response: this.props.user.user_id
      });
  }

  signIn = () => {
    const { navigate } = this.props.navigation;

    const { email, password } = this.state;

    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch(`http://Elementads.co/ethlon/api/post-user-credentials`, {
      body: formData,
      method: "post"
    })
      .then(res => res.json())
      .then(response => {
        console.log("Signin >>>", response);

        if (Number(response) > 0) {
          AsyncStorage.setItem("UID", `${response}`).then(() => {
            this.setState({
              email: "",
              password: ""
            });

            this.props.updateUser({
              user_id: response,
              CartData: []
            });

            navigate("Home", { response });
          });
        } else {
          Toast.show({
            text: "Please Sign Up to continue OR some ERROR Happens",
            position: "top",
            duration: 5000,
            type: "danger"
          });
        }
      })
      .catch(error => {
        Toast.show({
          text: "Network Error",
          position: "top",
          duration: 5000,
          type: "danger"
        });

        console.log("signin error >>>", error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;

    // console.log("this.props >>>", this.props);

    return (
      <Root>
        <ImageBackground
          source={require("../images/ethlon-splash.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              flex: 0.8,
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../images/ethlon-logo.jpg")}
              style={{ width: 150, height: 150, marginTop: 20 }}
            />
          </View>
          <View style={{ flex: 1.2 }}>
            <KeyboardAvoidingView behavior="padding" enabled>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Item success style={{ width: "80%" }}>
                  <Input
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    keyboardType="email-address"
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    style={{
                      color: "#FFFFFF",
                      borderBottomColor: "#D11E46",
                      borderBottomWidth: 1
                    }}
                  />
                </Item>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Item success style={{ width: "80%" }}>
                  <Input
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    style={{
                      color: "#FFFFFF",
                      borderBottomColor: "#D11E46",
                      borderBottomWidth: 1
                    }}
                  />
                </Item>
              </View>
              <View>
                <Button
                  onPress={() => this.signIn()}
                  style={{
                    marginTop: 30,
                    color: "white",
                    backgroundColor: "#D11E46",
                    marginHorizontal: "5%",
                    width: "90%",
                    textAlign: "center",
                    borderRadius: 20,
                    height: 40,
                    marginBottom: 0
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      marginLeft: "43%",
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "center"
                    }}
                  >
                    LOGIN
                  </Text>
                </Button>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("SignupDetails")}>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: "center",
                      marginBottom: 20,
                      marginTop: 20
                    }}
                  >
                    Want to Sign Up ?
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </Root>
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
)(SignIn);
