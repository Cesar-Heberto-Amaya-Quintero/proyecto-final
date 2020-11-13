import React, { Component, Fragment } from 'react';

import { Divider, Button, Header, Segment, Menu, Image, Rating, Embed, Card, List, Table, Reveal, Form, Grid, Transition, Icon } from 'semantic-ui-react';

import { getApolloContext, gql } from '@apollo/client';


const GET_ALL_GAME_GENEROS = gql`
    {
        gameGeneros{
            id
            name
            games {
                id
                name
                author
                imageUrl
                themeColor
                description
            }
        }
    }
`;


export default class Games extends Component {

    state = {
        gameGeneros: [],
        gameGeneroList: [],
        games: [],
    }

    static contextType = getApolloContext();

    handleGenero = (e, { value }) => {
        console.log(value);
        const genero = this.state.gameGeneros.find(genero => genero.id === value);
        this.setState({ games: genero.games });
        console.log(genero.games);
        //console.log(this.state.games)
    }

    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_GAME_GENEROS });
        this.setState({
            gameGeneros: response.data.gameGeneros,
            gameGeneroList: response.data.gameGeneros.map(gameGenero => {
                return { key: gameGenero.id, value: gameGenero.id, text: gameGenero.name }
            })
        });
    }

    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToInfoGame = id => this.props.history.push({ pathname: '/infoGame', state: { gameId: id } });

    sendToTops = () => this.props.history.push({ pathname: '/top' });

    showGames = () => {
        return this.state.games.map(game => {
            console.log(game);

            return <Fragment style={{ backgroundColor: '#00293C' }}>

                {/* MOSTRAR TARJETAS CON LA INFO DE LOS JUEGOS */}



                <List.Item >
                    <div class="ui cards" >
                        <Card fluid onClick={() => this.sendToInfoGame(game.id)}>
                            <Image label={{ color: 'red', corner: 'bottom', icon: 'heart' }} size='medium'
                                src={game.imageUrl} />
                            <div class="content">
                                <a class="header">{game.name}</a>
                                <div class="meta">
                                    <span class='date'>{game.author}</span>
                                </div>
                                <div class="description">
                                    {game.description}
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

            <Fragment>

                {/* MENU VERTICAL A LA IZQUIERDA*/}
                <input id="abrir-cerrar" name="abrir-cerrar" type="checkbox" value="" />
                <label for="abrir-cerrar">
                    &#9776; <span class="abrir">Menú</span><span class="cerrar">Menú</span></label>
                <div id="sidebar" class="sidebar">
                    <ul class="menu">
                        <div class="image">
                            <Image src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                        </div>
                        <div class="icon">
                        <Icon name="home" size="large" inverted/><li onClick={this.sendToHome} name='Home' icon='home'><a href="#">Home</a></li>
                        <Icon name="game" size="large" inverted/><li onClick={this.sendToGames}><a href="#">Juegos</a></li>
                        <Icon name="star" size="large" inverted/><li onClick={this.sendToTops}><a href="#">Top trending</a></li>
                        </div>
                    </ul>
                </div>

                <Divider></Divider>

                <div id="contenido">
                    <Form.Select

                        options={this.state.gameGeneroList}
                        placeholder='Genero'
                        onChange={this.handleGenero}
                    />
                    <Segment style={{ backgroundColor: '#170132' }} >
                        <Header style={{ backgroundColor: '#170132' }} textAlign='center' inverted as='h2' icon='game' content='Game' />
                        <List horizontal celled >
                            {this.showGames()}
                        </List>
                    </Segment>
                </div>
            </Fragment>

        );
    }
}

