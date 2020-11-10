import React, {Component} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import {Container} from 'semantic-ui-react';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';


import Routes from './Components/Routes';


export default class App extends Component{
  render() {
    return(
              <Routes />

    );
  }
}
