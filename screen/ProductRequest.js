import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import {
  Icon,
  Drawer,
  Item as FormItem,
  Header,
  Body,
  Card,
  Badge,
  Input
} from "native-base";
class ProductRequest extends React.Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }

  send_Enquiry = () => {
    let form = new FormData();
    form.append("enquiry", this.state.message);
    form.append("user_id", this.props.navigation.state.params.id);

    fetch(`http://admin.ethlonsupplies.com/api/post-product-enquiry`, {
      method: "POST",
      body: form
    })
      .then(res => {
        res.formData().then(respo => {
          console.log("post-product-enquiry >>>", respo);

          if (
            respo._parts &&
            respo._parts[0] &&
            respo._parts[0][0] == "success"
          ) {
            alert("Request send successfully");

            this.setState({ message: "" });
          }
        });
      })
      .catch(err => console.log("post-product-enquiry ERROR", err));
  };

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ width: Dimensions.get("window").width, height: "100%" }}>
        <Header style={{ backgroundColor: "#D11D46", height: 100 }}>
          <Body>
            <Text style={{ color: "white" }}>Product Request</Text>
          </Body>
        </Header>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card>
            <View style={{ width: "100%", height: "50%" }}>
              <Input
                value={this.state.message}
                onChangeText={message =>
                  this.setState({
                    message
                  })
                }
                placeholder="YOUR ENQUIRY HERE ...."
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "#D11D46"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.send_Enquiry();
                }}
              >
                <Text style={{ padding: 20 }}>SUBMIT</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

export default ProductRequest;
