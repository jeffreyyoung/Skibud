import {observable, computed} from "mobx";
import _ from 'lodash';
import store from './Store';

export default class Event {

  @observable _id = "";
  @observable name = "";
  @observable date = "";
  @observable resortId = "";
  
  get resort() {
    if (this._cachedResort) {
      return this._cachedResort;
    } else {
      this._cachedResort = _.find(store.resorts, {_id: this.resortId}) || null;
      return this._cachedResort || {};
    }
  }
  _cachedResort = null;
  constructor(json) {
    if (json)
      this.fromJson(json);
  }
  
  fromJson(json) {
    if (json) {
        this._id = json._id;
        this.name = json.name;
        this.date = json.date;
        this.resortId = json.resortId;
    }
  }
}
