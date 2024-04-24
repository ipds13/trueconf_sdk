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
import Connect from './src/screens/Connect';
import Login from './src/screens/Login';
import UsersList from './src/screens/UsersList';
import AddUser from './src/screens/AddUser';

export default class App extends Component {

  constructor(props) {
    super(props)    
  }

  state = {
    serverName: "",
    users: [],
    status: STATUSES.disconnected,
    loggedIn: false,
    connected: false
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

  onUserStatusUpdate = (event) => {
    let exist = false;
    let list = this.state.users;
    for(let i = 0; i < list.length; i++) {
      if(list[i].userID === event.userID) {
        list[i].state = event.state;
        exist = true;
        break;
      }
    }
    if(!exist) {
      list.push({ userID: event.userID, state: event.state});
    }
    this.setState({ users: list });
  }

  initEventsListeners() {
   TrueConfSDK.addEventListener('onServerStatus', this.onServerStatus);
   TrueConfSDK.addEventListener('onInvite', this.onInvite);
   TrueConfSDK.addEventListener('onLogin', this.onLogin);
   TrueConfSDK.addEventListener('onLogout', this.onLogout);
   TrueConfSDK.addEventListener('onUserStatusUpdate', this.onUserStatusUpdate);
  }

  screenForState() {
    if(this.state.loggedIn){
      return (   
        <View style={{flex: 1}}> 
          <AddUser onAdd={userID => TrueConfSDK.getUserStatus(userID)}/>
          <UsersList users={this.state.users}/>
        </View>)
    } else {
      if(this.state.connected) {
        return <Login
          onLogin={(login, password) => TrueConfSDK.loginAs(login, password, true, true)} 
          onDisconnect={() => this.setState({ connected: false })}/>
      } else {
        return <Connect
          onConnect={server => TrueConfSDK.start(server)}/>
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
    );
  }
}

const STATUSES = {
  disconnected: 'No connection',
  connected: 'Connected to ',
  loggedIn: 'Logged in as '
};
