import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

export default class SearchEBay extends React.Component {
  constructor(props) {
    super(props);
  }
  
  state = {};

  componentWillReceiveProps(props) {
    this.setState({searchURL: props.searchURL});
  }

  render() {
    return (
      <View style={searchEBayStyle}>
        <WebView source={{uri: this.state.searchURL || 'https://www.google.com'}} />
      </View>
    );
  }
}

const searchEBayStyle = StyleSheet.create({
  borderWidth: 1,
  flex: 1
});