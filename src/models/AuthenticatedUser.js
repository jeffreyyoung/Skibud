import {observable, computed} from "mobx";
import {serializable, identifier} from 'serializr'
import {AsyncStorage} from 'react-native';
import _ from 'lodash';
import graphql from './../services/GraphqlRequest'
class UserData {
  
  @observable _id = ""
  @observable token = ""
  @observable firstName = ""
  @observable coordinates = [];
  @observable lastName = ""
  @observable name = ""
  @observable facebookId = ""
  @observable email = ""
  @observable picture = ""
  @observable photos = []
  @observable coordinates = []
  @observable resortIds = [];
  @observable bio = "";
  resorts = []
  fromJson(object) {
	  console.log('FROM JSON', JSON.stringify(object, null, 3))
    if (object) {
        this.token = object.token;
        this._id = object._id;
        this.firstName = object.firstName;
        this.lastName = object.lastName;
        this.facebookId = object.facebookId;
		this.facebookToken = object.facebookToken;
        this.picture = object.picture;
        this.email = object.email;
        this.name = object.name;
        this.coordinates = object.coordinates;
		this.bio = object.bio;
		if (object.resortIds) {
			this.resortIds = [];
			for (let rId of object.resortIds) {
				this.resortIds.push(rId);
			}
		}
		if (object.resorts) {
			this.resorts = [];
			for (let rId of object.resorts) {
				this.resorts.push(rId);
			}
		}
		if (object.photos) {
			this.photos = [];
			for (let i of object.photos) {
				this.photos.push(i);
			}
		}
    }
  }
  
  async load() {
    let data = await AsyncStorage.getItem('AuthenticatedUser');
    console.log('loaded', data);
    this.fromJson(JSON.parse(data));
  }
  
  async save(updateServer = false) {
	  console.log('SENDING THIS', JSON.stringify(this));
    AsyncStorage.setItem('AuthenticatedUser', JSON.stringify(this))
	if (!updateServer) {
		return this;
	}
	try {
		await graphql(`
			mutation($user:UserInput) {
				updateUser(user: $user, test: 1) {
					bio
				}
			}
		`, {
			user: {
				resortIds: JSON.parse(JSON.stringify(this.resortIds)),
				photos: JSON.parse(JSON.stringify(this.photos)).map(p => {return {thumbnail: p.thumbnail, large: p.large}; }),
				bio: this.bio
			}
		});
	} catch(e) {
		JSON.stringify(e, null, 3)
	}

	return this;
  }
  
  clear() {
    this.token = "";
    this._id = "";
    this.firstName = "";
    this.lastName = "";
    this.facebookId = "";
	this.facebookToken = "";
    this.picture = "";
    this.email = "";
    this.name = "";
    this.coordinates = [];
	this.resorts = []
	this.resortIds = []
	this.photos = []
  }
  
  @computed get longitude() {
    return _.nth(this.coordinates, 0);
  }
  
  @computed get latitude() {
    return _.nth(this.coordinates, 1);
  }
  
  @computed get isLoggedIn() {
    return this.token && this.token.length > 0;
  }
  
  @computed get longitude() {
    return this.coordinates[0];
  }
  
  @computed get latitude() {
    return this.coordinates[1];
  }
}

let user = new UserData();
user.load();
export default user;