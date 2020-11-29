import React, { Component, Fragment } from 'react';
import { getApolloContext, gql } from '@apollo/client';
import { Button, Header, Icon, Segment, Menu, Image, Sidebar, Form, Checkbox, Divider, Select, Dropdown, Table, List } from 'semantic-ui-react'

const ADD_GAME = gql`
    mutation($name: String!, $author: String!, $themeColor: String! ,$description: String!, $gameGeneroId: ID!)
    {
        addGame(name:$name, author:$author,themeColor: $themeColor,description:$description, gameGeneroId: $gameGeneroId)
    {
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
    }
`;

const GET_ALL_GAME_GENEROS = gql`
    {
        gameGeneros{
            id
            name
        }
    }
`


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

export default class TopTrending extends Component {

    state = {
        gameGeneroList: [],
        fieldName: '',
        fieldAuthor: '',
        fieldDescription: '',
        fieldThemeColor: '',
        fieldGameGenero: '',
    }

    static contextType = getApolloContext();

    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToTops = () => this.props.history.push({ pathname: '/upload' });

    //handleGameGenero = (e, { value }) => this.setState({ fieldGameGenero: value });

    handleName = e => this.setState({ fieldName: e.target.value });
    handleAuthor = e => this.setState({ fieldAuthor: e.target.value });
    handleDescription = e => this.setState({ fieldDescription: e.target.value });
    handleGenero = (e, { value }) => this.setState({ fieldGameGenero: value });
    handleThemeColor = (e, { value }) => this.setState({ fieldThemeColor: value });

    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_GAME_GENEROS });
        this.setState({
            gameGeneroList: response.data.gameGeneros.map(item => {
                return { key: item.id, text: item.name, value: item.id };
            })
        })
    }

    saveGame = () => {
        const { fieldName, fieldAuthor, fieldThemeColor, fieldDescription, fieldGameGenero } = this.state;
        const { client } = this.context;

        client.mutate({
            mutation: ADD_GAME,
            variables: {
                name: fieldName,
                author: fieldAuthor,
                themeColor: fieldThemeColor,
                description: fieldDescription,
                gameGeneroId: fieldGameGenero
            }
        }).then(res => console.log(res))
            .catch(error => console.log(error));
        console.log(client);
        console.log({ name: fieldName, author: fieldAuthor, themeColor: fieldThemeColor, description: fieldDescription, gameGeneroId: fieldGameGenero });
    }

    render() {

        const { value } = this.state

        return (

            <div class="body">
                <Fragment>
                    <input id="abrir-cerrar" name="abrir-cerrar" type="checkbox" value="" />
                    <label for="abrir-cerrar">&#9776; <span class="abrir">Menú</span><span class="cerrar">Menú</span></label>
                    <div id="sidebar" class="sidebar">
                        <ul class="menu">
                            <div class="image">
                                <Image src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                            </div>
                            <div class="icon">
                                <Icon name='home'/><li onClick={this.sendToHome}><a href="#">Home</a></li>
                                <li onClick={this.sendToGames}><a href="#">Juegos</a></li>
                                <li onClick={this.sendToTops}><a href="#">Top trending ❥</a></li>
                            </div>
                        </ul>
                    </div>
                    <div id="contenido">
                        <div class="fondo">

                            <Segment style={{ backgroundColor: '#1a1a2e' }}>
                                <div>
                                    <Header inverted as='h1' textAlign='center'>Sube un juego</Header>
                                </div>
                                <div class="fondo">
                                    <Form inverted style={{ backgroundColor: '#1a1a2e' }} float="left">
                                        <Form.Group widths='equal'>
                                            <Form.Input textAlign="left" fluid label='Nombre' placeholder='Nombre' onChange={this.handleName} />
                                            <Form.Input fluid label='Autor' placeholder='Autor' onChange={this.handleAuthor} />
                                            <Form.Select
                                                fluid
                                                label='Género'
                                                options={this.state.gameGeneroList}
                                                placeholder='Genero'
                                                onChange={this.handleGenero}
                                            />
                                        </Form.Group>

                                        <Form.TextArea width='9' label='Descripción' placeholder='Cuentanos sobre tu juego...' onChange={this.handleDescription} />
                                        <Form.Group>
                                            <Form.Field textAlign="left" fluid label='Color' />

                                            <Dropdown floating
                                                placeholder='Selecciona un color'
                                                selection
                                                options={colorOptions}
                                                onChange={this.handleThemeColor}
                                            />
                                        </Form.Group>
                                    </Form>
                                </div>
                            </Segment>

                            {/*<Segment inverted placeholder style={{ backgroundColor: '#1a1a2e' }}>

                                <Header icon>
                                    <Icon name='pdf file outline' />
                                            No documents are listed for this customer.
                                            </Header>
                                <Button inverted onClick={this.findSelectGenero}>Add Document</Button>

                            </Segment> 
                            <Form.Button inverted onClick={() => this.saveGame()}>Publicar</Form.Button>
                            */}
                            <div>
                                <meta charSet="UTF-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                                <title>Upload and Download Files</title>
                                <center>
                                    <h1>Sube tus archivos aquí!</h1>
                                    <br /><br />
                                    <form action="/" method="POST" encType="multipart/form-data">
                                        <input type="file" name="pic" id="pic" /><br />
                                        <br /><br />
                                        <input type="submit" defaultValue="subir archivo" />
                                    </form><br/><br/><br/><br/>
          &lt;% if(data.length &gt; 0) {'{'}%&gt;
          &lt;% for(var i=0; i&lt; data.length; i++) {'{'}%&gt;
          &lt;% {'}'} %&gt;
          <table>
                                        <thead>
                                            <tr>
                                                <td>
                                                    images
                </td>
                                                <td>
                                                    download
                </td>
                                            </tr>
                                        </thead>
                                        <tbody><tr>
                                            <td>
                                                <img src="<%= data[i].picpath%>" alt="images" style={{ width: '100px', height: '100px' }} />
                                                {/* <%= data[i].picpath%> */}
                                            </td>
                                            <td>
                                                <form action="/download/<%= data[i]._id%>">
                                                    <input type="submit" defaultValue="descargar" />
                                                </form>
                                            </td>
                                        </tr></tbody>
                                    </table>
          &lt;% {'}'} %&gt;
        </center>
                            </div>

                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />
                            <Divider hidden />

                        </div>
                    </div>

                </Fragment>

            </div>
        );
    }
}