import React, { Component } from 'react';
import {Text} from 'react-native'
import { globals } from './../../constants/globals'

export default (props) => {
  return (
    <Text {...props} style={[{fontSize: globals.h1}, props.style]}>
      {props.children}
    </Text>
  )
}
