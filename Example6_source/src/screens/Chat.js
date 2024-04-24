import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class Chat extends Component {

    state = {
        userID: "",
        userIDError: null,
        message: "",
        messageError: null
    }

    onPressSend = () => {
        if (this.state.message.trim() === "") {            
            this.setState({ messageError: this.state.message.trim() === ""? "Message is required" : null });
        } else {
            this.props.onSend(this.state.userID, this.state.message);
        }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                   Send message to user
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='User ID'
                    placeholderTextColor='gray'
                    onChangeText={(userID) => this.setState({userID})}
                    value={this.state.userID} />               
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='Message'
                    placeholderTextColor='gray'
                    onChangeText={(message) => this.setState({message})}
                    value={this.state.message} />
                {!!this.state.messageError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.messageError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressSend}
                    title="Send" />                    
                <View style={{margin:7}} />
                <Button
                    onPress={this.props.onLogout}
                    title="Logout"/>
            </View>
        )
    }
}