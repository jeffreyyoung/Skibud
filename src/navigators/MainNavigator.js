import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, Navigator, AsyncStorage, TouchableOpacity } from 'react-native';
import { globals } from './../constants/globals';
import FIcon from 'react-native-vector-icons/FontAwesome';
import NavigationBar from 'react-native-navbar';
import BuddyFinder from './../components/BuddyFinder'
import Chat from './../components/Chat'
import ChatList from './../components/Chats'
import ProfileDetail from './../components/Profile'
import SelfProfile from './../components/EditableProfile'
import EventsScene from './../components/Events'
import EventDetail from './../components/Events/EventDetail'
import NewEventScene from './../components/NewEvent'
import ProfileBuilder from './../components/ProfileBuilder'
import uiState from './../models/UIState';
import app from './../models/Store';

import _ from 'lodash'
var NavigationBarRouteMapper = { 
  LeftButton: function( route, navigator, index, navState ){
    if (route.custom && route.custom.renderLeftButton) {
		return route.custom.renderLeftButton();
	}
	if (route.scene === 'events') {
		return <TouchableOpacity onPress={() => navigator.push({scene: 'newEvent', props: {}})} style={[styles.rightButton]}><FIcon name='plus' size={10} style={styles.navBarText} color='white'/></TouchableOpacity>;
	}
    
    if (index) {
		let onBack = () => {
			if (route.custom.onBack) {
				route.custom.onBack();
			}
			navigator.pop();
		}
      return(
        <TouchableOpacity onPress={onBack} style={[{flexDirection: 'row'}, styles.leftButton]}><FIcon style={styles.navBarText} name='chevron-left' size={8} color='white'/><Text style={styles.navBarText}></Text></TouchableOpacity>
      )
    } else {
      return null;
    }
  },
  Title: function( route, navigator, index, navState ){
    return(
      <Text style={[styles.navBarText, styles.navBarTitleText]}>{_.get(route, 'props.title')}</Text>
    )
  },
  RightButton: function( route, navigator, index, navState ){	
	if (route.custom && route.custom.renderRightButton) {
		return route.custom.renderRightButton();
	}
	if (route.scene === 'newEventModal') {
      return route.props.renderRightButton(navigator);
	} else if (route.scene === 'selfProfile') {
		let onEditPress = () => {
			alert('here');
			uiState.segway('profileBuilder', {}, {
				onBack: () => {
					app.user.save(true);
				}
			})
		}
		return (<TouchableOpacity onPress={onEditPress} style={[styles.rightButton]}><FIcon name='edit' size={14} style={styles.navBarText} color='white'/></TouchableOpacity>);
	}
  }
}


export default class MainNavigator extends Component {
  
  components = {
    'messages': Chat,
    'buddyFinder': BuddyFinder,
    'profileDetail': ProfileDetail,
    'events': EventsScene,
    'eventDetail': EventDetail,
  }
  
  constructor(props, ...otherShiz) {
    super(props, ...otherShiz);
    this.initialScene = props.initialScene;
  }
  
  render(){
    return (<Navigator
      style={{'paddingTop': 60}}
      initialRoute={{ scene: this.initialScene, index: 0 }}
      
      navigationBar={
         <Navigator.NavigationBar
           style={styles.navBar}
           routeMapper={ NavigationBarRouteMapper } 
         />
      } 
      
      configureScene={(route, routeStack) => {
		if (route && route.custom && route.custom.configureScene) {
			return route.custom.configureScene();
		}
        if (route.scene === 'newEventModal') {
          return route.props.configureScene();
        } else {
          return Navigator.SceneConfigs.PushFromRight
        }
      }}
      
      renderScene={(route, navigator) => {
        uiState.addNavigator(uiState.selectedTab, navigator);
        console.log('pushing to route: ', route.scene);
		console.log('hereeeee', uiState.selectedTab, route);
        switch (route.scene) {
          case 'chat':
            return <Chat {...route.props} navigator={navigator} />
          case 'buddyFinder':
            return <BuddyFinder {...route.props} navigator={navigator} />
          case 'profileDetail':
            return <ProfileDetail {...route.props} navigator={navigator} />
          case 'events':
            return <EventsScene {...route.props} navigator={navigator} />
          case 'eventDetail':
            return <EventDetail {...route.props} navigator={navigator} />
          case 'chatList':
            return <ChatList {...route.props} navigator={navigator} />
          case 'selfProfile':
            return <SelfProfile {...route.props} navigator={navigator} />
          case 'newEvent':
            return <NewEventScene {...route.props} navigator={navigator} />
			case 'profileBuilder':
				return <ProfileBuilder {...route.props} navigator={navigator} />
          case 'newEventModal':
            return route.props.renderScene();
			case 'custom':
				return route.custom.renderScene();
        }
        
        throw new Error('reached end of navigators');
      }}
    />)
  }
}

const styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    //borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: globals.primaryColor,
    paddingLeft: 10,
    paddingRight: 10
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'white'
  },
  leftButton: {
      paddingLeft: 10
  },
  rightButton: {
    paddingRight: 10
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  }
});