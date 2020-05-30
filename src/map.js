import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, Polyline, Circle  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '90%'
};

class LocationMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      routeCoordinates: [],
      prevLatLng: {},
    };
  }

  /*componentDidMount() {
    navigator.geolocation.watchPosition(function(position) {
      if (navigator.geolocation) {
       
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);

          var lat = parseFloat(position.coords.latitude);
          var long = parseFloat(position.coords.longitude);


          var initialPosition = {
              latitude: lat,
              longitude: long,
          }

          this.setState({ position: initialPosition});       
      }

      
    },
    function(error) {
      console.error("Error Code = " + error.code + " - " + error.message);
    });
  }*/

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        console.log("Latitude is :", this.state.latitude);
        console.log("Longitude is :", this.state.longitude);

      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <div>
         <h2>lat: {this.state.latitude} lng : {this.state.longitude}</h2>
        <Map
          google={this.props.google}
          zoom={18}
          style={mapStyles}
          initialCenter={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
        >
         <Polyline 
         coordinates={this.state.routeCoordinates}
         strokeWidth={5}
         />
         <Marker
          onClick={this.onMarkerClick}
          name={'Test'}
          position ={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
          animation= {this.props.google.maps.Animation.BOUNCE}
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBNCMCrfR_F7wfz-KTGob38sR5LFhEZo5E'
})(LocationMap);