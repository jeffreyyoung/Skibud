import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ListView, ActivityIndicator, RefreshControl } from 'react-native';
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { globals } from './../../constants/globals'
import EventCell from './EventCell'
import AppComponent from './../../models/AppComponent';
import moment from 'moment';
import _ from 'lodash';
class EventsScene extends AppComponent {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: this.ds.cloneWithRows([]),
	  isRefreshing: false
    }
  }
  
  async loadInitialData() {
    this.setState({'isRefreshing': true});
    let { upcomingEvents } = await this.app.graphql(`
      query {
        upcomingEvents(resortId: "10") {
          name
          description
          _id
		  eventDate
          resort {
            name
          }
		  owner {
			name
			firstName
			picture
		  }
        }
      }
    `)
    this.setState({isRefreshing: false, dataSource: this.ds.cloneWithRows(upcomingEvents)})
  }
  
  componentDidMount() {
    this.loadInitialData();
  }
  
  render() {
    return (
      <View style={styles.container}>
          <ListView 
            dataSource={this.state.dataSource}
			enableEmptySections={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.loadInitialData.bind(this)}
              />
            }
            renderRow={rowData => <EventCell {...rowData}/>}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default EventsScene;
