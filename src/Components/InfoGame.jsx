import React, { Component, Fragment } from 'react';
import { getApolloContext, gql } from '@apollo/client';

import { Menu, Image, Rating, Card, Header, Divider, Container, Grid, Segment, Table, Icon } from 'semantic-ui-react';

const GET_GAME_BY_ID = gql`
    query($id: ID!){
            game(id: $id){
                id
                name
                author
                imageUrl
                themeColor 
                description
                gameGenero{
                    name
                }
            }
    }`




export default class Games extends Component {

    state = {
        id: '',
        name: '',
        author: '',
        imageUrl: '',
        themeColor: '',
        description: '',
        gameGenero: ''
    }

    static contextType = getApolloContext();

    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToTops = () => this.props.history.push({ pathname: '/top' });

    componentDidMount = async () => {
        console.log(this.props.history.location.state.gameId);
        const { client } = this.context;
        const response = await client.query({
            query: GET_GAME_BY_ID,
            variables: {
                id: this.props.history.location.state.gameId
            }
        });
        const { id, name, author, imageUrl, description, themeColor, gameGenero } = response.data.game;
        this.setState({ id: id, name: name, author: author, imageUrl: imageUrl, themeColor: themeColor, description: description, gameGenero: gameGenero });
        console.log(response.data.game);
    }

    render() {

        return (
            <Fragment>

                {/* CÓDIGO PARA LA PARTE DE MENU E IMAGEN*/}

                <Table color='black' key='black' inverted compact fixed>
                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell width='2'>
                                <Menu vertical inverted style={{ backgroundColor: '#000' }} pointing fixed='left' size='large'  >
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
                            </Table.HeaderCell>
                            <Table.HeaderCell>

                                <Segment inverted color={this.state.themeColor}>

                                    <Divider hidden></Divider>

                                    <Image centered circular size='large' src={this.state.imageUrl} />

                                    {/*  <Header as='h3' textAlign='center'> {this.state.description} </Header>  */}
                                </Segment>

                            </Table.HeaderCell>

                        </Table.Row>

                    </Table.Body>

                </Table>


                {/* CÓDIGO PARA LA PARTE DE INFORMACIÓN*/}

                <Table compact fixed >

                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell width='2'>

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


            </Fragment>
        );

    }
}