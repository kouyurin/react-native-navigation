import React from 'react';
import { NavigationComponentProps } from 'react-native-navigation';

import Root from '../components/Root';
import Button from '../components/Button';
import Navigation from '../services/Navigation';
import Screens from './Screens';
import testIDs from '../testIDs';

const {
  CHANGE_TITLE_BTN,
  HIDE_TOP_BAR_BTN,
  SHOW_TOP_BAR_BTN,
  TOP_BAR,
  PUSH_BTN,
  HIDE_TOPBAR_DEFAULT_OPTIONS,
  SHOW_YELLOW_BOX_BTN,
  SET_REACT_TITLE_VIEW,
  GOTO_BUTTONS_SCREEN,
} = testIDs;

interface Props extends NavigationComponentProps {}

export default class Options extends React.Component<Props> {
  static options() {
    return {
      topBar: {
        visible: true,
        testID: TOP_BAR,
        title: {
          text: 'Styling Options',
        },
      },
    };
  }

  state = {
    isAndroidNavigationBarVisible: true,
  };

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button label="Change title" testID={CHANGE_TITLE_BTN} onPress={this.changeTitle} />
        <Button label="Hide TopBar" testID={HIDE_TOP_BAR_BTN} onPress={this.hideTopBar} />
        <Button label="Show TopBar" testID={SHOW_TOP_BAR_BTN} onPress={this.showTopBar} />
        <Button label="Push" testID={PUSH_BTN} onPress={this.push} />
        <Button
          label="Hide TopBar in DefaultOptions"
          testID={HIDE_TOPBAR_DEFAULT_OPTIONS}
          onPress={this.hideTopBarInDefaultOptions}
        />
        <Button
          label="Set React Title View"
          testID={SET_REACT_TITLE_VIEW}
          onPress={this.setReactTitleView}
        />
        <Button
          label="Show Yellow Box"
          testID={SHOW_YELLOW_BOX_BTN}
          onPress={() => console.warn('Yellow Box')}
        />
        <Button
          label="Buttons Screen"
          testID={GOTO_BUTTONS_SCREEN}
          onPress={this.pushButtonsScreen}
        />
        <Button label="StatusBar" onPress={this.statusBarScreen} />
        <Button
          label="Toggle Navigation bar visibility"
          platform="android"
          onPress={this.toggleAndroidNavigationBar}
        />
      </Root>
    );
  }

  changeTitle = () =>
    Navigation.mergeOptions(this, {
      topBar: {
        title: {
          text: 'Title Changed',
        },
      },
    });

  hideTopBar = () =>
    Navigation.mergeOptions(this, {
      topBar: {
        visible: false,
      },
    });

  showTopBar = () =>
    Navigation.mergeOptions(this, {
      topBar: {
        visible: true,
      },
    });

  toggleAndroidNavigationBar = () => {
    this.setState({ isAndroidNavigationBarVisible: !this.state.isAndroidNavigationBarVisible });
    Navigation.mergeOptions(this, {
      navigationBar: {
        visible: !this.state.isAndroidNavigationBarVisible,
      },
    });
  };

  push = () =>
    Navigation.push(this, {
      component: {
        name: Screens.Pushed,
        passProps: {
          previousScreenIds: [this.props.componentId],
        },
      },
    });

  hideTopBarInDefaultOptions = () => {
    Navigation.setDefaultOptions({
      topBar: {
        visible: false,
        title: {
          text: 'Default Title',
        },
      },
    });
  };

  setReactTitleView = () =>
    Navigation.mergeOptions(this, {
      topBar: {
        title: {
          component: {
            name: Screens.ReactTitleView,
            alignment: 'center',
            passProps: {
              text: 'Press Me',
            },
          },
        },
      },
    });

  statusBarScreen = () => Navigation.showModal(Screens.StatusBar);

  pushButtonsScreen = () =>
    Navigation.push(this, Screens.Buttons, {
      animations: {
        push: {
          waitForRender: true,
        },
      },
    });
}
