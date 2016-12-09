import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, StatusBar, ActivityIndicator, ListView, TouchableOpacity } from 'react-native';
import axios from 'axios'
import _ from 'lodash';
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import { globals } from './../constants/globals'
import H2 from './shared/H1'
import MultipleChoice from 'react-native-multiple-choice'
import Button from './shared/Button'
import AppComponent from './../models/AppComponent'
import Resort from './../models/Resort'
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km * 0.621371 = miles
}

class ResortSelector extends AppComponent {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			loading: true,
			names: [],
			resorts: this.ds.cloneWithRows([])
		};
	}

	loadNearestResorts() {
		this.setState({loading: true}, () => {
		navigator.geolocation.getCurrentPosition(async (position) => {
			let {longitude, latitude} = position.coords;
			this.app.user.coords = [longitude, latitude];
			console.log('loading nearest resorts');
			let resortsResponse = await this.app.graphql(`
	          query {
	            allResorts {
	              name
				  _id
	              coordinates {
	                lon
	                lat
	              }
	            }
	          }
	        `)
			let resortsWithDistance = _.chain(resortsResponse.allResorts)
				.filter(r => {
					return r.coordinates.lon && r.coordinates.lat
				})
				.map(r => {
					r.distanceAway = distance(latitude, longitude, r.coordinates.lat, r.coordinates.lon);
					r.selected = false;
					return r;
				})
				.sortBy(r => r.distanceAway)
				.value()
			let names = _.map(resortsWithDistance, r => r.name + ' ('+Math.round(r.distanceAway).toString()+' miles away)');
			this.setState({
				names: names, 
				loading:false,
				resorts: resortsWithDistance,
				resortsDs: this.ds.cloneWithRows(resortsWithDistance)
			});
			
      },
      error => {
        alert('error');
      });
    });
  }
  componentDidMount() {
	console.log('LOAD NEAREST RESORTS');
    this.loadNearestResorts();
  }
  async onContinue() {
	this.setState({'disabled': true});
	let selectedResorts = this.state.resorts.filter(r => r.selected)
	let selectedResortIds = selectedResorts.map(r => r._id);
	if (selectedResorts.length === 0) {
		alert('You must select at least one resort.');
		return;
	}
	let r = await this.app.graphql(`
		mutation {
			updateResorts(resortIds: ${JSON.stringify(selectedResortIds)})
		}
	`);
	this.app.user.resorts = selectedResorts;
	this.app.user.resortIds = selectedResortIds;
	this.app.user.save();
	this.app.ui.launchSegway('app');
  }
  
  onSelection(resort) {
	let newResorts = this.state.resorts.slice();
	for (let r of newResorts) {
		if (r._id === resort._id) { r.selected = !r.selected; }
	}
	this.setState({
		resorts: newResorts,
		resortsDs: this.ds.cloneWithRows(newResorts)
	})
  }
  render() {
    return (
      <View style={[styles.container, {paddingTop: StatusBar.currentHeight || 23}]}>
        <H2 style={{'color': globals.primaryColor}}>Where do you want to go skiing?</H2>
        {!this.state.loading ? <ListView
            dataSource={this.state.resortsDs}
			renderRow={resort => {
				return (
					<ResortOption resort={resort} onSelection={this.onSelection.bind(this)} />
				)
			}}
        /> : <ActivityIndicator style={{paddingTop: 10}}/>}
        {!this.state.loading ? <Button onPress={this.onContinue.bind(this)}>Continue...</Button> : null }
      </View>
    );
  }
}

let ResortOption = (props) => {
	let { resort, onSelection } = props;
	let yay = () => {
		onSelection(resort);
	}
	let distanceAway = ' ('+Math.round(resort.distanceAway).toString()+' miles away)';
	return (
		<TouchableOpacity onPress={yay}>
			<View style={styles.resortOptionContainer}>
				<Text style={{fontSize: 14}}>{resort.name} <Text style={{fontSize: 12, color: 'gray'}}>{distanceAway}</Text></Text>
				{resort.selected ? <Text>X</Text> : null}
			</View>
		</TouchableOpacity>
	)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globals.white,
    padding: globals.fullPadding
	},
	resortOptionContainer: {
		paddingTop: globals.fullPadding,
		paddingBottom: globals.fullPadding,
		borderColor: 'lightgray',
		borderBottomWidth: 1,
		flexDirection: 'row',
		flex: 1,
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	}
});

export default ResortSelector;
