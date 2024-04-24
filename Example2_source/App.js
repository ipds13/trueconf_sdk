/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Alert, SafeAreaView, StatusBar, Platform } from 'react-native';

import TrueConfSDK from 'react-native-trueconf-sdk';
import Parse from './src/screens/Parse';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    server: "",
    login: "",
    status: STATUSES.disconnected
  }

  componentDidMount() {
    TrueConfSDK.start('qa4.trueconf.net');
    setTimeout(() => {
      console.log('Start TrueConf SDK');
    }, 5000);
    this.initEventsListeners();
  }

  componentWillUnmount() {
    TrueConfSDK.removeAllListeners();
  }

  onServerStatus = (event) => {
    this.state.server = event.serverName;
    this.setState({ status: event.connected? STATUSES.connected + this.state.server : STATUSES.disconnected });
  }

  onLogin = (event) => {
    this.state.login = event.userID;
    this.setState({ status: event.loggedIn? STATUSES.loggedIn + this.state.login : STATUSES.connected + this.state.server });
  }

  onLogout = () => {
    this.setState({ status: STATUSES.connected + this.state.server });
  }

  onInvite = (event) => {
    if (Platform.OS === 'ios'){
      Alert.alert(
        'Incoming call',
        'Accept incoming call from ' + event.userID,
        [{
            text: 'Reject',
            onPress: () => TrueConfSDK.acceptCall(false),
            style: 'cancel',
          },
          {text: 'Accept', onPress: () => TrueConfSDK.acceptCall(true)},
        ],
      );
    }
  }

  initEventsListeners() {
   TrueConfSDK.addEventListener('onServerStatus', this.onServerStatus);
   TrueConfSDK.addEventListener('onInvite', this.onInvite);
   TrueConfSDK.addEventListener('onLogin', this.onLogin);
   TrueConfSDK.addEventListener('onLogout', this.onLogout);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{flex: 0.95}}>
          <Parse
            onParse={plink => TrueConfSDK.parseProtocolLink(plink)}/>
        </View>   
        <View style={{flex: 0.05, alignItems: 'center'}}> 
          <Text>{this.state.status}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const STATUSES = {
  disconnected: 'No connection',
  connected: 'Connected to ',
  loggedIn: 'Logged in as '
};
