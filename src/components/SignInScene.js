import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import {globals, host} from './../constants/globals'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import axios from 'axios';
import AppComponent from './../models/AppComponent'

class SignInScene extends AppComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSigningIn: false
    }
  }

  async loginWithFacebook() {
    this.setState({isSigningIn: true});
    
    try {
        setTimeout(async () => {
          let facebookResult = await LoginManager.logInWithReadPermissions([ 'email', 'user_friends', 'public_profile', 'user_photos' ]);
          if (facebookResult.isCancelled) {
            this.setState({isSigningIn: false});
            return;
          }
          let {accessToken} = await AccessToken.getCurrentAccessToken();
          let response = await this.app.graphql(`
            mutation {
              authenticateFacebookUser(facebookToken: "${accessToken}") {
				token
				_id
				picture
				name
				firstName
				facebookId
				facebookToken
				photos {
					thumbnail
					large
				}
				resorts {
					_id
					name
				}
				resortIds
				bio
              }
            }
          `)
          this.app.user.fromJson(response.authenticateFacebookUser);
          this.app.user.save();
          this.setState({isSigningIn: false});
          this.app.ui.launchSegway('InitialSettingsScene')
          return 'yay';
	  }, 1000)
        
    } catch (e) {
	alert('Unable to sign in');
      console.error('failed request')
      setTimeout(his.setState({isSigningIn: false}), 500);
	  
      this.alert('There was an error logging in...');
    }
  }
  
  alert(message) {
    setTimeout(() => alert(message))
  }
  
  render() {
    let w = Dimensions.get('window').width
    let h = Dimensions.get('window').height
    return (
      <View>
        <Image source={require('./../images/ski-friends.jpg')} style={[{width: w, height: h}, styles.container]}>
          <Text style={styles.title}>Skiing</Text>
          <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook.bind(this)}>
            Login with Facebook
          </Icon.Button>
          <SigningInModal visible={this.state.isSigningIn}/>
          <Text>{this.state.r}</Text>
        </Image>
      </View>
    );
  }
}


let SigningInModal = (props) => {
  let { visible } = props;
  return <Modal
    transparent={true}
    visible={visible}
  >
    <View style={[styles.container, {backgroundColor: 'rgba(255,255, 255, 0.7)'}]}>
      <View style={styles.signingInModal}>
        <ActivityIndicator
            animating={true}
            size="large"
          />
        <Text>Signing in...</Text>
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: globals.fullPadding,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  signingInModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15
  }
})

export default SignInScene;
