import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { globals } from './../../constants/globals'
import Swiper from 'react-native-swiper';
import Image from 'react-native-image-progress';
import Dimensions from 'Dimensions'
import AppComponent from './../../models/AppComponent';
class ProfileDetailScene extends AppComponent {
  constructor(props) {
    super(props);
  }

  render() {
    let {name, age, photos} = this.props;
    
    let images = photos.map(p => p.large)
    
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <Swiper style={styles.wrapper} showsButtons={false} loop={false} height={Dimensions.get('window').height * .5}>
          {images.map(uri => (<Image style={styles.image} key={uri} source={{uri: uri}}/>))}
        </Swiper>
        <Text>{name}</Text>
        <Text>{age}</Text>
        <Text>{JSON.stringify(images)}</Text>
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
