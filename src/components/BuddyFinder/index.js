import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globals } from './../../constants/globals'
import Dimensions from 'Dimensions'
import _ from 'lodash'
import BuddyCard from './BuddyCard'
import SwipeCardsContainer from 'react-native-swipe-cards'
import AppComponent from './../../models/AppComponent';
class BuddyFinder extends AppComponent {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    this.state = {
	  usersToSwipe: []
    }
  }

	componentDidMount() {
		super.componentDidMount();
		this.getSwipableUsers();
	}
	
	onLeftSwipe(data) {
		//query
		this.app.graphql(`
			mutation {
				swipeLeft(userId: "${data._id}")
			}
		`)
		this.onSwipe(data);
	}
	
	onRightSwipe(data) {
		//query
		this.app.graphql(`
			mutation {
				swipeRight(userId: "${data._id}")
			}
		`)
		this.onSwipe(data);
	}
	
	onSwipe(data) {
		for (let u of this.state.usersToSwipe) {
			if (u._id === data._id) { u.swiped = true; }
		}
		if (this.shouldRequestMoreUsersToSwipe()) {
			this.getSwipableUsers();
		}
	}
	
	shouldRequestMoreUsersToSwipe() {
		let { usersToSwipe } = this.state;
 		let requestMore = usersToSwipe.filter(u => u.swiped).length === usersToSwipe.length;
		return requestMore;
	}
  
	async getSwipableUsers() {
		console.log('loading more');
		this.setState({loading: true});
			
		let data =  await this.app.graphql(`
			query {
				usersToSwipe(limit: 10) {
					_id
					name
					picture
					photos {
						thumbnail
						large
					}
				}
			}
			`);
		let usersToSwipe = data.usersToSwipe.map(u => {
			u.age = 35;
			u.swiped = false;
			return u;
		})
		setTimeout(() => {
			if (usersToSwipe.length > 0) {
				this.setState({
					loading: false,
					usersToSwipe: usersToSwipe
				});
			}
		}, 500)
	}
  
  render() {
    return (
      <View style={styles.container}>
	  	<ActivityIndicator
			animating={this.state.loading}
		/>
		<SwipeCardsContainer
			cards={this.state.usersToSwipe}
			loop={false}
			renderCard={cardData => <BuddyCard key={cardData._id}{...cardData}/>}
			handleYup={this.onLeftSwipe.bind(this)}
			handleNope={this.onRightSwipe.bind(this)}
		/>
		</View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      //flex: 1,
      padding: globals.fullPadding,
      paddingTop: 23,
      backgroundColor: globals.white,
      paddingBottom: 50
    }
});

export default BuddyFinder;
