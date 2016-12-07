import axios from 'axios';
import {host} from './../constants/globals'
import user from './../models/AuthenticatedUser'

let graphqlRequest = async(query = "", variables = false) => {
  
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
  
  if (user.token && user.token !== '') {
	  console.log('TOKEN', user.token);
    options.headers['x-access-token'] = user.token;
    options.headers['Content-Type'] = variables ? 'application/graphql' : 'application/json';
  }
  
  console.log('sending shiz', body);
  let response = await fetch(options.url+`?query=${query}`, options)
  console.log('GOT A RESPONSE', response);
  if (!response.ok) { throw 'Poop'}
  return JSON.parse(response._bodyText).data;
}

export default graphqlRequest;