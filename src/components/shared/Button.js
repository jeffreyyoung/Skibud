import React, { Component } from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native'
import { globals } from './../../constants/globals'

export default (props) => {
  
  var { onPress, style, disabled, ...other } = Object.assign({disabled: false, props});
  
  return (
    <TouchableOpacity onPress={props.onPress} disabled={disabled}>
      <Text {...other} style={[{fontSize: globals.h1}, styles.text, style]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    padding: globals.fullPadding,
    backgroundColor: globals.primaryColor,
    color: globals.white,
    borderRadius: globals.halfPadding,
    flex: 1,
    textAlign: 'center'
  }
})
