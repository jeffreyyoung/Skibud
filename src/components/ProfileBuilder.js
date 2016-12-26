import React, { Component } from 'react';
import SortableGrid from 'react-native-sortable-grid';
import { Navigator, Text, View, Image, TextInput, StyleSheet, StatusBar, ScrollView, ActivityIndicator, ListView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globals } from './../constants/globals';
import AppComponent from './../models/AppComponent';
import Button from './shared/Button';
import FacebookImagePicker from './FacebookImagePicker';
import ResortSelector from './ResortSelector';
//https://github.com/ollija/react-native-sortable-grid
class ProfileBuilder extends AppComponent {
	constructor(props) {
		super(props);
		this.user = this.app.user;
		let intialText = this.app.user.bio;
		this.state = {
			text: intialText
		}
	}
	
	componentDidMount() {
		this.app.user.orderedPhotos = this.app.user.photos;
	}
	
	onPhotoSelect(photo) {
		this.app.user.photos.push(photo);
		this.app.ui.navigator.pop();
	}
	
	onPhotoReorder(data) {
		//alert(JSON.stringify(data));
		let nextPhotos = [];
		let orderedPhotos = _.sortBy(data.itemOrder, item => item.order)
		for (let orderedPhoto of orderedPhotos) {
			let i = _.findIndex(this.app.user.photos, userPhoto => userPhoto.thumbnail === orderedPhoto.key);
			nextPhotos.push(this.app.user.photos[i]);
		}
		this.app.user.orderedPhotos = nextPhotos;
	}
	
	onPhotoDoubleTap(data) {
		let i = _.findIndex(this.app.user.photos, userPhoto => userPhoto.thumbnail === data.thumbnail);
		if (i > -1) {
			this.app.user.photos.splice(i, 1);
		}
	}
	
	addFacebookPhoto() {
		this.app.ui.segway('custom', {title: 'Select an image'}, {
			renderScene: () => {
				return (
					<ScrollView style={{
						backgroundColor: 'white',
						paddingTop: globals.fullPadding,
					}}>
						<FacebookImagePicker 
							onPhotoSelect={this.onPhotoSelect.bind(this)}
						/>
						<View style={{padding: 50}}/>
					</ScrollView>
				);
			}
		})
	}
	
	onTextChange(newText) {
		this.app.user.bio = newText;
	}
	
	selectResorts() {
		this.app.ui.segway('custom', {title: 'Select ski resorts'}, {
			renderScene: () => {
				
				let onSelectionChange = (resorts) => {
					this.app.user.resorts = resorts;
					this.app.user.resortIds = resorts.map(r => r._id);
				}
				
				return (
					<ResortSelector
						onSelection={onSelectionChange.bind(this)}
						selectedResortIds={this.app.user.resortIds}
					/>
				)
			}
		})
	}
	
	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={[styles.attributeContainer, styles.sortableContainer]}>
					<Text style={styles.attributeLabel}>Photos</Text>
					<Text style={styles.attributeSubLabel}>Select up to 5 photos. Drag to reorder, tap to delete.</Text>
					<SortableGrid 
						itemsPerRow={4}
						onDragRelease={this.onPhotoReorder.bind(this)}
						style={{flex:1}}
					>
					  {
					    this.user.photos.map( (p, index) =>
					      <View key={p.thumbnail} onTap={this.onPhotoDoubleTap.bind(this, p)} style={styles.imageContainer}>
					        <Image style={styles.draggableImage} source={{uri: p.thumbnail}}/>
					      </View>

					    )
					  }
					</SortableGrid>
					{this.user.photos.length < 5 ? (
						<Button onPress={this.addFacebookPhoto.bind(this)}>Add photo from facebook</Button>
					): null}
				</View>
				<View style={styles.attributeContainer}>
					<Text style={styles.attributeLabel}>Bio</Text>
					<TextInput
						style={styles.textInput}
						multiline={true}
						numberOfLines={10}
						onChangeText={this.onTextChange.bind(this)}
						maxLength={500}
						value={this.app.user.bio}
					/>
				</View>
				<View style={styles.attributeContainer}>
					<Text style={styles.attributeLabel}>Resorts</Text>
					<Text style={styles.attributeSubLabel}>You will be able to find other users who ski at these selected resorts and they will be able to find you</Text>
					<Text style={styles.attributeValue}>{this.app.user.resorts.map(r => r.name).join(', ')}</Text>
					<Button onPress={this.selectResorts.bind(this)}>Change Resorts</Button>
				</View>
				<View style={{padding: 40}} />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: globals.gray,
		paddingTop: globals.fullPadding,
		paddingBottom: globals.fullPadding
	},
	attributeLabel: {
		fontSize: 18
	},
	attributeValue: {
		fontSize: 14,
		color: 'black',
		paddingTop: globals.fullPadding,
		paddingBottom: globals.fullPadding
	},
	attributeSubLabel: {
		fontSize: 13,
		color: 'gray'
	},
	attributeContainer: {
		backgroundColor: 'white',
		padding: globals.fullPadding,
		marginBottom: globals.fullPadding,
	},
	textInput: {
		height: 160, 
		borderColor: globals.gray, 
		borderWidth: 1,
		borderRadius: globals.halfPadding
	},
	imageContainer: {
		padding: 2.5
	},
	draggableImage: {
		borderRadius: 10,
		width: (Dimensions.get('window').width / 4.2) - 5,
		height: (Dimensions.get('window').width / 4.2) - 5,
		backgroundColor: globals.white
	},
	sortableContainer: {
		height: (Dimensions.get('window').width / 4.2) * 3
	}
});

export default ProfileBuilder;