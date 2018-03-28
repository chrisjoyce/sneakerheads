import React from 'react'
import { StyleSheet } from 'react-native'
import { 
  Container, 
  Header, 
  Content, 
  Icon, 
  Button, 
  Text, 
  Item, 
  Input,
  Left,
  Body,
  Right } from 'native-base';

export default class InputStyleNumber extends React.Component {
  constructor() {
    super();

    this.state = {
      styleNumber: ''
    };
  }

  render() {
    return (
      <Header>
        <Left />
        <Body>
          <Item rounded>
            <Input 
              placeholder='Enter Style Number' 
              autoCapitalize={'characters'}
              maxLength={6}
              autoFocus={true}
              value={this.state.styleNumber}
              onChangeText={(text) => this.onChangeText(text)} />
          </Item>
        </Body>
        <Right />
      </Header>
    );  
  }

  onChangeText = (newText) => {
    const removedNonAlphaNumberic = newText.replace(/[^0-9a-z]/gi, '');
    this.setState({styleNumber: removedNonAlphaNumberic});
  }
}

