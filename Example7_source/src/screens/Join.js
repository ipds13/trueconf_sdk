import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import TrueConfSDK from 'react-native-trueconf-sdk';

export default class Join extends Component {

    state = {
        confID: "",
        confIDError: null
    }

    componentDidMount() {
        TrueConfSDK.initCustomViews();
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
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1, padding: 10}}>
                        <Button
                            onPress={this.onPressJoin}
                            title="Join" />
                    </View>
                    <View style={{flex:1, padding: 10}}>
                        <Button
                            onPress={this.props.onLogout}
                            title="Logout" />
                    </View>
                </View>
                <View style={{marginVertical: 10, borderBottomColor: 'black', borderBottomWidth: 1}} />
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1, padding: 10}}>
                        <Button
                            title="Hangup"
                            onPress={this.props.onHangup} />
                    </View>
                    <View style={{flex:1, padding: 10}}>
                        <Button
                            title="Mic"
                            onPress={this.props.onMic} />
                    </View>
                    <View style={{flex:1, padding: 10}}>
                        <Button
                            title="Cam"
                            onPress={this.props.onCam} />
                    </View>
                </View>
            </View>
        )
    }
}