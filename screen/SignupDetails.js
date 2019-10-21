import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Item, Header, Body, Card, Input, CheckBox, Root } from "native-base";
import { Constants } from "expo";

class SignupDetails extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      restaurant_address: "",
      country_phone_code: "+92",
      phone: "",
      country_id: "PK",
      city_id: 66015,
      owner_name: "",
      store_name: "",
      store_address: "",
      checked: false,
      checked_For_Second_Screen: false
    };
  }

  show_SecondScreen = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      restaurant_address,
      country_phone_code,
      phone,
      country_id,
      city_id,
      owner_name,
      store_name,
      store_address
    } = this.state;

    // if (
    //   (firstName,
    //   lastName,
    //   email,
    //   password,
    //   restaurant_address,
    //   country_phone_code,
    //   phone,
    //   country_id,
    //   city_id,
    //   owner_name,
    //   store_name,
    //   store_address)
    // ) {
    //   Toast.show({
    //     text: "please fill all requirements first to proceed further",
    //     position: "bottom",
    //     duration: 5000,
    //     type: "danger"
    //   });
    // } else {
    this.setState({ checked_For_Second_Screen: true });
    // }
  };

  signUp = () => {
    const { navigate } = this.props.navigation;

    const {
      firstName,
      lastName,
      email,
      password,
      restaurant_address,
      country_phone_code,
      phone,
      country_id,
      city_id,
      owner_name,
      store_name,
      store_address
    } = this.state;

    // console.log(
    //   "firstName >>>",
    //   firstName,
    //   "lastName >>>",
    //   lastName,
    //   "email >>>",
    //   email,
    //   "password >>>",
    //   password,
    //   "restaurant_address >>>",
    //   restaurant_address,
    //   "country_phone_code >>>",
    //   country_phone_code,
    //   "phone >>>",
    //   phone,
    //   "country_id >>>",
    //   country_id,
    //   "city_id >>>",
    //   city_id,
    //   "owner_name >>>",
    //   owner_name,
    //   "store_name >>>",
    //   store_name,
    //   "store_address >>>",
    //   store_address
    // );

    let deviceSerial = null;
    try {
      deviceSerial = Constants.deviceId;
      console.log("DEVICE ID FOUND: " + deviceSerial);
    } catch (e) {
      console.log("error reading device ID");
    }

    let formData = new FormData();
    formData.append("ip_address", deviceSerial);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", restaurant_address);
    formData.append("country_phone_code", country_phone_code);
    formData.append("cell_number", phone);
    formData.append("country_id", country_id);
    formData.append("city_id", city_id);
    formData.append("owner_name", owner_name);
    formData.append("store_name", store_name);
    formData.append("store_address", store_address);
    formData.append("country_code", "PK");

    fetch("http://Elementads.co/ethlon/api/post-new-user", {
      body: formData,
      method: "POST"
    })
      .then(response => {
        console.log("SignUp response >>>", response);

        if (response._bodyInit == "success") {
          alert("Register Successfully. Please Login to Continue");

          // Toast.show({
          //   text: "Register Successfully. Please Login to Continue",
          //   position: "top",
          //   duration: 5000,
          //   type: "success"
          // });

          navigate("SignIn");
        }
        if (response._bodyInit == "") {
          alert("Sign Up Again Please!");
        }
      })
      .catch(error => {
        console.log("SIGNUP ERROR", error);

        alert("ERROR! Sign Up Again Please!");
      });
  };

  render() {
    return (
      <Root>
        <ScrollView>
          <View
            style={{ width: Dimensions.get("window").width, height: "100%" }}
          >
            <View>
              <Header style={{ height: 100, backgroundColor: "#D11D46" }}>
                <Body
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={require("../images/ic_back.png")}
                    style={{ width: 25, height: 25 }}
                  />
                  <Text
                    style={{ color: "white", marginLeft: 15, fontSize: 20 }}
                  >
                    {this.state.checked_For_Second_Screen == false
                      ? "SignUp"
                      : "Details"}
                  </Text>
                </Body>
              </Header>
            </View>

            {this.state.checked_For_Second_Screen == false && (
              <Card style={{ height: Dimensions.get("window").height }}>
                <KeyboardAvoidingView behavior="padding" enabled>
                  <ScrollView>
                    <View>
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                          }}
                        >
                          <Item success style={{ width: "90%" }}>
                            <Input
                              value={this.state.firstName}
                              onChangeText={firstName =>
                                this.setState({ firstName })
                              }
                              placeholder="First Name"
                              style={{
                                borderWidth: 0.6,
                                borderRadius: 1,
                                borderColor: "#D11E46"
                              }}
                            />
                          </Item>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                          }}
                        >
                          <Item success style={{ width: "90%" }}>
                            <Input
                              value={this.state.lastName}
                              onChangeText={lastName =>
                                this.setState({ lastName })
                              }
                              placeholder="Last Name"
                              style={{
                                borderWidth: 0.6,
                                borderRadius: 1,
                                borderColor: "#D11E46"
                              }}
                            />
                          </Item>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            marginLeft: 30,
                            marginTop: 10
                          }}
                        >
                          <View style={{ marginLeft: 20, width: "50%" }} />
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                          }}
                        >
                          <Item success style={{ width: "90%" }}>
                            <Input
                              value={this.state.email}
                              onChangeText={email => this.setState({ email })}
                              keyboardType="email-address"
                              placeholder="Email"
                              style={{
                                borderWidth: 0.6,
                                borderRadius: 1,
                                borderColor: "#D11E46",
                                borderBottomColor: "red"
                              }}
                            />
                          </Item>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                          }}
                        >
                          <Item success style={{ width: "90%" }}>
                            <Input
                              value={this.state.password}
                              onChangeText={password =>
                                this.setState({ password })
                              }
                              secureTextEntry
                              placeholder="Password"
                              style={{
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: "#D11E46"
                              }}
                            />
                          </Item>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10
                          }}
                        >
                          <Item success style={{ width: "90%" }}>
                            <Input
                              value={this.state.repassword}
                              onChangeText={repassword =>
                                this.setState({ repassword })
                              }
                              secureTextEntry
                              placeholder="Re-enter Password"
                              style={{
                                borderWidth: 1,
                                borderRadius: 1,
                                borderColor: "#D11E46"
                              }}
                            />
                          </Item>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            marginTop: 20,
                            padding: 20
                          }}
                        >
                          <CheckBox
                            color={"#D11E46"}
                            checked={this.state.checked}
                            onPress={() => {
                              this.setState({ checked: !this.state.checked });
                            }}
                          />

                          <Text style={{ marginLeft: 20 }}>
                            Terms and Conditions Applied
                          </Text>
                        </View>

                        <TouchableOpacity onPress={() => navigate("SignIn")}>
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: 16,
                              textAlign: "center"
                            }}
                          >
                            Already Have an Account ? Sign In
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this.show_SecondScreen();
                          }}
                          style={{
                            backgroundColor: "#D11D46",
                            marginTop: 10,
                            width: "80%",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignSelf: "center"
                          }}
                        >
                          <Text style={{ padding: 13, color: "white" }}>
                            Next
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </KeyboardAvoidingView>
              </Card>
            )}

            {/* BODY HERE */}
            {this.state.checked_For_Second_Screen == true && (
              <KeyboardAvoidingView behavior="padding" enabled>
                <View>
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: "500", fontSize: 18 }}>
                      Personal Information
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input
                        placeholder="Store Name"
                        value={this.state.store_name}
                        onChangeText={store_name =>
                          this.setState({ store_name })
                        }
                      />
                    </View>

                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input
                        value={this.state.store_address}
                        onChangeText={store_address =>
                          this.setState({ store_address })
                        }
                        placeholder="Store Address"
                      />
                    </View>

                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input
                        placeholder="Owner Name"
                        value={this.state.owner_name}
                        onChangeText={owner_name =>
                          this.setState({ owner_name })
                        }
                      />
                    </View>

                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input placeholder="KARACHI" />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 2.5,
                          width: "30%",
                          borderColor: "#D11D46",
                          height: 60,
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: 10
                        }}
                      >
                        <Text>{this.state.country_phone_code}</Text>
                      </View>

                      <View
                        style={{
                          borderWidth: 2.5,
                          width: "65%",
                          borderColor: "#D11D46",
                          height: 60,
                          marginTop: 10
                        }}
                      >
                        <Input
                          placeholder="Phone Number"
                          value={this.state.phone}
                          onChangeText={phone => this.setState({ phone })}
                          placeholder="First Name"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}

            {/* BUISNESS INFORMATION START */}
            {this.state.checked_For_Second_Screen == true && (
              <KeyboardAvoidingView behavior="padding" enabled>
                <View>
                  <View style={{ padding: 20 }}>
                    <Text style={{ fontWeight: "500", fontSize: 18 }}>
                      Business Information
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input
                        // value={this.state.owner_name}
                        // onChangeText={owner_name => this.setState({ owner_name })}
                        placeholder="Owner's Name"
                      />
                    </View>

                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input
                        // value={this.state.restaurant_address}
                        // onChangeText={restaurant_address =>
                        //   this.setState({ restaurant_address })
                        // }
                        placeholder="Resturant Name"
                      />
                    </View>

                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input
                        value={this.state.restaurant_address}
                        onChangeText={restaurant_address =>
                          this.setState({ restaurant_address })
                        }
                        placeholder="Resturant Address"
                      />
                    </View>

                    <View
                      style={{
                        borderWidth: 2.5,
                        width: "100%",
                        borderColor: "#D11D46",
                        height: 60,
                        marginTop: 10
                      }}
                    >
                      <Input placeholder="Branch Address(Optional)" />
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.signUp()}
                        style={{
                          backgroundColor: "#D11D46",
                          marginTop: 10,
                          width: "80%",
                          flexDirection: "row",
                          justifyContent: "center"
                        }}
                      >
                        <Text style={{ padding: 13, color: "white" }}>
                          SignUp
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}
            {/* BUISNESS INFORMATION END */}

            {/* BODY HERE END */}
          </View>
        </ScrollView>
      </Root>
    );
  }
}

export default SignupDetails;
