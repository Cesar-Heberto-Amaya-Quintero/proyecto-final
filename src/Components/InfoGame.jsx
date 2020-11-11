import React, {Component, Fragment} from 'react';
import {getApolloContext, gql} from '@apollo/client';

import { Menu,  Image, Rating, Card} from 'semantic-ui-react';

const GET_GAME_BY_ID = gql `
    query($id: ID!){
            game(id: $id){
                id
                name
                author
                genero
                imageUrl
                description
            }
    }`



export default class Games extends Component {

    state={
        id: '',
        name: '',
        author: '',
        genero: '',
        imageUrl: '',
        description: ''
    }

    static contextType = getApolloContext();

    sendToHome = ()=> this.props.history.push({pathname: '/'});

    sendToGames = ()=> this.props.history.push({pathname: '/games'});

    sendToTops = ()=> this.props.history.push({pathname: '/top'});

    componentDidMount = async ()=> {
        console.log(this.props.history.location.state.gameId);
        const {client} = this.context;
        const response =await client.query({
            query: GET_GAME_BY_ID,
            variables: {
                id: this.props.history.location.state.gameId
            }
        });
        const {id, name, author, genero, imageUrl,description}= response.data.game;
        this.setState({ id: id, name:name, author: author, genero:genero, imageUrl: imageUrl, description:description});
        console.log(response.data.game);
    }

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

                        <Card>
                            <Image centered  label={{ as: '', color: 'red', corner: 'bottom', icon: 'heart' }} size='medium' 
                                src={this.state.imageUrl} />
                            <Card.Content>
                            <Card.Header>{this.state.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{this.state.author}</span>
                            </Card.Meta>
                            <Card.Description content textAlign='left'>
                                {this.state.genero}
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Rating defaultRating={3} maxRating={4} />
                            </Card.Content>
                        </Card>
            </Fragment>
        );

    }
}