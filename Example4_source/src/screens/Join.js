import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class Join extends Component {

    state = {
        confID: "",
        confIDError: null
    }

    onPressJoin = () => {
        if (this.state.confID.trim() === "") {
            this.setState({ confIDError: "Conf ID is required" });
          } else {
            this.props.onJoin(this.state.confID);
          }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                    Join the conference
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='Conference ID'
                    placeholderTextColor='gray'
                    onChangeText={(confID) => this.setState({confID})}
                    value={this.state.confID} />
                {!!this.state.confIDError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.confIDError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressJoin}
                    title="Join" />                    
                <View style={{margin:7}} />
                <Button
                    onPress={this.props.onLogout}
                    title="Logout"/>
                <Text style={{paddingTop: 20}}>{"Last conference time - " + this.props.confTime}</Text>
            </View>
        )
    }
}