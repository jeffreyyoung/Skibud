import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react'
import {StyleSheet, View, InteractionManager} from 'react-native'
import AppComponent from './../models/AppComponent.js'
import _ from 'lodash';
import realm from './../realm';
import moment from 'moment';

class Chat extends AppComponent {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
			showLoadingView: true
		};
		this.onSend = this.onSend.bind(this);
		
	}

	formatMessages(messages = []) {
		return _.chain(messages)
		.filter(m => {
			return m.to == this.props._id || m.from == this.props._id;
		})
		.map(message => {
			let user = {};
			if (this.app.user._id === message.from && false) {
				user = {
					_id: message.from,
					name: this.app.user.firstName,
					avatar: _.get(this.app.user, 'photos[0].thumbnail')
				}
			} else {
				user = {
					_id: message.from,
					name: this.props.firstName,
					avatar: _.get(this.props, 'photos[0].thumbnail')
				}
			}
			return {
				_id: message._id,
				text: message.text,
				createdAt: new Date(message.createdAt),
				user: user
			}
		}).value().sort((a, b) => {
			return moment.utc(b.createdAt).diff(moment.utc(a.createdAt));
		})
	}
	
	addRealmMessagesToState( realmMessages ) {
		
		this.setState( previousState => {
			return {
				messages: GiftedChat.append([], this.formatMessages(realmMessages))
			}
		})
	}
	
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({showLoadingView: false});
			this.messages = realm.objects('Message');
			this.addRealmMessagesToState(this.messages);
			this.messages.addListener((messages, changes) => {
				let newMessages = changes.insertions.map( i => messages[i]);
				this.addRealmMessagesToState(messages);
			})
		});
	}
	
	componentWillUnmount() {
		this.messages.removeAllListeners();
	}

	onSend(messages = []) {
		messages.forEach(m => {
			this.app.socket.emit('new-message', {
				text: m.text,
				to: this.props._id,
				from: this.app.user._id
			}, (messageWithId) => {
				//TODO get this working
				if (messageWithId) {
					realm.write(() => {
						realm.create('Message', messageWithId, true);
					});
				} else {
					alert('Message failed to send');
				}
			})
		});
	}
	
  render() {
    return (
      <View style={{backgroundColor: 'white',flex:1, paddingBottom: 50}}>
	  	{ this.state.showLoadingView ? null : 
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: this.app.user._id,
			name: this.app.user.firstName,
			avatar: _.get(this.app.user, 'photos[0].thumbnail')
          }}
        /> }
      </View>
    );
  }
}

export default Chat;