import React, { Component } from 'react';
import { Text, View, ListView, StyleSheet, StatusBar, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LoginManager } from 'react-native-fbsdk'
import { globals } from './../../constants/globals'
import Swiper from 'react-native-swiper';
import Image from 'react-native-image-progress';
import Dimensions from 'Dimensions'
import AppComponent from './../../models/AppComponent'
import Button from './../shared/Button'
import FacebookPhotoRequestor from './../../services/FacebookPhotoRequest.js';
import GridView from 'react-native-grid-view';
import _ from 'lodash';
import H1 from './../shared/H1'
const MAX_SELECTED_PHOTOS = 5;
const IMAGES_PER_ROW = 4;
export default class FacebookImagePicker extends AppComponent {
  constructor(props) {
    super(props);
	this.ds = new ListView.DataSource({
		rowHasChanged: (r1, r2) => {
			return (r1 !== r2)
		}
	});
	this.photosRequestor = new FacebookPhotoRequestor(this.app.user.facebookId, this.app.user.facebookToken);
	this.state = {
		images: [],
		selectedImages: [],
		imagesDs: this.ds.cloneWithRows([])
	}
  }
  
  componentDidMount() {
	this.loadMorePhotos();
  }
  
  async loadMorePhotos() {
	this.setState({loading:true});
	await this.photosRequestor.loadMorePhotos();
	let nextPhotos = this.getPhotosWithSelectedProperty(this.photosRequestor.getPhotos());
	
	  this.setState({
		  loading: false,
		  images: this.photosRequestor.getPhotos(),
		  imagesDs: this.ds.cloneWithRows(nextPhotos)
	  })
  }
	
	getPhotosWithSelectedProperty(photos = []) {
		photos.map(p => {
			p.selected = this.isPhotoSelected(p.thumbnail);
			return p;
		});
		return photos;
	}
	
	isPhotoSelected(uri) {
		return this.state.selectedImages.indexOf(uri) > -1;
	}
	
	togglePhoto(uri) {
		if (this.isPhotoSelected(uri)) {
			this.setState({
				selectedImages: _.filter(this.state.selectedImages, (i) => i !== uri)
			});
		} else {
			if (this.state.selectedImages.length >= 5) {
				this.state.selectedImages.shift();
			}
			this.state.selectedImages.push(uri);
			this.setState({
				selectedImages: this.state.selectedImages
			});
		}
		this.setState({
			imagesDs: this.ds.cloneWithRows(this.getPhotosWithSelectedProperty(this.photosRequestor.getPhotos()))
		});
	}
	
	getSelectedImageObjects() {
		return this.photosRequestor.getPhotos().filter(i => this.isPhotoSelected(i.thumbnail))
	}
	
	async saveSelectedImages() {
		if (this.state.selectedImages.length < 1) { return; }
		
		let imagesToSave = this.getSelectedImageObjects();
		let formated = _.map(imagesToSave, _.partial(_.ary(_.pick, 2), _, ['large', 'thumbnail']));
		let jsonifiedImages = JSON.stringify(formated);
		alert(`
			mutation {
				updatePhotos(photos: ${jsonifiedImages})
			}
		`);
		await this.app.graphql(`
			mutation($photos:[FacebookPhotoInput]!) {
				updatePhotos(photos: $photos)
			}
		`, {photos: formated});
		alert('yayayayay');
	}
	
  render() {
    return (
		<View>
			<Button onPress={this.saveSelectedImages.bind(this)}>Set as profile images...</Button>
			<ListView
				contentContainerStyle={styles.list}
				dataSource={this.state.imagesDs}
				renderRow={(photo) => {
					return (<SelectableImage key={photo.id} uri={photo.thumbnail} onPress={this.togglePhoto.bind(this, photo.thumbnail)} isSelected={this.isPhotoSelected(photo.thumbnail)} />)
				}}
			/>
			<ActivityIndicator animating={this.state.loading} />
			{this.state.loading ? null : <Button disabled={this.state.loading} onPress={this.loadMorePhotos.bind(this)}>Load More Photos</Button> }
		</View>
    );
  }
}

let SelectableImage = (props) => {
	let { uri, isSelected, onPress } = props;
	let imageStyles = {
		width: 125 - 5,
		height: (Dimensions.get('window').width / 3) - 20
	}
	return (
		<View style={{padding:2.5, height: Dimensions.get('window').width / 3}}>
			<TouchableOpacity onPress={onPress}>
				<Image style={styles.image} source={{uri: uri}}/>
				{ isSelected ? <View style={styles.overlay} /> : null}
			</TouchableOpacity>
		</View>
	)
}


const styles = StyleSheet.create({
  wrapper: {
    height: 300
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
},
  image: {
    width: (Dimensions.get('window').width / 3) - 5,
	height: (Dimensions.get('window').width / 3) - 5,
    backgroundColor: globals.white
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
},
overlay: {
  flex: 1,
  position: 'absolute',
  left: 0,
  top: 0,
  opacity: 0.5,
  backgroundColor: globals.primaryColor,
  width: Dimensions.get('window').width / 3,
  height: Dimensions.get('window').width / 3
}  
})
