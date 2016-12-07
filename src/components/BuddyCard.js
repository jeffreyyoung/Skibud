import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { globals } from './../constants/globals'
import Dimensions from 'Dimensions'
import Image from 'react-native-image-progress';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import AppComponent from './../models/AppComponent';

class BuddyCard extends AppComponent {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
  }
  
  onPress() {
    this.app.ui.segway('profileDetail', this.props);
  }
  
  render() {
    let {name, age, photos} = this.props;
	let imageUri = _.get(photos, '[0].large');
    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: imageUri}}/>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{name}, <Text style={styles.name}>{age}</Text></Text>
            <View style={styles.icons}>
              <Text>something here</Text>
            </View>
          </View>
          <Text>{`You both ski at Alta, Sundance and Snowbird`}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      padding: globals.fullPadding,
      paddingTop: 0,
      borderWidth: 1,
      borderColor: globals.secondaryColor,
      borderRadius: globals.halfPadding,
	  overflow: 'hidden',
	  backgroundColor: 'white'
    },
    imageContainer: {
      alignItems: 'center',
      borderRadius: globals.halfPadding,
	  backgroundColor: 'white'
    },
    info: {
      paddingTop: globals.halfPadding,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    image: {
      width: (Dimensions.get('window').width - globals.fullPadding*2),
      height: (Dimensions.get('window').height * .5),
      borderTopRightRadius: globals.halfPadding,
	  borderTopLeftRadius: globals.halfPadding
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      flex: 1
    },
    age: {
      fontWeight: '200',
      fontSize: 10,
      color: 'green'
    },
    icons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
});

export default BuddyCard;
