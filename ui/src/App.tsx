import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchForShoe from './SearchForShoe/SearchForShoe';
import {ApolloClient, ApolloClientOptions} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

interface IState {}
interface IProps {}

class App extends React.Component<IProps, IState> {

  client: ApolloClient<NormalizedCacheObject>;
  showResults: boolean = false;

  constructor(props: IProps) {
    super(props);

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: createHttpLink({
        uri: ''
      })
    });
  }

  submitSearch = () => {
    this.showResults = !this.showResults;
    console.log(this.showResults);
  }
  
  render() {
    const showResults = this.showResults;
    return (
      <ApolloProvider client={this.client}>
        <div className="app-wrapper">
          <div className="search-input">
            <SearchForShoe />
            <button onClick={this.submitSearch}>Test</button>
          </div>
          <div className="search-results">
            Hi.
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
