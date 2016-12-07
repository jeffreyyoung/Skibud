import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { LoginManager } from 'react-native-fbsdk'
import { globals } from './../../constants/globals'
import Swiper from 'react-native-swiper';
import Image from 'react-native-image-progress';
import Dimensions from 'Dimensions'
import AppComponent from './../../models/AppComponent'
import Button from './../shared/Button'
import FacebookImagePicker from './FacebookImagePicker';
import FacebookPhotoRequestor from './../../services/FacebookPhotoRequest.js';
import _ from 'lodash';
class ProfileDetailScene extends AppComponent {
  constructor(props) {
    super(props);
	this.state = {
		images: []
	}
	this.photosRequestor = new FacebookPhotoRequestor(this.app.user.facebookId, this.app.user.facebookToken);
  }
  
  componentDidMount() {
	setTimeout(async () => {
		await this.photosRequestor.loadMorePhotos();
		this.setState({
			images: _.map(this.photosRequestor.getPhotos(), 'large')
		})
	}, 2000);
  }
  
  logOut() {
    LoginManager.logOut();
    this.app.user.clear();
    this.app.user.save();
    this.app.ui.launchSegway('SignInScene')
  }
  
  render() {
    let {name, picture} = this.app.user;
    
    //let images = [picture]
    
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
		<Swiper style={styles.wrapper} showsButtons={false} loop={false} height={Dimensions.get('window').height * .5}>
			{this.app.user.photos.map(photo => (<Image style={styles.image} key={photo.large} source={{uri: photo.large}}/>))}
		</Swiper>
		<View style={{padding: globals.fullPadding}}>
			<Text>{name}</Text>
			<Text>You ski at and would like to match with others who ski at: {this.app.user.resorts.map(r => r.name).join(', ')}</Text>
			<Button onPress={this.logOut.bind(this)}>Log Out</Button>
		</View>
		<FacebookImagePicker />
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
