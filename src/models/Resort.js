import {observable, computed} from "mobx";
import _ from 'lodash';

export default class Resort {

  _id = "";
  pageId = "";
  name = "";
  extract = "";
  coordinates = {};
  
  constructor(json) {
    this.fromJson(json);
  }
  
  fromJson(json) {
    if (json) {
      this._id = _.get(json, '_id');
      this.pageId = _.get(json, 'pageId');
      this.name = _.get(json, 'name');
      this.extract = _.get(json, 'extract');
      this.coordinates = _.get(json, 'coordinates');
    }
  }
}
