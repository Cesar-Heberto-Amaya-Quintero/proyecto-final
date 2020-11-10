import React, {Component, Fragment} from 'react';
import { Button, Header, Icon, Segment, Menu} from 'semantic-ui-react'

export default class Games extends Component {

    sendToHome = ()=> this.props.history.push({pathname: '/home'});

    sendToGames = ()=> this.props.history.push({pathname: '/games'});

    sendToTops = ()=> this.props.history.push({pathname: '/top'});
    render(){
       

        return(
            <Fragment>
               <Menu inverted widths='five' pointing  floated= 'right'>
                        
                        <Menu.Item
                            name='Home' icon='home' header as='h3' onClick={this.sendToHome}
    
                        />
                        <Menu.Item
                            name='Juegos' icon='game' header as='h3' onClick={this.sendToGames}
                            
    
                        />
                        <Menu.Item
                            name='Top trending' icon='star' header as='h3' onClick={this.sendToTops}
                        />
                        </Menu>
            </Fragment>
        );

    }
}