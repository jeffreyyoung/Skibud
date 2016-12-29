import graphqlRequest from './../services/GraphqlRequest';
import uiState from './UIState';
import user from './AuthenticatedUser'
import Resort from './Resort'
import { observable, reaction } from 'mobx'
import SocketIOClient from 'socket.io-client';
import realm from './../realm';
import { host } from './../constants/globals'

class Store {
  @observable resorts = []
  
  constructor() {
    this.user = user;
    this.ui = uiState;
    this.graphql = graphqlRequest;
	this.socket = SocketIOClient(host);
	reaction(() => this.user.token, (token) => {
		if (token && token.length > 0) {
			this.socket.emit('init', {token: token});
		} else {
			this.socket.emit('logout');
		}
	});
	
	this.socket.on('new-message', payload => {
		console.log('NEW MESSAGE', JSON.stringify(payload));
		realm.write(() => {
			realm.create('Message', payload, true);
		});
	});
	
	this.socket.on('new-message-sent', payload => {
		realm.write(() => {
			realm.create('Message', payload, true);
		});
	});
	
	// realm.write(() => {
	// 	// Delete multiple books by passing in a `Results`, `List`,
	// 	// or JavaScript `Array`
	// 	let allBooks = realm.objects('Message');
	// 	realm.delete(allBooks); // Deletes all books
	// });
	
	// graphqlRequest(`
	// 	query {
	// 		allResorts(distance: 999999) {
	// 			_id
	// 			name
	// 			coordinates {
	// 				lat
	// 				lon
	// 			}
	// 		}
	// 	}
	// `).then(result => {
	// 	for (var resort of result.allResorts) {
	// 		let r = new Resort(resort);
	// 		//console.log('adding:  ', r);
	// 		this.resorts.push(r)
	// 	}
	// })
  }
}

let store = new Store();

export default store;