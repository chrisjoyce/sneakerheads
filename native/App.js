import React from 'react';
import { StyleSheet, Platform, View, SafeAreaView, WebView } from 'react-native'; 
import InputStyleNumber from './components/InputStyleNumber'
import SearchEBay from './components/SearchEBay';

export default class App extends React.Component {

  // async componentWillMount() {
  //   await Expo.Font.loadAsync({
  //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
  //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  //   });
  // }
  
  state = {
    styleNumber: 0
  };

  render() {
    return (
      <SafeAreaView style={styles.safeareastyle}>
        <View style={{borderWidth: 1}}>
          <InputStyleNumber 
            styleNumber={this.state.styleNumber}
            onStyleNumberInputed={this.onStyleNumberChanged} />
        </View>
        <SearchEBay
          searchURL={this.state.searchURL} />
      </SafeAreaView>
    );
  }

  onStyleNumberChanged = (styleNumber) => {
    console.log(`[Searching .... ${styleNumber}]`);
    this.setState({searchURL: `https://www.google.com/search?q=${styleNumber}`});
  };

  onPressLearnMore() {
    console.log('test');
  }
}

const styles = StyleSheet.create({
  safeareastyle: {
    flex: 1,
    paddingTop: (Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight),
    flexDirection: 'column'
  },
  viewmain: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});
