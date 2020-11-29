import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import Routes from './Components/Routes';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

export default class App extends Component{
  render() {
    return(
      <ApolloProvider client={client} >
              <Routes />
      </ApolloProvider>        

    );
  }
}
