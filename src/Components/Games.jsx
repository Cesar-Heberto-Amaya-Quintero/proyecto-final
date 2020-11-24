import React, { Component, Fragment } from 'react';

import { Divider, Header, Menu, Image, Rating, Embed, Card, List, Grid, Button } from 'semantic-ui-react';

import { getApolloContext, gql } from '@apollo/client';

const GET_ALL_GAMES = gql`
    {
        games{
            id
            name
            author
            imageUrl
            themeColor
            description
            gameGenero {
                name
            }
  }
}
`;




export default class Games extends Component {


    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleVisibility = () =>
        this.setState((prevState) => ({ visible: !prevState.visible }))


    state = {
        games: [],
    }

    static contextType = getApolloContext();

    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_GAMES });
        this.setState({ games: response.data.games });
        console.log(response.data.games);
    }


    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToInfoGame = id => this.props.history.push({ pathname: '/infoGame', state: { gameId: id } });

    sendToTops = () => this.props.history.push({ pathname: '/top' });

    showId = id => console.log(id);

    showGames = () => {
        return this.state.games.map(game => {
            console.log(game);

            return <Fragment >

                {/* MOSTRAR TARJETAS CON LA INFO DE LOS JUEGOS */}
                <List.Item >
                    <div class="cartaJuego" >
                        <Card fluid onClick={() => this.sendToInfoGame(game.id)}>
                            <Image label={{ color: 'red', corner: 'bottom', icon: 'heart' }} size='medium'
                                src={game.imageUrl} />
                            <div class="textoCarta">
                                <h1 >{game.name}</h1>
                                    <Header inverted as="h2" textAlign="center">{game.author}</Header>
                                <div class="textoCarta">
                                    <Header inverted as="h4" textAlign="center">{game.gameGenero.name}</Header>
                                    
                                </div>
                            </div>
                            <div class="extra content">
                                <Rating defaultRating={3} maxRating={4} />
                            </div>
                        </Card>
                    </div>
                </List.Item>

                <Divider vertical hidden />

            </Fragment>


        })
    }

    render() {


        return (
            <div class='fondo'>
            <Fragment>

                {/* MENU VERTICAL A LA IZQUIERDA*/}

                <Menu style={{ backgroundColor: '#000' }} fixed='top' inverted size='large' >
                    <Menu.Item
                        name='Home' icon='home' onClick={this.sendToHome}
                    />
                    <Menu.Item
                        name='Juegos' icon='game' onClick={this.sendToGames}
                    />
                    <Menu.Item
                        name='Top trending' icon='star' onClick={this.sendToTops}
                    />
                </Menu>
            
                

                

                <Divider hidden/>

                <div class="fondo">
                    
                
                    <Divider vertical hidden></Divider>
                </div>
                <Divider hidden/>

                <div class="titulo">
                    <Header inverted>Catálogo de juegos</Header>
                </div>
                

                <Divider hidden/>
                <div class="listaJuegos">
                    <List horizontal celled >
                        {this.showGames()}
                    </List>
                </div>

                <br/>
                <br/>

                

            </Fragment>
            </div>
        );
    }
}

