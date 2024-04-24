import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class Call extends Component {

    state = {
        callID: "",
        callIDError: null
    }

    onPressCall = () => {
        if (this.state.callID.trim() === "") {
            this.setState({ callIDError: "Call ID is required" });
          } else {
            this.props.onCall(this.state.callID);
          }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                    Call to user
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='User ID'
                    placeholderTextColor='gray'
                    onChangeText={(callID) => this.setState({callID})}
                    value={this.state.callID} />
                {!!this.state.callIDError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.callIDError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressCall}
                    title="Call" />                    
                <View style={{margin:7}} />
                <Button
                    onPress={this.props.onLogout}
                    title="Logout"/>
            </View>
        )
    }
}