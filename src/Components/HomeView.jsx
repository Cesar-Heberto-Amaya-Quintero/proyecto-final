import React, {Component, Fragment} from 'react';

import { Divider,  Header, Segment, Menu,  Image, Rating, Embed,  Card, List} from 'semantic-ui-react';

import {getApolloContext, gql} from '@apollo/client';

const GET_ALL_GAMES = gql`
    {
        games{
            id
            name
            author
            genero
            imageUrl
            description
  }
}
`;


export default class HomeView extends Component {

    state= {
        games: []
    }

    static contextType = getApolloContext(); 

    componentDidMount = async ()=>{
        const {client} = this.context;
        const response = await client.query({query: GET_ALL_GAMES});
        this.setState({games: response.data.games});
        console.log(response.data.games);
    }

    sendToHome = ()=> this.props.history.push({pathname: '/'});

    sendToGames = ()=> this.props.history.push({pathname: '/games'});

    sendToInfoGame = id => this.props.history.push({pathname: '/infoGame', state: {gameId: id}});

    sendToTops = ()=> this.props.history.push({pathname: '/top'});

    showId= id=> console.log(id);

    showGames= ()=>{
        return this.state.games.map(game=>{
            console.log(game);
                return <Fragment >

                        <List.Item >
                        <Card onClick={()=>this.sendToInfoGame(game.id)}>
                            <Image centered  label={{ as: '', color: 'red', corner: 'bottom', icon: 'heart' }} size='medium' 
                                src={game.imageUrl} />
                            <Card.Content>
                            <Card.Header>{game.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{game.author}</span>
                            </Card.Meta>
                            <Card.Description content textAlign='left'>
                                {game.genero}
                            </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <Rating defaultRating={3} maxRating={4} />
                            </Card.Content>
                        </Card>
                        </List.Item>
                    
                    <Divider vertical hidden />
                    
                </Fragment>
                
        })
    }

    render() {

        return(
            
            <Fragment>

                <Segment >
                    <Menu inverted widths='5' fixed='top'  >
                    
                    <Image size='small'  src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />

                    <Menu.Item
                        name='Home' icon='home' header as='h3'  onClick={this.sendToHome}
                    /> 
                    <Menu.Item
                        name='Juegos' icon='game' header as='h3' onClick={this.sendToGames} 

                    />
                    
                    <Menu.Item
                        name='Top trending' icon='star' header as='h3' onClick={this.sendToTops}
                    />
                    </Menu>
                    
                    <Divider></Divider>
                
                    <Header as='h2' icon='game' content='Game' />

                    
                        <List horizontal celled >
                            {this.showGames()}
                        </List>
                    

                                

                        

               
                   


                    <Divider hidden></Divider>
                    { <Embed
                    id='Yg3LhyQGSu8'
                    placeholder='https://as.com/meristation/imagenes/2020/09/04/noticias/1599237499_919231_1599237606_noticia_normal.jpg'
                    source='youtube'
                /> }

                
                </Segment>
                
                
            </Fragment>
        );
    }
}