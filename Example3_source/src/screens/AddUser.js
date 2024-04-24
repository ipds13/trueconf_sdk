import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class AddUser extends Component {

    state = {
        userID: "",
        userIDError: null
    }

    onPressAdd = () => {
        if (this.state.userID.trim() === "") {
            this.setState({ userIDError: "User ID is required" });
          } else {
            this.props.onAdd(this.state.userID);
          }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                    Get user status
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='User ID'
                    placeholderTextColor='gray'
                    onChangeText={(userID) => this.setState({userID})}
                    value={this.state.userID} />
                {!!this.state.userIDError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.userIDError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressAdd}
                    title="Get" />
            </View>
        )
    }
}