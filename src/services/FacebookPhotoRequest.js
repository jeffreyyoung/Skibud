import axios from 'axios';
import user from './../models/AuthenticatedUser';
import _ from 'lodash';
export default class FacebookPhotoRequester {
	constructor(facebookId, facebookToken) {
		this.token = facebookToken;
		this.facebookId = facebookId;
		this.photos = [];
		this.nextUrl = `https://graph.facebook.com/v2.8/${facebookId}/photos?fields=images,name,id&access_token=${facebookToken}`;
	}
	
	_processPhotos(photos, next) {
		this.nextUrl = next;
		let newPhotos = [];
		for (let p of photos) {
			let newPhoto = {
				id: p.id,
				thumbnail: _.last(p.images).source,
				large: p.images[0].source
			}
			if (newPhoto) { newPhotos.push(newPhoto); }
			console.log('GOT THE URL', newPhoto);
		}
		this.photos = this.photos.concat(newPhotos);
	}
	
	async loadMorePhotos() {
		if (!this.nextUrl || this.nextUrl.length <= 1) { return false; }
		let response = await axios.get(this.nextUrl);
		let photos = [];
		let nextUrl = '';
		photos = _.get(response, 'data.data');
		nextUrl = _.get(response, 'data.paging.next');
		this._processPhotos(photos, nextUrl);
	}
	
	getPhotos() {
		return this.photos;
	}
}


