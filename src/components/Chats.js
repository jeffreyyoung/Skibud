import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ListView } from 'react-native'
import { globals } from './../constants/globals'
import Dimensions from 'Dimensions'
import AppComponent from './../models/AppComponent'
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
        renderRow={rowData => <FriendCell {...rowData} navigator={this.props.navigator}/>}
      />
    )
  }
}

export default MessagesList


const message = 'asdfjklljkasf jklasdfl jkasdfj kladsfj l jkadfsjkl asdfljk afsd asdf jkajlsdfj lasjf lkjlkafsdjkl afsdjk lfasjkl afsjk lfsajl kafsjkl fsadjlk dsfa jklafdsjl kafsdjl k'

class FriendCell extends AppComponent {
  render() {
    let props = this.props;
    return (
      <TouchableOpacity onPress={() => this.app.ui.segway('chat', props)}>
        <View style={styles.container}>
          <Image source={{uri: props.imageUri}}style={styles.image} />
          <View style={{flexWrap: 'wrap'}}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={{flexDirection:'row', flex: 1, width: 100, flexWrap: 'wrap'}}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.messagePreview}>{message}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: globals.fullPadding,
    paddingTop: globals.halfPadding,
    paddingBottom: globals.halfPadding,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: globals.secondaryColor,
    borderBottomWidth: 1
  },
  
  image: {
    borderRadius: globals.fullPadding * 3.5,
    height: globals.fullPadding * 7,
    width: globals.fullPadding * 7,
    marginRight: globals.halfPadding
  },
  
  name: {
    fontSize: globals.fullPadding * 2,
    color: globals.primaryColor,
    fontWeight: 'bold'
  },
  
  messagePreview: {
    flexWrap: 'wrap',
    maxWidth: Dimensions.get('window').width - globals.fullPadding * 9,
    color: globals.secondaryColor
    //flex: 1,
    //width: 100
  }
  
})