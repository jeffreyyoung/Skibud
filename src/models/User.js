import {observable, computed} from "mobx";
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

export default class User {
  @observable _id = ""
  @observable firstName = ""
  @observable lastName = ""
  @observable name = ""
  @observable picture = ""
  @observable resorts = []
}
