import React, { Component, Fragment } from 'react';

import { Divider, Button, Header, Segment, Menu, Image, Rating, Embed, Card, List, Table, Reveal, Form, Grid, Transition, Icon, Dropdown } from 'semantic-ui-react';

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

export default class HomeView extends Component {

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
        console.log(this.state.games);
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

    sendToTops = () => this.props.history.push({ pathname: '/upload' });

    showGames = () => {
        if (this.state.games == "") {
            console.log("No hay nada");
            return <Fragment>
                <Divider hidden></Divider>
                <Header inverted as='h1'>
                    No hay juegos para mostrar
                        </Header>
                <Divider hidden></Divider>
            </Fragment>

        }
        else {
            console.log("Si hay objetos");
            return this.state.games.map(game => {
                console.log(game);

                return <Fragment >

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
    }

    render() {

        return (

            <Fragment>

                {/* MENU VERTICAL A LA IZQUIERDA*/}
                <input id="abrir-cerrar" name="abrir-cerrar" type="checkbox" value="" />
                <label for="abrir-cerrar">&#9776; <span class="abrir">Menú</span><span class="cerrar">Menú</span></label>
                <div id="sidebar" class="sidebar">
                    <ul class="menu">
                        <div class="image">
                            <Image src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                        </div>
                        <div class="icon">
                            <li onClick={this.sendToHome} name='Home' icon='home'><a href="#">Home</a></li>
                            <li onClick={this.sendToGames}><a href="#">Juegos</a></li>
                            <li onClick={this.sendToTops}><a href="#">Subir</a></li>
                        </div>
                    </ul>
                </div>
                <div id="contenido">
                    <div class="fondo">

                        <Image fluid src='https://media.discordapp.net/attachments/775558235809120268/776281592473714708/PLAY.2.DIM.png' />

                        <Divider hidden></Divider>

                        <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                                <div class="imagenMargenes">
                                    <div class="imagen">
                                        <Embed
                                            id='UAO2urG23S4'
                                            placeholder='https://as01.epimg.net/meristation/imagenes/2018/09/11/header_image/723533421536694195.png'
                                            source='youtube'
                                        />
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column verticalAlign='middle'>
                                <div class="textoMargenes">
                                    <div class="texto">
                                        <span>
                                            El modo de juego de Hollow Knight se enfoca principalmente en exploración, plataformas y combate.
                                            Los jugadores exploran un gran mundo interconectado usando una variedad de movimientos y técnicas de combate.
                                            Al clásico estilo metroidvania, existen áreas del mundo a las que los jugadores no pueden acceder hasta que hayan obtenido algún objeto o habilidad particular.
                                            Los mapas de cada zona deben comprarse a un cartógrafo que generalmente se encuentra escondido en esa área, y el jugador también puede comprar mejoras que permiten colocar marcadores en el mapa,
                                            o revelar partes del mismo a medida que van explorando. El guardado del juego sólo puede hacerse en los bancos para descansar que se encuentran esparcidos por todo el reino.
                                            Al sentarse en un banco, el mapa se actualizará con las zonas recientemente descubiertas por el Caballero, a su vez que regenera su salud en caso que la haya perdido.
                                        </span>
                                    </div>

                                </div>
                                <Divider hidden />
                                <div class="boton">
                                    <Button inverted size='huge' onClick={this.sendToTops}>Sube tu juego</Button>
                                </div>

                            </Grid.Column>
                        </Grid>

                        <Divider hidden />
                        <Divider hidden />

                        <div id="contenido">

                            <Divider horizontal>
                                <Header inverted as='h1'>
                                    <Icon name='game' />
                                    Selecciona que tipos de juegos quieres ver
                                </Header>
                            </Divider>


                            <Form.Select style={{ border: '3px solid white', backgroundColor: '#0D021A', color: '#ffffff' }}
                                button
                                options={this.state.gameGeneroList}
                                placeholder='Genero'
                                onChange={this.handleGenero}
                            />



                            <List horizontal celled >
                                {this.showGames()}
                            </List>



                            <div class="boton">
                                <Button onClick={this.sendToGames} inverted size='huge'>Ver todos los juegos</Button>
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>

        );
    }
}
