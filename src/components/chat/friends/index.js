import React, { Component } from 'react'
import { ListView, Text, TouchableOpacity } from 'react-native'
import MessageListViewCell from './friendCell'
import AppComponent from './../../../models/AppComponent'
let data = [
  {
    name: 'Mark',
    imageUri: 'https://pbs.twimg.com/profile_images/728862680874786816/6JNuFNzQ.jpg'
  },
  {
    name: 'Steve',
    imageUri: 'https://pbs.twimg.com/profile_images/643969868396670976/xA4pTpYb.png'
  },
  {
    name: 'Wozniak',
    imageUri: 'https://s-media-cache-ak0.pinimg.com/originals/9a/28/a8/9a28a82ac2b59f321cf78d67bd0d0a2a.jpg'
  }
]

class MessagesList extends AppComponent {
  constructor(props, context) {
    super(props, context);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data)
    }
  }
  
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => <MessageListViewCell {...rowData} navigator={this.props.navigator}/>}
      />
    )
  }
}

export default MessagesList