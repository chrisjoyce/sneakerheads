import React from 'react';
import { StyleSheet, WebView, Platform } from 'react-native';
import InputStyleNumber from './components/InputStyleNumber'
import { Container } from 'native-base';

export default class App extends React.Component {
  state = {
    styleNumber: 0
  };

  render() {
    return (
      <Container style={{paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
        <InputStyleNumber 
          styleNumber={this.state.styleNumber}
          onStyleNumberInputed={this.onStyleNumberChanged}></InputStyleNumber>
        
        <WebView
          source={{uri: this.state.searchURL}}
          style={{marginTop: 20}}
        />
      </Container>
    );
  }

  onStyleNumberChanged = (styleNumber) => {
    this.setState({searchURL: `https://www.google.com/search?q=${styleNumber}`});
  };

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
