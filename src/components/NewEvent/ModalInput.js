import React from 'react';
import { StyleSheet, Text, View, TextInput, Animated } from 'react-native';
import { globals } from './../../constants/globals'
import Icon from 'react-native-vector-icons/FontAwesome';
let ModalInput = (props) => {
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: globals.white,
      padding: globals.fullPadding * 1.5,
      borderTopWidth: props.borderTop ? .5 : 0,
      borderBottomWidth: .5,
      borderColor: globals.darkGray,
      
    },
    placeholder: {
      color: globals.darkGray,
      flex: .9,
    },
    chevron: {
      flex: 0,
    }
  })
  
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
        {props.value && props.value.length > 0 ? null : <Text style={styles.placeholder}>{props.placeholder}</Text>}
          <Icon
            style={styles.chevron}
            name='chevron-right'
            size={14}
            color={globals.darkGray}
          />
      </View>
    </View>
  )
}


export default ModalInput;
