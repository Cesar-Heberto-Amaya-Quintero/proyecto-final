import React, { Component, Fragment } from 'react';

import { Divider, Header, Segment, Menu, Image, Rating, Embed, Card, List, Table, Reveal, Form, Grid, Transition } from 'semantic-ui-react';

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

const transitions = [
    'browse'
]




export default class HomeView extends Component {
    state = { animation: transitions[0], duration: 500, visible: true }

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
                                    {game.genero}
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
        const { animation, duration, visible } = this.state;
        let bannerImage = 'https://cdn.discordapp.com/attachments/775558235809120268/776280317643456532/DIMEN.PLA.2.png';

        return (
           
                <Fragment>

                    {/* MENU VERTICAL A LA IZQUIERDA*/}
                    <Table style={{ backgroundColor: '#170132' }} key='black' inverted compact fixed >

                        <Table.Body>

                            <Table.Row>

                                <Table.HeaderCell style={{ backgroundColor: '#320A40' }} width='2'>
                                    <Menu style={{ backgroundColor: '#000' }} vertical inverted fixed='left' size='large'   >

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


                                <Table.HeaderCell textAlign='center'>
                                    <div class="banner">

                                            <Image fluid src='https://cdn.discordapp.com/attachments/775558235809120268/776280317643456532/DIMEN.PLA.2.png' />

                                    </div>
                                    <Table style={{ backgroundColor: '#170132' }} key='black' inverted compact>
                                        <Table.Body >
                                            <Table.Row>
                                                <Table.Cell textAlign>

                                                    <Segment style={{ backgroundColor: '#170132' }} >
                                                    <div class='header'color='white' as='h2' icon='game' content='Game' />
                                                       
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
    
        );
    }
}