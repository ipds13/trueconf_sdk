import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class Connect extends Component {

    state = {
        serverName: "",
        serverError: null
    }

    onPressConnect = () => {
        if (this.state.serverName.trim() === "") {
            this.setState({ serverError: "Server is required" });
          } else {
            this.props.onConnect(this.state.serverName);
          }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                    Connect to server
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='Server name or IP'
                    placeholderTextColor='gray'
                    onChangeText={(serverName) => this.setState({serverName})}
                    value={this.state.serverName} />
                {!!this.state.serverError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.serverError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressConnect}
                    title="Connect" />
            </View>
        )
    }
}