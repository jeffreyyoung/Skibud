import _ from 'lodash';
import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ListView, RefreshControl } from 'react-native'
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
	this.ds = ds;
	this.state = {
		dataSource: ds,
	  	rows: ds.cloneWithRows([]),
		refreshing: false,
	}
  }
	
	async refresh() {
		this.setState({refreshing: true});
		try {
			let data = await this.app.graphql(`
				query {
					matches {
						firstName
						resorts {
							name
						}
						photos {
							thumbnail
							large
						}
					}
				}
			`);
			this.setState({rows: this.state.dataSource.cloneWithRows(data.matches)})
		} catch (e) {
			alert('There was an error loading matches' + JSON.stringify(e, null, 3));
			console.log(JSON.stringify(e, null, 3));
		} finally {
			this.setState({refreshing: false});
		}
		
	}
	
	componentDidMount() {
		this.refresh();
	}
	
  render() {
    return (
      <ListView
	  	refreshControl={
			<RefreshControl
				refreshing={this.state.refreshing}
				onRefresh={this.refresh.bind(this)}
			/>
		}
        dataSource={this.state.rows}
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
          <Image source={{uri: _.get(props, 'photos[0].thumbnail')}}style={styles.image} />
          <View style={{flexWrap: 'wrap'}}>
            <Text style={styles.name}>{props.firstName}</Text>
            <View style={{flexDirection:'row', flex: 1, width: 100, flexWrap: 'wrap'}}>
              <Text ellipsizeMode='tail' numberOfLines={2} style={styles.messagePreview}>{this.props.lastMessage ? this.props.lastMessage : `Send ${props.firstName} a message`}</Text>
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