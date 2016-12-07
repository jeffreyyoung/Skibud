import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { globals } from './../../../constants/globals'
import Dimensions from 'Dimensions'
import AppComponent from './../../../models/AppComponent'
const message = 'asdfjklljkasf jklasdfl jkasdfj kladsfj l jkadfsjkl asdfljk afsd asdf jkajlsdfj lasjf lkjlkafsdjkl afsdjk lfasjkl afsjk lfsajl kafsjkl fsadjlk dsfa jklafdsjl kafsdjl k'

export default class FriendCell extends AppComponent {
  render() {
    let props = this.props;
    return (
      <TouchableOpacity onPress={() => this.app.ui.segway('chat', props)}>
        <View style={styles.container}>
          <Image source={{uri: props.imageUri}}style={styles.image} />
          <View style={{flexWrap: 'wrap'}}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={{flexDirection:'row', flex: 1, width: 100, flexWrap: 'wrap'}}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.messagePreview}>{message}</Text>
            </View>
          </View>
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
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: globals.secondaryColor,
    borderBottomWidth: 1
  },
  
  image: {
    borderRadius: globals.fullPadding * 3.5,
    height: globals.fullPadding * 7,
    width: globals.fullPadding * 7,
    marginRight: globals.halfPadding
  },
  
  name: {
    fontSize: globals.fullPadding * 2,
    color: globals.primaryColor,
    fontWeight: 'bold'
  },
  
  messagePreview: {
    flexWrap: 'wrap',
    maxWidth: Dimensions.get('window').width - globals.fullPadding * 9,
    color: globals.secondaryColor
    //flex: 1,
    //width: 100
  }
  
})