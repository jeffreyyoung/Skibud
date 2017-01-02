import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { globals } from './../constants/globals'
import Dimensions from 'Dimensions'
import _ from 'lodash'
import BuddyCard from './BuddyCard'
import SwipeCardsContainer from './SwipeCards'
import AppComponent from './../models/AppComponent';
import MatchModal from './MatchModal';
class BuddyFinder extends AppComponent {
	// Initialize the hardcoded data
	constructor(props) {
		super(props);
		this.state = {
			usersToSwipe: [],
			matchModalIsVisible: false
		}
		this.numberOfUserRequestsMade = 1;
	}

	componentDidMount() {
		super.componentDidMount();
		this.getSwipableUsers();
	}
	
	async onLeftSwipe(data) {
		//query
		await this.app.graphql(`
			mutation {
				swipeLeft(userId: "${data._id}") {
					isMatch
				}
			}
		`)
		this.onSwipe(data);
	}
	
	async onRightSwipe(data) {
		//query
		let result = await this.app.graphql(`
			mutation {
				swipeRight(userId: "${data._id}") {
					isMatch
				}
			}
		`)
		
		if (result.swipeRight.isMatch) {
			this.showMatchModal(data);
			//alert( 'HOLY SHIZ YOU MATCHED WITH ' + JSON.stringify(data) );
		}
		
		this.onSwipe(data);
	}
	
	hideMatchModal() {
		this.setState({matchModalIsVisible: false})
	}
	
	showMatchModal(user) {
		
		this.setState({
			matchModalIsVisible: true,
			matchModalUser: user
		})
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
		let usersToSwipe = [];
		
		//only make the query if the buddyFinderTab is selected
		if (this.app.ui.selectedTab === 'buddyFinderTab') {
			let data =  await this.app.graphql(`
				query {
					usersToSwipe(limit: 2) {
						_id
						firstName
						picture
						photos {
							thumbnail
							large
						}
						resorts {
							_id
							name
						}
						bio
					}
				}
				`);
			usersToSwipe = data.usersToSwipe.map(u => {
				u.age = 35;
				u.swiped = false;
				return u;
			})
		}
		setTimeout(() => {
			if (usersToSwipe.length > 0) {
				this.setState({
					loading: false,
					usersToSwipe: usersToSwipe
				});
			} else {
				setTimeout(() => {
					//back of in order to not overload servers
					this.numberOfUserRequestsMade+=1;
					//if there's no users make another request for users
					this.getSwipableUsers();
				}, 1000 * 5 * this.numberOfUserRequestsMade)
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
			handleYup={this.onRightSwipe.bind(this)}
			handleNope={this.onLeftSwipe.bind(this)}
		/>
		<MatchModal visible={this.state.matchModalIsVisible} user={this.state.matchModalUser} onModalClose={this.hideMatchModal.bind(this)}/>
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
