import graphqlRequest from './../services/GraphqlRequest';
import uiState from './UIState';
import user from './AuthenticatedUser'
import Resort from './Resort'
import { observable } from 'mobx'
class Store {
  @observable resorts = []
  
  constructor() {
    this.user = user;
    this.ui = uiState;
    this.graphql = graphqlRequest;

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