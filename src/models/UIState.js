import {observable, computed} from "mobx";

class UIState {
  @observable selectedTab = 'buddyFinderTab';
  navigators = {};
  
  addNavigator(key, navigator) {
    if (!this.navigators[key] && navigator) {
      this.navigators[key] = navigator;  
    }
  }
  
  segway(scene, nextSceneProps = {}, custom = {}) {
    this.navigator.push({scene: scene, props: nextSceneProps, custom: custom});
  }
  
  launchSegway(scene, nextSceneProps = {}) {
    this.launchNavigator.push({scene: scene, props: nextSceneProps});
  }
  
  @computed get navigator() {
    return this.navigators[this.selectedTab];
  }
  
  @computed get launchNavigator() {
    return this.navigators['launch'];
  }
}

let state = new UIState();
export default state;

