import React, { Component, Fragment } from 'react';

import { Divider, Header, Menu, Image, Rating, Embed, Card, List, Grid, Button, Icon } from 'semantic-ui-react';

import { getApolloContext, gql } from '@apollo/client';



const GET_ALL_GAMES = gql`
    {
        games{
            id
            name
            author
            imageUrl
            themeColor
            imageUrl
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

    sendToTops = () => this.props.history.push({ pathname: '/upload' });

    showId = id => console.log(id);

    showGames = () => {
        return this.state.games.map(game => {
            console.log(game);

            return <Fragment >

                {/* MOSTRAR TARJETAS CON LA INFO DE LOS JUEGOS */}

                <List.Item >
                    <div class="cartaJuego" >
                        <Card fluid onClick={() => this.sendToInfoGame(game.id)}>
                            <Image size='medium'
                                src={`http://localhost:5000${game.imageUrl}`} />
                            <div class="textoCarta">
                                <h1 >{game.name}</h1>
                                <Header inverted as="h2" textAlign="center">{game.author}</Header>
                                <div class="textoCarta">
                                    <Header inverted as="h4" textAlign="center">{game.gameGenero.name}</Header>

                                </div>
                            </div>
                            <div class="extra content">
                                
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

                    <input id="abrir-cerrar" name="abrir-cerrar" type="checkbox" value="" />
                    <label for="abrir-cerrar">&#9776; <span class="abrir">Menú</span><span class="cerrar">Menú</span></label>
                    <div id="sidebar" class="sidebar">
                        <ul class="menu">
                            <div class="image">
                                <Image src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                            </div>
                 
                                <li onClick={this.sendToHome} name='Home' icon='home'><a href="#">Home</a></li>
                                <li onClick={this.sendToGames}><a href="#">Juegos</a></li>
                                <li onClick={this.sendToTops}><a href="#">Subir</a></li>
                    
                        </ul>
                    </div>
                    <div id="contenido">
                        <Divider hidden />
                        <div class="fondo">
                            <Divider vertical hidden></Divider>
                        </div>
                        <Divider hidden />
                        <div class="titulo">
                            <Header inverted>Catálogo de juegos</Header>
                        </div>
                        <Divider hidden />
                        <div class="listaJuegos">
                            <List horizontal celled >
                                {this.showGames()}
                            </List>
                        </div>
                        <br />
                        <br />
                    </div>
                </Fragment>
            </div>
        );
    }
}

