import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { globals } from './../../constants/globals'
import moment from 'moment'
import AppComponent from './../../models/AppComponent';
let difficultyColor = (level) => {
  switch(level) {
    case 'Beginner':
      return 'green';
    case 'Intermediate':
      return 'orange';
    default:
      return 'red'
  }
}

class EventCell extends AppComponent {
  
  onPress() {
    
  }
  
  render() {
    let {user, level, type, resort, eventDate, name, description} = this.props;
    
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <View style={styles.container}>
          <View style={styles.apart}>
            <Text style={styles.bold}>{type} at {resort.name}</Text>
            <Text>{moment(eventDate).toNow()}</Text>
          </View>
          <Text>with  and {Math.floor(Math.random() * 4) + 1} other people</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    padding: globals.fullPadding,
    paddingTop: globals.halfPadding,
    paddingBottom: globals.halfPadding,
    borderBottomWidth: 1,
    borderBottomColor: globals.secondaryColor
  },
  apart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bold: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 60,
    color: globals.white,
    backgroundColor: globals.clear,
    padding: globals.fullPadding,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
})



export default EventCell;
