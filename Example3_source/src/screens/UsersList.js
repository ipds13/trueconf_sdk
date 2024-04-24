import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';

export default class UsersList extends Component {

  getStatusString = (state) => {
    switch(state) {
      case -127:
        return "Undefine";
      case -1:
        return "Unknown";
      case 0:
        return "Offline";
      case 1:
        return "Online";
      case 2:
      case 3:
      case 4:
      case 5:
        return "Busy";
    }
  }
    
  getStatusColor = (state) => {
    switch(state) {
      case -127:
      case -1:
        return "gray";
      case 0:
        return "red";
      case 1:
        return "green";
      case 2:
      case 3:
      case 4:
      case 5:
        return "orange";
    }
  }

  renderItem = ({ item }) => (
    <View style={{
      borderTopWidth: 1,
      padding: 16,
      flex: 1,
      flexDirection: 'row',
      justifyContent: "flex-start",
      }}>
      <View style={{
        backgroundColor: this.getStatusColor(item.state),
        aspectRatio: 1,
        borderRadius: 100/2,
      }} />
      <Text ellipsizeMode='tail' numberOfLines={1} style={{paddingStart: 16, color: "black"}}>
        {item.userID}
      </Text>
    </View>
  )

  render() {
    return(
      <View style={{flex: 1, paddingVertical: 20}}>
        <FlatList
          data={ this.props.users }
          extraData={this.props}
          renderItem={ this.renderItem }
          keyExtractor={ item => item.userID }/>
      </View>
    )
  }
}
