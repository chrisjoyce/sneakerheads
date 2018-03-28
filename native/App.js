import React from 'react';
import { StyleSheet } from 'react-native';
import InputStyleNumber from './components/InputStyleNumber'
import { Container, Header, Content, Icon, Left, Right, Body, Title, Button, Item, Input } from 'native-base';

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <InputStyleNumber></InputStyleNumber>
      </Container>
    );
  }

  onPressLearnMore() {
    console.log('test');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
