import React, { Component, Fragment } from 'react';

import { Divider, Button, Header, Segment, Image, Embed, Card, List, Form, Grid, Icon, Container } from 'semantic-ui-react';

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

    // sendToUpload2 = () => this.props.history.push({ pathname: '/prueba2' });

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
                        <div class="cartaJuego" >
                            <Card fluid onClick={() => this.sendToInfoGame(game.id)}>
                                <Image size='medium'
                                    src={`http://localhost:5000${game.imageUrl}`} />
                                <div class="textoCarta">
                                    <h1>{game.name}</h1>
                                    <div class="meta">
                                        <h3 class='textoCarta'>{game.author}</h3>
                                    </div>
                                    <br></br>
                                    <br></br>

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
                        <li onClick={this.sendToHome}><a href="#">Inicio</a></li>
                        <li onClick={this.sendToGames}><a href="#">Juegos </a></li>
                        <li onClick={this.sendToTops}><a href="#">Subir </a></li>
                        {/* <li onClick={this.sendToUpload2}><a href="#">Subir2 </a></li> */}

                    </ul>
                </div>
                <div id="contenido">
                    <div class="fondo">

                        {/* <Image fluid src='https://media.discordapp.net/attachments/775558235809120268/782102357193261087/BANNER_Sinfont3-01.png?width=1443&height=500' /> */}
                        <div class="banner">
                            <div class="capa"></div>
                            <div class="info">
                                <h1>Bienvenidos a Games ULSA</h1>
                                <p>Conoce y descarga los mejores juegos creados por alumnos de la universidad!</p>
                            </div>
                        </div>
                        <Divider hidden></Divider>
                        <div class="info2">
                            Juego del momento
                        </div>
                        <br /><br />

                        <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                                <div class="imagenMargenes">
                                    <div class="imagen">
                                        <Embed
                                            id='qfRm8-l95Ws'
                                            placeholder='https://media.discordapp.net/attachments/775558235809120268/783527208068972574/Menu.png?width=1194&height=671'
                                            source='youtube'
                                        />
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column verticalAlign='middle'>
                                <center>
                                    <div class="textoMargenes">
                                        <div class="texto">
                                            <center>
                                                <Image src="https://cdn.discordapp.com/attachments/775558235809120268/783824486658605056/WildDoggie.png" />
                                                <br /> <br />
                                                <span>
                                                    Wild Doggie es un juego creado por alumnos de la Universidad La Salle Noroeste correspondiente al proyecto final de la materia Estructura de Datos. Diviértete recolectando los diversos premios esparcidos por todo el mapa.
                                        </span>
                                                <br /> <br />
                                                <span>
                                                    ¡DESCÁRGALO AHORA!
                                        </span>
                                                <br /><br />
                                                <Button size="large" inverted onClick={() => window.location.href = `http://localhost:5000/Wild-doggie.zip`} >Descargar</Button>
                                                <Divider hidden />
                                            </center>


                                        </div>
                                    </div>
                                </center>
                                



                            </Grid.Column>
                        </Grid>
                        <br />
                        <br />
                        <br />
                        <br />

                        <div class="texto2">
                            <p>Aquí puedes subir tu propio videojuego para <br />añadirlo al catálogo de la ULSA y que <br />todos puedan tener acceso a él.</p>
                            <br />
                        </div>
                        <div class="boton">
                            <Button inverted size='huge' onClick={this.sendToTops}>Sube tu juego</Button>
                        </div>

                        <Divider hidden />
                        <Divider hidden />

                        <div id="contenido">
                            <div id="info3">
                                <Divider horizontal>
                                    <Header center inverted as='h1'>
                                        <Icon name='game' />
                                    Selecciona que tipos de juegos quieres ver
                                </Header>
                                </Divider>


                                <Form.Select center style={{ border: '3px solid white', backgroundColor: '#1a1a2e', color: '#ffffff' }}
                                    button
                                    options={this.state.gameGeneroList}
                                    placeholder='Genero'
                                    onChange={this.handleGenero}
                                />

                                <Divider hidden />

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
          

                <Segment inverted vertical style={{ padding: '5em 0em' }}>
                    <div class='center'>
                    <Container>
                        <Grid divided inverted stackable>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Universidad La Salle Noroeste' />
                                    <List link inverted>
                                        <List.Item href="http://www.ulsa-noroeste.edu.mx/">Sitio web</List.Item>
                                        <List.Item href="https://avirtual.lasallenoroeste.edu.mx/login/index.php">Moddle</List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header inverted as='h4' content='Redes sociales' />
                                    <div class="ui middle aligned selection list">
                                        <div class="item">
                                            <img class="ui avatar image" src="https://cdn.discordapp.com/attachments/775558235809120268/783843259217739776/facebook.icon_Mesa_de_trabajo_1.png" />
                                            <div class="content">
                                                <a class="header" href="https://www.facebook.com/UniversidadLaSalleNoroeste">Facebook</a>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <img class="ui avatar image" src="https://media.discordapp.net/attachments/775558235809120268/783843900526952458/insta.ic_Mesa_de_trabajo_1.png" />
                                            <div class="content">
                                                <div class="ref">
                                                    <a class="header" href="https://www.instagram.com/lasallenoroeste">Instagram</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="item">
                                            <img class="ui avatar image" src="https://media.discordapp.net/attachments/775558235809120268/783844310113714207/twitter_Mesa_de_trabajo_1.png" />
                                            <div class="content">
                                                <a class="header" href="https://mobile.twitter.com/lasallenoroeste" >Twitter</a>
                                            </div>
                                        </div>
                                    </div>

                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Header as='h4' inverted>
                                        Derechos reservados ©
                                    </Header>
                                    <p>
                                        Danna Aguilar <br />
                                        César Amaya <br />
                                        Marisela Delgadillo <br />
                                        Azalia Peña <br />
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                    </div>
                </Segment>



                </div>
            </Fragment>

        );
    }
}
