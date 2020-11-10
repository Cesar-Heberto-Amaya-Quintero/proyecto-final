import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeView from './HomeView';
import Games from './Games';
import TopTrending from './TopTrending'

export default class Routes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/games' component={Games}/> 
                    <Route path='/top' component={TopTrending}/> 
                    <Route path='/' component={HomeView}/>
                </Switch>
            </BrowserRouter>
        );
    }
}