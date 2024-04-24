import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class Parse extends Component {

    state = {
        plink: "",
        plinkError: null
    }

    onPressParse = () => {
        if (this.state.plink.trim() === "") {
            this.setState({ plinkError: "Protocol link is required" });
          } else {
            this.props.onParse(this.state.plink);
          }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                    Parse protocol link
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='Protocol link'
                    placeholderTextColor='gray'
                    onChangeText={(plink) => this.setState({plink})}
                    value={this.state.plink} />
                {!!this.state.plinkError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.plinkError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressParse}
                    title="Parse" />
            </View>
        )
    }
}