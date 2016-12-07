import {observable, computed} from "mobx";
import {serializable, identifier} from 'serializr'
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

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
		if (object.resortIds) {
			for (let rId of object.resortIds) {
				this.resortIds.push(rId);
			}
		}
		if (object.resorts) {
			for (let rId of object.resorts) {
				this.resorts.push(rId);
			}
		}
		if (object.photos) {
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
  
  save() {
    AsyncStorage.setItem('AuthenticatedUser', JSON.stringify(this))
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