import React, { Component } from 'react';
import { observer } from 'mobx-react/native'
import store from './Store';

@observer
export default class AppComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.app = store;
  }
}

