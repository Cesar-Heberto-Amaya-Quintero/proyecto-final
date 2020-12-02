import React, { Fragment, Component, createRef, createRef2 } from 'react';
import { getApolloContext, gql } from '@apollo/client';
import { Button, Header, Icon, Segment, Menu, Image, Sidebar, Form, Checkbox, Divider, Select, Dropdown, Table, List } from 'semantic-ui-react'
import axios from 'axios';

const ADD_GAME = gql`
    mutation($name: String!, $author: String!, $themeColor: String! ,$description: String!, $imageUrl: String!,$filePath: String! ,$gameGeneroId: ID!)
    {
        addGame(name:$name, author:$author,themeColor: $themeColor,description:$description, imageUrl: $imageUrl ,filePath: $filePath ,gameGeneroId: $gameGeneroId)
    {
        id
        name
        author
        themeColor
        description
        imageUrl
        filePath
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

const ADD_FILE = gql`
    mutation($name: String!, $path: String!) {
    addFile(name:$name, path:$path)
        {
            id
            name
            path
        }
    }
`;


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

// const [file, setFile] = useState('');
//     const [data, getFile] = useState({ name: "", path: "" });
//     const [progress, setProgess] = useState(0);
//     const el = useRef();

//     const handleChange = (e) => {
//         setProgess(0)
//         const file = e.target.files[0]
//         console.log(file);
//         setFile(file)
//     }

//     const uploadFile = () => {
//         const formData = new FormData();
//         formData.append('file', file)
//         axios.post('http://localhost:4500/upload', formData, {
//             onUploadProgress: (ProgressEvent) => {
//                 let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
//                 setProgess(progress)
//             }
//         }).then(res => {
//             console.log(res);
//             getFile({ name: res.data.name, path: 'http://localhost:4500' + res.data.path })
//             // el.current.value = "";
//         }).catch(err => console.log(err))
//     }


export default class TopTrending extends Component {

    state = {
        gameGeneroList: [],
        fieldName: '',
        fieldAuthor: '',
        fieldDescription: '',
        fieldThemeColor: '',
        fieldGameGenero: '',
        file: '',
        getFile: { file: '', path: '' },
        progress: '',
        file2: '',
        getFile2: { file: '', path: '' },
        progress2: '',
        fieldPathFile: '',
        fieldNameFile: '',
        fieldImageUrl: ''

    }

    constructor() {
        super();
        this.el = React.createRef();
        this.el2 = React.createRef();
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

    //handleFile = e => this.setState({file: e.target.files[0]});
    //setFile(file);


    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_GAME_GENEROS });
        this.setState({
            gameGeneroList: response.data.gameGeneros.map(item => {
                return { key: item.id, text: item.name, value: item.id };
            })
        })
        console.log(response);
    }

    saveGame = () => {
        const { fieldName, fieldAuthor, fieldThemeColor, fieldDescription, fieldGameGenero, fieldImageUrl, fieldPathFile } = this.state;
        const { client } = this.context;

        client.mutate({
            mutation: ADD_GAME,
            variables: {
                name: fieldName,
                author: fieldAuthor,
                themeColor: fieldThemeColor,
                description: fieldDescription,
                imageUrl: fieldImageUrl,
                filePath: fieldPathFile,
                gameGeneroId: fieldGameGenero,

            }
        }).then(res => console.log(res))
            .catch(error => console.log(error));
        console.log(client);
        console.log({ name: fieldName, author: fieldAuthor, themeColor: fieldThemeColor, description: fieldDescription, gameGeneroId: fieldGameGenero, imageUrl: fieldImageUrl, filepath: fieldPathFile });
        window.location.reload();
    }

    render() {
        const { value } = this.state

        const { file, progress, file2, progress2 } = this.state;
        const setFile = file => this.setState({ file });
        const setProgess = progress => this.setState({ progress });

        const setFile2 = file2 => this.setState({ file2 });
        const setProgess2 = progress2 => this.setState({ progress2 });


        const saveFile = () => {
            const { fieldNameFile, fieldPathFile } = this.state;
            const { client } = this.context;
            client.mutate({
                mutation: ADD_FILE,
                variables: {
                    name: fieldNameFile,
                    path: fieldPathFile
                }
            }).then(res => console.log(res))
                .catch(error => console.log(error));
            console.log(client);
            console.log(this.state.fieldNameFile);
            console.log(this.state.fieldPathFile);
        }

        const handleChange = (e) => {
            setProgess(0)
            const file = e.target.files[0]
            console.log(file);
            setFile(file)
        }

        const handleChange2 = (e) => {
            setProgess2(0)
            const file2 = e.target.files[0]
            console.log(file2);
            setFile2(file2)
        }

        const uploadFile = () => {
            const formData = new FormData();
            formData.append('file', file)
            axios.post('http://localhost:5000/upload', formData, {
                onUploadProgress: (ProgressEvent) => {
                    let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setProgess(progress)
                }
            }).then(res => {
                console.log(res);
                this.setState({ getFile: { name: res.data.file, path: 'http://localhost:5000' + res.data.path } })
                this.setState({ fieldNameFile: res.data.file });
                this.setState({ fieldPathFile: res.data.path });
                //getFile({ name: res.data.name, path: 'http://localhost:5000' + res.data.path })
                // el.current.value = "";
            }).catch(err => console.log(err))
        }

        const uploadFile2 = () => {
            const formData2 = new FormData();
            formData2.append('file', file2)
            axios.post('http://localhost:5000/upload', formData2, {
                onUploadProgress: (ProgressEvent) => {
                    let progress2 = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setProgess2(progress2)
                }
            }).then(res => {
                console.log(res);
                this.setState({ getFile2: { name: res.data.file, path: 'http://localhost:5000' + res.data.path } })
                this.setState({ fieldImageUrl: res.data.path });
                //getFile({ name: res.data.name, path: 'http://localhost:5000' + res.data.path })
                // el.current.value = "";
            }).catch(err => console.log(err))
        }

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

                            <li onClick={this.sendToHome}><a href="#">Home</a></li>
                            <li onClick={this.sendToGames}><a href="#">Juegos</a></li>
                            <li onClick={this.sendToTops}><a href="#">Subir</a></li>

                        </ul>
                    </div>
                    <div id="contenido">
                        <div class="fondo">

                            <Segment style={{ backgroundColor: '#1a1a2e' }}>
                                <div>
                                    <Header inverted as='h1' textAlign='center'>Sube un juego</Header>
                                </div>

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
                                    <Form.Group>
                                        <Form.TextArea rows={1} width='12' label='Descripción' placeholder='Cuentanos sobre tu juego...' onChange={this.handleDescription} />

                                        <Form.Field width='6'>
                                            <label>Color</label>
                                            <Dropdown floating
                                            placeholder='Selecciona un color'
                                            selection
                                            options={colorOptions}
                                            onChange={this.handleThemeColor}
                                        />
                                        </Form.Field>
 
                                    </Form.Group>
                                    <Form.Field textAlign="left" fluid label='Archivo comprimido' />

                                    <div className="file-upload">
                                        <input type="file" ref={this.el} onChange={handleChange} />
                                        <br />
                                        <div className="progessBar" style={{ width: progress }}>{progress}</div>
                                        <br />
                                        <Form.Button size="medium" inverted onClick={uploadFile}>Subir</Form.Button>
                                    </div>
                                    <hr />


                                    <br /><br /><br />
                                    <Form.Field textAlign="left" fluid label='Imagen del juego' />

                                    <div className="file-upload">
                                        <input type="file" ref={this.el2} onChange={handleChange2} />
                                        <br />
                                        <div className="progessBar" style={{ width: progress2 }}>{progress2}</div>
                                        <br />
                                        <Form.Button size="medium" inverted onClick={uploadFile2}>Subir</Form.Button>
                                    </div>
                                    <hr />

                                    <center>
                                        <Form.Button inverted onClick={() => this.saveGame()}>Publicar</Form.Button>
                                    </center>

                                </Form>
                            </Segment>

                        </div>
                    </div>

                </Fragment>

            </div>
        );
    }
}