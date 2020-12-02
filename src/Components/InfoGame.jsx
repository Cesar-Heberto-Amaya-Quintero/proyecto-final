import React, { Component, Fragment } from 'react';
import { getApolloContext, gql } from '@apollo/client';

import { Menu, Image, Rating, Card, Header, Divider, Container, Grid, Segment, Table, Icon, Button } from 'semantic-ui-react';

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
 
                            <li onClick={this.sendToHome} name='Home' icon='home'><a href="#">Home</a></li>
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
            </Fragment>
        );

    }
}