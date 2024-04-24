import React, { Component } from 'react';
import { Text, View, Alert, SafeAreaView, StatusBar, Platform } from 'react-native';

import TrueConfSDK from 'react-native-trueconf-sdk';

import Join from './src/screens/Join';
import Login from './src/screens/Login';
import Connect from './src/screens/Connect';

let timer;
let time;

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  state = {
    loggedIn: false,
    connected: false,
    serverName: "",
    status: STATUSES.disconnected,
    confTimeStr: ""
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

  onConferenceStart = () => {
    time = 0;
    timer = setInterval(() => {
      time++;
    }, 1000);
  }

  onConferenceEnd = () => {
    clearInterval(timer);
    let days = Math.floor(time / (60 * 60 * 24));
    let hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((time % (60 * 60)) / 60);
    let seconds = Math.floor(time % 60);
    let timestr = (days > 0 ? days + " days " : "") + (hours > 9 ? hours : ('0' + hours)) + ":" +
    (minutes > 9 ? minutes : ('0' + minutes)) + ":" + (seconds > 9 ? seconds : ('0' + seconds));
    this.setState({ confTimeStr: timestr });
  }

  initEventsListeners() {
   TrueConfSDK.addEventListener('onServerStatus', this.onServerStatus);
   TrueConfSDK.addEventListener('onInvite', this.onInvite);
   TrueConfSDK.addEventListener('onLogin', this.onLogin);
   TrueConfSDK.addEventListener('onLogout', this.onLogout);
   TrueConfSDK.addEventListener('onConferenceStart', this.onConferenceStart);
   TrueConfSDK.addEventListener('onConferenceEnd', this.onConferenceEnd);
  }

  screenForState() {
    if(this.state.loggedIn) {
      return <Join 
        onJoin={confID => TrueConfSDK.joinConf(confID)}
        onLogout={() => TrueConfSDK.logout()}
        confTime={this.state.confTimeStr}
        />
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