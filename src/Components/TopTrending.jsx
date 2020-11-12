import React, { Component, Fragment } from 'react';
import {getApolloContext, gql} from '@apollo/client';
import { Button, Header, Icon, Segment, Menu, Image, Sidebar, Form, Checkbox, Divider, Select, Dropdown,Table, List } from 'semantic-ui-react'

 const ADD_GAME =gql`
    mutation($name: String!, $author: String!, $genero: String!, $themeColor: String! ,$description: String!)
    {
        addGame(name:$name, author:$author, genero: $genero,themeColor: $themeColor,description:$description)
    {
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
    { key: 'av', text: 'Aventura', value: 'aventura'},
    { key: 'dis', text: 'Disparos', value: 'disparos' },
    { key: 'ed', text: 'Educativos', value: 'educativos' },
    { key: 'es', text: 'Estrategia', value: 'estrategia' },
    { key: 'sh', text: 'Survival horror', value: 'survivalhorror' },
    { key: 'pl', text: 'Plataformas', value: 'plataformas' },
    { key: 'ro', text: 'Rol', value: 'rol' },
    { key: 'mu', text: 'Musicales', value: 'musicales' },
    { key: 'pa', text: 'Party games', value: 'partygames' },
    { key: 'si', text: 'Simulación', value: 'simulacion' },
    { key: 'ca', text: 'Carreras', value: 'carreras' },
    { key: 'o', text: 'Otro', value: 'Otro' },
]

const colorOptions = [
    {
        key: 'black',
        text: 'Negro',
        value: 'black',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776291522282651655/black.png' },
    },
    {
        key: 'blue',
        text: 'Azul',
        value: 'blue',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776291478087532574/blue.png' },
    },
    {
        key: 'brown',
        text: 'Café',
        value: 'brown',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290979824533534/brown.png' },
    },
    {
        key: 'green',
        text: 'Verde',
        value: 'green',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290989060128778/green.png' },
    },
    {
        key: 'gray',
        text: 'Gris',
        value: 'gray',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290988398084106/gray.png' },
    },
    {
        key: 'olive',
        text: 'Olivo',
        value: 'olive',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290989974618112/olive.png' },
    },
    {
        key: 'orange',
        text: 'Naranja',
        value: 'orange',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290991278915624/orange.png' },
    },
    {
        key: 'pink',
        text: 'Rosa',
        value: 'pink',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290992676274186/pink.png' },
    },
    {
        key: 'purple',
        text: 'Morado',
        value: 'purple',
        image: { avatar: true, src: 'https://media.discordapp.net/attachments/775967079496941598/776290994110070794/purple.png' },
    },
    {
        key: 'red',
        text: 'Rojo',
        value: 'red',
        image: { avatar: true, src: 'https://cdn.discordapp.com/attachments/775967079496941598/776290995297189898/red.png' },
    },
    {
        key: 'turquoise',
        text: 'Turquesa',
        value: 'turquoise',
        image: { avatar: true, src: 'https://cdn.discordapp.com/attachments/775967079496941598/776290996919992351/turquoise.png' },
    },
    {
        key: 'violet',
        text: 'Violeta',
        value: 'violet',
        image: { avatar: true, src: 'https://cdn.discordapp.com/attachments/775967079496941598/776290998090858506/violet.png' },
    },
    {
        key: 'yellow',
        text: 'Amarillo',
        value: 'yellow',
        image: { avatar: true, src: 'https://cdn.discordapp.com/attachments/775967079496941598/776291393562738738/yellow.png' },
    }
]

export default class Games extends Component {

    state = {
        fieldName: '',
        fieldAuthor: '',
        fieldDescription:'',
        fieldGenero: '',
        fieldThemeColor: '',
    }

    static contextType = getApolloContext(); 

    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToTops = () => this.props.history.push({ pathname: '/top' });

    handleChange = (e, { value }) => this.setState({ value });

    handleName = e => this.setState({fieldName: e.target.value});
    handleAuthor = e=> this.setState ({fieldAuthor: e.target.value});
    handleDescription = e=> this.setState({fieldDescription: e.target.value});
    handleGenero = (e, {value}) => this.setState({fieldGenero: value});
    handleThemeColor = (e, {value}) =>this.setState({fieldThemeColor: value});

    /*findSelectGenero () { const genero = document.getElementById("selectGenero")
    console.log(genero.value);
};*/

    saveGame =()=>{
        const {fieldName, fieldAuthor,fieldGenero, fieldThemeColor ,fieldDescription} = this.state;
        const {client} = this.context;

        client.mutate({
            mutation: ADD_GAME,
            variables: {
                name: fieldName,
                author: fieldName,
                genero: fieldGenero,
                themeColor: fieldThemeColor,
                description: fieldDescription
            }
        }).then(res=> console.log(res))
        .catch(error => console.log(error));
        console.log(client);
        console.log({name: fieldName, author: fieldAuthor, genero:fieldGenero, themeColor: fieldThemeColor, description: fieldDescription});
    }

    render() {

        const { value } = this.state

        return (
            <div style={{ backgroundColor: '#320A40' }}>
                <Fragment>

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
                                <div style={{ backgroundColor: '#320A40' }}>
                                    <Segment style={{ backgroundColor: '#320A40' }} vertical raised>

                                        <Divider></Divider>

                                        <Segment style={{ backgroundColor: '#320A40' }}>
                                            <div>
                                                <Header inverted as='h1' textAlign='center'>Sube un juego</Header>
                                            </div>
                                            <Form inverted>
                                                <Form.Group widths='equal'>
                                                    <Form.Input fluid label='Nombre' placeholder='Nombre' onChange={this.handleName} />
                                                    <Form.Input fluid label='Autor' placeholder='Autor' onChange={this.handleAuthor} />
                                                    <Form.Select
                                                        id='selectGenero'
                                                        fluid
                                                        label='Género'
                                                        options={generoOptions}
                                                        placeholder='Genero'
                                                        onChange={this.handleGenero}
                                                    />
                                                </Form.Group>
                                                
                                                <Form.TextArea width='9' label='Descripción' placeholder='Cuentanos sobre tu juego...' onChange={this.handleDescription} />
                                                <Form.Group>
                                                    
                                                    <Dropdown floating
                                                        placeholder='Selecciona un color'
                                                        
                                                        selection
                                                        options={colorOptions}
                                                        onChange={this.handleThemeColor}
                                                    />
                                                </Form.Group>
                                            </Form>
                                        </Segment>

                                        <Segment placeholder >

                                            <Header icon>
                                                <Icon name='pdf file outline' />
                                                No documents are listed for this customer.
                                                </Header>
                                            <Button primary onClick={this.findSelectGenero}>Add Document</Button>

                                        </Segment>
                                        <Form.Button primary onClick={()=>this.saveGame()}>Publicar</Form.Button>
                                    </Segment>
                                </div>
                                
                            </Table.HeaderCell>

                        </Table.Row>

                    </Table.Body>

                    </Table>
                    
                </Fragment>
            </div>
        );
    }
}
