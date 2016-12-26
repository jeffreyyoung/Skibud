import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { LoginManager } from 'react-native-fbsdk'
import { globals } from './../constants/globals'
import Swiper from 'react-native-swiper';
import Image from 'react-native-image-progress';
import Dimensions from 'Dimensions'
import AppComponent from './../models/AppComponent'
import Button from './shared/Button'
import FacebookImagePicker from './FacebookImagePicker';
import FacebookPhotoRequestor from './../services/FacebookPhotoRequest.js';
import Profile from './Profile'
import _ from 'lodash';
class ProfileDetailScene extends AppComponent {
  constructor(props) {
    super(props);
	this.state = {
	}
  }
  
  componentDidMount() {
	  
  }
  
  logOut() {
    LoginManager.logOut();
    this.app.user.clear();
    this.app.user.save();
    this.app.ui.launchSegway('SignInScene')
  }
  //https://github.com/ollija/react-native-sortable-grid
  render() {
    let {name, picture} = this.app.user;
    return (
      <ScrollView style={{backgroundColor: globals.gray}}>
	  	<Profile {...this.app.user} />
		<View style={{paddingTop: 100, paddingLeft: globals.fullPadding, paddingRight: globals.fullPadding}}>
			<Button onPress={this.logOut.bind(this)}>Log Out</Button>
		</View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    height: 300
  },
  image: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height * .5),
    backgroundColor: globals.white
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})

export default ProfileDetailScene;
