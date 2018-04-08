import React from 'react';
import { StyleSheet, Text, View, WebView } from 'react-native';

const EBAY_COMPLETED_UTEMS = 'https://svcs.ebay.com/services/search/FindingService/v1';
const TEST_URL = `http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=ChrisJoy-SneakzTe-PRD-75d7a0307-9e5bbb0c&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=NIKE%20Chuck%20Posite%20684758`;

export default class SearchEBay extends React.Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    items: []
  };

  componentWillReceiveProps(props) {
    // this.setState({searchURL: props.searchURL});
  }

  fetchCompletedItems = async () => {
    try {
      let response = await fetch(TEST_URL);
      return response;
      // let responseJSON = await response.json();
      // this.setState({items: response}, () => {
      //   console.log("WHAT");
      //   console.log(this.state);
      // });
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    console.log('did mount')
    let resp = await this.fetchCompletedItems();
    let respJSON = await resp.json();
    let items = respJSON.findItemsByKeywordsResponse[0].searchResult[0].item;
    
    
    console.log(items.length);

    // return fetch(TEST_URL)
    //   .then((response) => response.json())
    //   .then((respJSON) => {
    //     this.setState({items: respJSON});
    //   });
  }

  render() {
    return (
      <View style={searchEBayStyle.searchView}>
        {/* <WebView source={{uri: this.state.searchURL || 'https://www.google.com'}} /> */}
      </View>
    );
  }
}

const searchEBayStyle = StyleSheet.create({
  searchView: {
    flex: 1,
  }
});