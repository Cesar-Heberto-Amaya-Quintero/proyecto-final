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





export default class HomeView extends Component {


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
            
                <Image fluid src='https://cdn.discordapp.com/attachments/775558235809120268/776280317643456532/DIMEN.PLA.2.png' />

                

                <Divider hidden/>

                <div class="fondo">
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
                        <Divider hidden/>
                        <div class="boton">
                            <Button inverted size='huge'>Sube tu juego</Button>
                        </div>
                        
                    </Grid.Column>
                    </Grid>
                
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

                <div class="boton">
                    <Button onClick={this.sendToGames} inverted size='huge'>Ver más juegos</Button>
                </div>

                <Divider hidden/>

                

            </Fragment>
            </div>
        );
    }
}