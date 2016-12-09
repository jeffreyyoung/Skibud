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
  
	getCommonResortsString(resorts1, resorts2) {
		let resorts2Map = _.keyBy(resorts2, '_id');
		let commonResortNames = [];
		for (let r of resorts1) {
			if (resorts2Map[r._id]) {
				commonResortNames.push(r.name)
			}
		}
		
		return `You both ski at ${commonResortNames.join(', ')}`
	}
  
  onPress() {
    this.app.ui.segway('profileDetail', {title: this.props.firstName, ...this.props});
  }
  
  render() {
    let {firstName, age, photos, resorts} = this.props;
	let imageUri = _.get(photos, '[0].large');
    return (
      <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: imageUri}}/>
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{firstName}, <Text style={styles.name}>{age}</Text></Text>
            <View style={styles.icons}>
              <Text>something here</Text>
            </View>
          </View>
          <Text>{this.getCommonResortsString(this.app.user.resorts, resorts)}</Text>
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
	  backgroundColor: 'white',
	  shadowColor: "#000000",
	     shadowOpacity: 0.8,
	     shadowRadius: 2,
	     shadowOffset: {
	       height: 1,
	       width: 0
	     }
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
