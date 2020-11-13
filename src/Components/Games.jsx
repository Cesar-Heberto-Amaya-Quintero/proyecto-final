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

const generoOptions = [
    {  text: 'Aventura', value: 'Aventura'},
    {  text: 'Disparos', value: 'Disparos' },
    {  text: 'Educativos', value: 'Educativos' },
    {  text: 'Estrategia', value: 'Estrategia' },
    {  text: 'Survival horror', value: 'Survivalhorror' },
    {  text: 'Plataformas', value: 'Plataforma' },
    {  text: 'Rol', value: 'Rol' },
    {  text: 'Musicales', value: 'Musicales' },
    {  text: 'Party games', value: 'Partygames' },
    {  text: 'Simulación', value: 'Simulacion' },
    {  text: 'Carreras', value: 'Carreras' },
    {  text: 'Otro', value: 'Otro' },
]





export default class HomeView extends Component {


    state = {
        games: [],
        id: '',
        name: '',
        author: '',
        genero: '',
        imageUrl: '',
        themeColor:'',
        description: ''
    }

    static contextType = getApolloContext();

    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_GAMES });
        this.setState({ games: response.data.games });
        console.log(response.data.games);
    }

    handleGenero = (e, {value}) =>{
        console.log(value);
        this.state.games.map(game=>{
            if (game.genero === value)
            {
                
                this.state.name=game.name;
                this.state.author=game.author;
                this.state.genero=game.genero;
                this.state.themeColor=game.themeColor;
                this.state.imageUrl=game.imageUrl;
                this.state.description=game.description;
                {this.showGames()}
                console.log(this.state.name, this.state.author, this.state.genero, this.state.themeColor, this.state.imageUrl, this.state.description);
            }
            
        })
        
        //const group = this.state.games.genero.find(group =>group.genero === value);
        //this.setState({games: group.games});
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



                                    <Table style={{ backgroundColor: '#170132' }} key='black' inverted compact textAlign='center'>
                                        <Table.Body >
                                            <Table.Row>
                                                <Table.Cell textAlign>

                                                <Form.Select
                                                        id='selectGenero'
                                                        options={generoOptions}
                                                        placeholder='Genero'
                                                        onChange={this.handleGenero}
                                                    />

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






                </Fragment>
    
        );
    }
}