import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { globals } from './../constants/globals'
import Swiper from 'react-native-swiper';
import Image from 'react-native-image-progress';
import Dimensions from 'Dimensions'
import AppComponent from './../models/AppComponent';
class ProfileDetailScene extends AppComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {firstName, photos, resorts, bio} = this.props;
    let images = photos.map(p => p.large)
    
    return (
      <ScrollView style={{backgroundColor: globals.gray}}>
	  	<View style={{backgroundColor: globals.white}}>
	        <Swiper style={styles.wrapper} showsButtons={false} loop={false} height={Dimensions.get('window').height * .5}>
	          {images.map(uri => (<Image style={styles.image} key={uri} source={{uri: uri}}/>))}
	        </Swiper>
			<View style={styles.infoContainer}>
	        	<Text style={styles.name}>{firstName}</Text>
	        	<Text style={styles.bio}>{bio}</Text>
				<Text style={styles.resortList}>{firstName} skis at {resorts.map(r => r.name).join(', ')}</Text>
			</View>
		</View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    height: 300
  },
  infoContainer: {
	padding: globals.fullPadding  
  },
  name: {
	fontSize: 18,
	fontWeight: 'bold',
	},
	bio: {
		paddingTop: globals.halfPadding,
		fontSize: 16
	},
	resortList: {
		paddingTop: globals.fullPadding * 2,
		fontSize: 16,
		color: 'gray'
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
