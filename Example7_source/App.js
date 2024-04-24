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
import Join from './src/screens/Join';
import Login from './src/screens/Login';
import Connect from './src/screens/Connect';

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    loggedIn: false,
    connected: false,
    serverName: "",
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
    this.state.serverName = event.serverName;
    this.setState({ connected: event.connected });
    this.setState({ status: event.connected? STATUSES.connected + event.serverName : STATUSES.disconnected });
  }

  onLogin = (event) => {    
    this.setState({ loggedIn: event.loggedIn });
    this.setState({ status: event.loggedIn? STATUSES.loggedIn + event.userID : STATUSES.connected + this.state.serverName });
  }

  onLogout = () => {
    this.setState({ loggedIn: false });
    this.setState({ status: STATUSES.connected + this.state.serverName });
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

  screenForState() {
    if(this.state.loggedIn) {
      return <Join 
        onJoin={confID => TrueConfSDK.joinConf(confID)}
        onLogout={() => TrueConfSDK.logout()}
        onHangup={() => TrueConfSDK.hangup(true)}
        onMic={() => TrueConfSDK.microphoneMuted().then(mute => TrueConfSDK.muteMicrophone(!mute))}
        onCam={() => TrueConfSDK.cameraMuted().then(mute => TrueConfSDK.muteCamera(!mute))} />
    } else {
      if(this.state.connected) {
        return <Login 
          onLogin={(login, password) => TrueConfSDK.loginAs(login, password, true, true)} 
          onDisconnect={() => this.setState({ connected: false })}/>
      } else {
        return <Connect 
          onConnect={server => TrueConfSDK.start(server)} />
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle={'dark-content'} />
        <View style={{flex: 0.95}}>
          { this.screenForState() }
        </View>
        <View style={{flex: 0.05, alignItems: 'center'}}>
            <Text>{this.state.status}</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const STATUSES = {
  disconnected: 'No connection',
  connected: 'Connected to ',
  loggedIn: 'Logged in as ',
};