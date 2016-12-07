import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios'
import _ from 'lodash';
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { globals } from './../../constants/globals'
import H2 from './../shared/H1'
import MultipleChoice from 'react-native-multiple-choice'
import Button from './../shared/Button'
import AppComponent from './../../models/AppComponent'
import Resort from './../../models/Resort'
import ResortSelector from './ResortSelector'
class InitialSettingsScene extends AppComponent {
  constructor(props) {
    super(props);
  }

  render() {

    console.log('HEIGHT!!!!', StatusBar.currentHeight);
    return (
      <View style={[styles.container, {paddingTop: StatusBar.currentHeight || 23}]}>
        	<ResortSelector />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globals.white,
    padding: globals.fullPadding
  }
});

export default InitialSettingsScene;
