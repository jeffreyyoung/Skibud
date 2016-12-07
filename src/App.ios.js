import React, { Component } from 'react';
import { View, Text, TabBarIOS } from 'react-native';
import {observer} from 'mobx-react/native'
import {globals} from './constants/globals';
import FIcon from 'react-native-vector-icons/FontAwesome';

import uiState from './models/UIState'
import MainNavigator from './navigators/MainNavigator'

@observer
class TabBarApp extends Component {
  render() {
    return ( 
      <TabBarIOS tintColor={globals.primaryColor}>
            <FIcon.TabBarItem title='Buddy Finder' iconName='group'
              selected={uiState.selectedTab === 'buddyFinderTab'}
              onPress={()=> uiState.selectedTab = 'buddyFinderTab'}
            >
              <MainNavigator initialScene='buddyFinder' />
            </FIcon.TabBarItem>
            {/*<FIcon.TabBarItem title='Events' iconName='calendar'
              selected={uiState.selectedTab === 'eventsTab'}
              onPress={()=> uiState.selectedTab = 'eventsTab'}
            >
              <MainNavigator initialScene='events' />
            </FIcon.TabBarItem>*/}
            <FIcon.TabBarItem title='Messages' iconName='comments'
            selected={uiState.selectedTab === 'messagesTab'}
            onPress={()=> uiState.selectedTab = 'messagesTab'}
            >
              <MainNavigator initialScene='chatList' />
            </FIcon.TabBarItem>
            <FIcon.TabBarItem title='Profile' iconName='user'
            selected={uiState.selectedTab === 'profileTab'}
            onPress={()=> uiState.selectedTab = 'profileTab'}
            >
              <MainNavigator initialScene='selfProfile' />
            </FIcon.TabBarItem>
          </TabBarIOS>)
  }
}

export default () => {return (<TabBarApp />)};