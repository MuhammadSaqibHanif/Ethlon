import React, { Component } from 'react';
import { Text, View, StyleSheet,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import Constants from 'expo-constants';

class DriverMaps extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getCurrentPositionAsync({});
   this.setState({ locationResult: JSON.stringify(location), location, });
 };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: "100%" }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        //   onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="My Marker"
      description="Some description"
  
    >
      <Image
                  source={require('../images/food.png')}
                  //style={{ transform: [{ rotate: `${angle}deg`}]}}
                 style={{width:20,height:20}}
                />
      </MapView.Marker>
        </MapView>
      
        {/* <Text>
          Location: {this.state.locationResult}
        </Text> */}
      
      </View>
    );
  }
}
export default DriverMaps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
