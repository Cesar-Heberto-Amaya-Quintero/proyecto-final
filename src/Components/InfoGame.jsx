import React, { Component, Fragment } from 'react';
import { getApolloContext, gql } from '@apollo/client';

import { Image, Header, Divider, Container, Segment, Table, Icon, Button, List, Grid } from 'semantic-ui-react';

const GET_GAME_BY_ID = gql`
    query($id: ID!){
            game(id: $id){
                id
                name
                author
                imageUrl
                themeColor 
                description
                filePath
                gameGenero{
                    name
                }
            }
    }`

export default class InfoGame extends Component {

    state = {
        id: '',
        name: '',
        author: '',
        imageUrl: '',
        themeColor: '',
        description: '',
        filePath:'',
        gameGenero: ''
    }

    static contextType = getApolloContext();

    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToTops = () => this.props.history.push({ pathname: '/upload' });

    downloadGame = () => this.props.history.push({ pathname: `http://localhost:5000${this.state.filePath}` });

    componentDidMount = async () => {
        console.log(this.props.history.location.state.gameId);
        const { client } = this.context;
        const response = await client.query({
            query: GET_GAME_BY_ID,
            variables: {
                id: this.props.history.location.state.gameId
            }
        });
        const { id, name, author, imageUrl, description, themeColor, gameGenero, filePath } = response.data.game;
        this.setState({ id: id, name: name, author: author, imageUrl: imageUrl, themeColor: themeColor, description: description, filePath: filePath,gameGenero: gameGenero });
        console.log(response.data.game);
    }

    render() {
        console.log(this.state.filePath)
        return (
            <Fragment>
                   
                {/* CÓDIGO PARA LA PARTE DE MENU E IMAGEN*/}
                <input id="abrir-cerrar" name="abrir-cerrar" type="checkbox" value="" />
                <label for="abrir-cerrar">&#9776; <span class="abrir">Menú</span><span class="cerrar">Menú</span></label>
                <div id="sidebar" class="sidebar">
                    <ul class="menu">
                        <div class="image">
                            <Image src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                        </div>
 
                            <li onClick={this.sendToHome} name='Home' icon='home'><a href="#">Inicio</a></li>
                            <li onClick={this.sendToGames}><a href="#">Juegos</a></li>
                            <li onClick={this.sendToTops}><a href="#">Subir</a></li>
         
                    </ul>
                </div>
                <div id="contenido">

                <Table>
                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>
                                

                                    <Segment inverted color={this.state.themeColor}>
                                    <Button color={this.state.themeColor} onClick={this.sendToGames} >Volver</Button>
                                        <Divider hidden></Divider>

                                        <Image centered circular size='large' src={`http://localhost:5000${this.state.imageUrl}`} />

                                        {/*  <Header as='h3' textAlign='center'> {this.state.description} </Header>  */}
                                    </Segment>

                                </Table.HeaderCell>

                            </Table.Row>

                        </Table.Body>

                    </Table>


                    {/* CÓDIGO PARA LA PARTE DE INFORMACIÓN*/}

                    <Table >

                        <Table.Body>
                            <Table.Row>
                                <Table.HeaderCell>

                                </Table.HeaderCell>

                                <Table.HeaderCell >
                                    <Header size='huge' textAlign='center' >{this.state.name} </Header>

                                    <Container>
                                        <Divider horizontal>
                                            <Header as='h4'>
                                                <Icon name='info' />
                                                    Información adicional
                                                </Header>
                                        </Divider>

                                        <Table definition color='black' striped >
                                            <Table.Body>
                                                <Table.Row>
                                                    <Table.Cell width={2}>Nombre</Table.Cell>
                                                    <Table.Cell> {this.state.name} </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Autor</Table.Cell>
                                                    <Table.Cell> {this.state.author} </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>Género</Table.Cell>
                                                    <Table.Cell> {this.state.gameGenero.name} </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell> Descripción</Table.Cell>
                                                    <Table.Cell> {this.state.description} </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </Container>
                                </Table.HeaderCell>
                            </Table.Row>

                        </Table.Body>
                    </Table>

                    {/* <a href={`http://localhost:5000${this.state.filePath}`}>Descargar</a> */}
                    
                    
                    <Button color={this.state.themeColor} onClick={()=>window.location.href=`http://localhost:5000${this.state.filePath}`} >Descargar</Button>

                    <br/> <br/> <br/>
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

            </Fragment>
        );

    }
}