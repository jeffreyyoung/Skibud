import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Navigator, AsyncStorage } from 'react-native';
import SignInScene from './../components/SignInScene'
import InitialSettingsScene from './../components/ResortSelectorScene'
import App from './../App'
import user from './../models/AuthenticatedUser'
import uiState from './../models/UIState';

export default class LaunchNavigator extends Component {
  constructor(...args) {
    super(...args);
    this.initialScene = user.isLoggedIn ? 'App' : 'SignInScene';
	//this.initialScene = 'InitialSettingsScene'
  }
  render() {
    return (
      <Navigator
        initialRoute={{ scene: this.initialScene, index: 0 }}
        renderScene={(route, navigator) => {
          uiState.addNavigator('launch', navigator);
          console.log('IN RENDER ROUTE', route.scene);
          if (route.scene === 'SignInScene')
            return <SignInScene navigator={navigator}/>
          else if (route.scene === 'InitialSettingsScene')
            return <InitialSettingsScene navigator={navigator}/>
          else
            return <App />
        }}
        
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromRight,
          gestures: {}, // or null
        })}
      />
    );  
  }
}
