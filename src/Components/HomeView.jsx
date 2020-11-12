import React, { Component, Fragment } from 'react';

import { Divider, Header, Segment, Menu, Image, Rating, Embed, Card, List, Table, Reveal } from 'semantic-ui-react';

import { getApolloContext, gql } from '@apollo/client';

const GET_ALL_GAMES = gql`
    {
        games{
            id
            name
            author
            genero
            imageUrl
            themeColor
            description
  }
}
`;


export default class HomeView extends Component {

    state = {
        games: []
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
                    <Card style={{ backgroundColor: '#fff' }} fluid onClick={() => this.sendToInfoGame(game.id)}>
                        <Image label={{ color: 'red', corner: 'bottom', icon: 'heart' }} size='medium'
                            src={game.imageUrl} />
                        <Card.Content>
                            <Card.Header color='white' >{game.name}</Card.Header>
                            <Card.Meta>
                                <span className='date'>{game.author}</span>
                            </Card.Meta>
                            <Card.Description content textAlign='center'>
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

        return (
            <div style={{ backgroundColor: '#170132' }}>
                <Fragment>

                    {/* MENU VERTICAL A LA IZQUIERDA*/}
                    <Table style={{ backgroundColor: '#170132' }} key='black' inverted compact fixed >

                        <Table.Body>

                            <Table.Row>

                                <Table.HeaderCell style={{ backgroundColor: '#320A40' }} width='2'>
                                    <Menu style={{backgroundColor: '#000' }} vertical inverted fixed='left' size='large'   >

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
                                <Reveal animated='move' instant>
                                    <Reveal.Content visible>
                                    <Image spaced fluid src='https://cdn.discordapp.com/attachments/775558235809120268/776280317643456532/DIMEN.PLA.2.png' />
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                    <Image spaced fluid src='https://cdn.discordapp.com/attachments/775558235809120268/776281592473714708/PLAY.2.DIM.png' />
                                    </Reveal.Content>
                                </Reveal>
                                    

                                    <Table style={{ backgroundColor: '#170132' }} key='black' inverted compact textAlign='center'>
                                        <Table.Body >
                                            <Table.Row>
                                                <Table.Cell textAlign>

                                                    <Segment style={{ backgroundColor: '#170132' }} inverted textAlign='center'>
                                                        <Header style={{ backgroundColor: '#170132' }} textAlign='center' color='black' as='h2' icon='game' content='Game' />
                                                    </Segment>

                                                    <List horizontal celled >
                                                        {this.showGames()}
                                                    </List>

                                                </Table.Cell>

                                            </Table.Row>

                                        </Table.Body>
                                    </Table>
                                </Table.HeaderCell>

                            </Table.Row>

                        </Table.Body>

                    </Table>



                    {/* CONTENIDO LADO DERECHO PANTALLA */}



                    {/* <Segment inverted>
                      <Menu inverted widths='5' fixed='top' size='massive' >
                    
                    <Image size='small'  src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />

                    <Menu.Item
                        name='Home' icon='home'  onClick={this.sendToHome}
                    /> 
                    <Menu.Item
                        name='Juegos' icon='game'  onClick={this.sendToGames} 

                    />
                    
                    <Menu.Item
                        name='Top trending' icon='star'  onClick={this.sendToTops}
                    />
                    </Menu>
                    
            
                    <Divider hidden></Divider>
                     { <Embed
                    id='Yg3LhyQGSu8'
                    placeholder='https://as.com/meristation/imagenes/2020/09/04/noticias/1599237499_919231_1599237606_noticia_normal.jpg'
                    source='youtube'
                /> } 

                
                </Segment> */}

                


                </Fragment>
            </div>
        );
    }
}