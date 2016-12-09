import axios from 'axios';
import {host} from './../constants/globals'
import user from './../models/AuthenticatedUser'

let graphqlRequest = async(query = "", variables = {}) => {
  
  console.log('HERES THE QUERY',query);
  let body = {
	  query: query,
	  variables: variables
  }
  
  let options = {
    method: 'post',
    url: host+'/graphql',
    headers: {},
	body: JSON.stringify(body)
  }
  
  console.log('SENDING BODY', body);
  console.log('HAS VARIABLES', !!variables);
  if (user.token && user.token !== '') {
	  console.log('TOKEN', user.token);
    options.headers['x-access-token'] = user.token;
    options.headers['Content-Type'] = 'application/json';
	options.headers['Accept'] = 'application/json'
  }
  
  console.log('sending shiz', body);
  let response = await fetch(options.url+ `?query=${query}`, options)
  console.log('getting a response');
  let responseJson = await response.json();
  console.log('got a response', JSON.stringify(responseJson, null, 3));
  if (!response.ok) { throw responseJson}
  try {
	return responseJson.data;
} catch(e) {
	throw e;
}
  
}

export default graphqlRequest;