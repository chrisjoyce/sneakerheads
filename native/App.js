import React from 'react';
import { StyleSheet, Platform, View, SafeAreaView, WebView } from 'react-native'; 
import InputStyleNumber from './components/InputStyleNumber'
import SearchEBay from './components/SearchEBay';

// apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjfnb7mq32i5l0189nd973xao'
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default class App extends React.Component {
    
  state = {
    styleNumber: 0
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <SafeAreaView style={styles.safeareastyle}>

          <View style={styles.inputPanel}>
            <InputStyleNumber 
              styleNumber={this.state.styleNumber}
              onStyleNumberInputed={this.onStyleNumberChanged} />
          </View>
          <View style={styles.infoPanels}>
            <SearchEBay
              searchURL={this.state.searchURL} />
          </View>

        </SafeAreaView>
      </ApolloProvider>
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
  inputPanel: {},
  infoPanels: {},

  safeareastyle: {
    flex: 1,
    display: 'flex',
    paddingTop: (Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight),
    flexDirection: 'column'
  }
});
