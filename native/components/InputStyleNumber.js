import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class InputStyleNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      styleNumber: ''
    };
  }

  render() {
    return (
      <View style={inputStyle}>
        <TextInput 
          placeholder='Enter Style Number' 
          autoCapitalize={'characters'}
          maxLength={6}
          clearTextOnFocus={true}
          autoFocus={true}
          value={this.state.styleNumber}
          onChangeText={text => this.onChangeText(text)}
          />
      </View>
    );  
  }

  onChangeText = (newText) => {
    const removedNonAlphaNumberic = newText.replace(/[^0-9a-z]/gi, '');
    this.setState({styleNumber: removedNonAlphaNumberic}, () => {
      if (this.state.styleNumber.length === 6) {
        this.props.onStyleNumberInputed(this.state.styleNumber);
      }
    });
  }
}
const inputStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
  }
});