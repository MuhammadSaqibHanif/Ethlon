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
    this.state = {};
  }

  send_Enquiry = enquiry => {
    let form = new FormData();
    form.append("enquiry", enquiry);

    fetch(`http://admin.ethlonsupplies.com/api/post-product-enquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: form
    })
      .then(res => {
        res.json().then(data => {
          console.log("REMAINING DATA", data);
          this.setState({ remaining_data: data });
        });
      })
      .catch(err => console.log("NO REMAINING DATA ERROR", err));
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
              <Input placeholder="YOUR ENQUIRY HERE ...." />
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
                  alert("Request send successfully");
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
