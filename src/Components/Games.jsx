import React, {Component, Fragment} from 'react';
import { Button, Header, Icon, Segment, Menu , Image} from 'semantic-ui-react'

export default class Games extends Component {
    sendToHome = ()=> this.props.history.push({pathname: '/'});

    sendToGames = ()=> this.props.history.push({pathname: '/games'});

    sendToTops = ()=> this.props.history.push({pathname: '/top'});

    render(){
        return(
            <Fragment>
                <Segment vertical raised >
                <Menu vertical inverted  pointing fixed='left' size='large'>

                        <Image size='medium' src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                        
                        <Menu.Item
                            name='Home' icon='home'  onClick={this.sendToHome} 
    
                        />

                        <Menu.Item
                            name='Juegos' icon='game'  onClick={this.sendToGames}
                            
    
                        />
                        <Menu.Item
                            name='Top trending' icon='star' onClick={this.sendToTops}
                        />
                    </Menu>
                </Segment>
                    
                <Segment placeholder >
                    
                    <Header icon>
                    <Icon name='pdf file outline' />
                    No documents are listed for this customer.
                    </Header>
                    <Button primary>Add Document</Button>
                    
                </Segment>
                
            </Fragment>
        );

    }
}