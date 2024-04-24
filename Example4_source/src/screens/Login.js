import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

export default class Login extends Component {

    state = {
        login: "",
        loginError: null,
        password: "",
        passwordError: null
    }

    onPressLogin = () => {
        if (this.state.login.trim() === "" || this.state.password.trim() === "") {
            this.setState({ loginError: this.state.login.trim() === ""? "Login is required" : null });
            this.setState({ passwordError: this.state.password.trim() === ""? "Password is required" : null });
        } else {
            this.props.onLogin(this.state.login, this.state.password);
        }
    }

    render() {
        return (
            <View style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27, color: "black"}}>
                    Login on server
                </Text>
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='Username'
                    placeholderTextColor='gray'
                    onChangeText={(login) => this.setState({login})}
                    value={this.state.login} />
                {!!this.state.loginError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.loginError}
                    </Text>
                )}
                <TextInput 
                    style={{height: 40, borderBottomColor: 'gray', borderBottomWidth: 1, color: "black"}}
                    placeholder='Password'
                    placeholderTextColor='gray'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password} />
                {!!this.state.passwordError && 
                ( 
                    <Text 
                        style={{ color: "red" }}>
                        {this.state.passwordError}
                    </Text>
                )}
                <View style={{margin:7}} />
                <Button 
                    onPress={this.onPressLogin}
                    title="Login" />
                <View style={{margin:7}} />
                <Button
                    onPress={this.props.onDisconnect}
                    title="Change server"/>
            </View>
        )
    }
}