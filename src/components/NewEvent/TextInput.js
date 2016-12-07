import React from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { globals } from './../../constants/globals'

let TextInputa = (props) => {
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: globals.white,
      padding: globals.fullPadding * 1.5,
      borderBottomWidth: props.borderBottom ? 1 : 1,
      borderColor: globals.gray
    },
    placeholder: {
      color: globals.gray
    }
  })
  
  return (
    <View style={styles.container}>
      {props.value && props.value.length > 0 ? null : <Text style={styles.placeholder}>{props.placeholder}</Text>}
    </View>
  )
}


export default TextInputa;
