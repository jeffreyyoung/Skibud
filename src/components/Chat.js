import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react'
import {StyleSheet, View} from 'react-native'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Meow meow meow meow',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: this.props.name,
            avatar: this.props.imageUri
          },
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <View style={{backgroundColor: 'white',flex:1, paddingBottom: 50}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default Chat;