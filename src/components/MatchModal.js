import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Button from './shared/Button';
import { globals } from './../constants/globals';
export default MatchModal = (props) => {
	let { visible, user, onModalClose } = props;
	if (!user) {
		user = {}
	}
	return (
		<Modal
			animationType={'fade'}
			transparent={true}
			visible={visible}
			onRequestClose={() => {alert('modal has closed')}}
			style={styles.container}
		>
			<View style={styles.container}>
				<Button onPress={onModalClose}>Send {user.firstName} a message</Button>
				<View style={styles.spacer} />
				<Button onPress={onModalClose}>Keep swiping</Button>
			</View>
			
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(255,255,255,0.9)',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	spacer: {
		padding: globals.halfPadding
	}
});