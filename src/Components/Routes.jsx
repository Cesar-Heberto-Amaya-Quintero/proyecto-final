import React, {Component} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomeView from './HomeView';
import Games from './Games';
import UploadFiles from './UploadFiles';
import InfoGame from './InfoGame';
import pruebaFiles from './pruebaFiles';
import pruebaFiles2 from './pruebaFiles2';

export default class Routes extends Component{

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/games' component={Games}/> 
                    <Route path='/upload' component={UploadFiles}/> 
                    <Route path='/infoGame' component={InfoGame}/>
                    <Route path='/prueba' component={pruebaFiles}/>
                    <Route path='/prueba2' component={pruebaFiles2}/>
                    <Route path='/' component={HomeView}/>
                    
                </Switch>
            </BrowserRouter>
        );
    }
}