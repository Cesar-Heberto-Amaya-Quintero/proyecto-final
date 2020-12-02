import React, { Fragment, Component, createRef } from 'react';
import axios from 'axios';
import { getApolloContext, gql } from '@apollo/client';
import { Divider, Button, Header, Segment, Menu, Image, Rating, Embed, Card, List, Table, Reveal, Form, Grid, Transition, Icon, Dropdown } from 'semantic-ui-react';

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


export default class pruebaFiles2 extends Component {

    static contextType = getApolloContext();

    state = {
        file: '',
        getFile: {file: '', path: ''},
        progress: '',
        fieldPathFile: '',
        fieldNameFile: ''
    }
    // const [file, setFile] = useState('');
    // const [data, getFile] = useState({ name: "", path: "" });
    // const [progress, setProgess] = useState(0);
    // const el = useRef();

    constructor() {
        super();
        this.el= null;
    }
   el = createRef();
   focusEl = () => this.focusEl.current.focus();
   
   sendToHome = () => this.props.history.push({ pathname: '/' });

   sendToGames = () => this.props.history.push({ pathname: '/games' });
   
   sendToTops = () => this.props.history.push({ pathname: '/upload' });
   
    render(){
    const { file, data, progress } = this.state;
    const setFile = file => this.setState({file});
    const setProgess = progress => this.setState({});

    this.componentDidMount = async =>{

    }
    
    const saveFile = () => {
        const { fieldNameFile, fieldPathFile} = this.state;
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
            this.setState({getFile: {name: res.data.file, path: 'http://localhost:5000' + res.data.path}})
            this.setState({fieldNameFile: res.data.file});
            this.setState({fieldPathFile: res.data.path});
            //getFile({ name: res.data.name, path: 'http://localhost:5000' + res.data.path })
            // el.current.value = "";
        }).catch(err => console.log(err))
    }


    return (
        <Fragment>
        <input id="abrir-cerrar" name="abrir-cerrar" type="checkbox" value="" />
        <label for="abrir-cerrar">&#9776; <span class="abrir">Menú</span><span class="cerrar">Menú</span></label>
        <div id="sidebar" class="sidebar">
            <ul class="menu">
                <div class="image">
                    <Image src='https://www.lasallenoroeste.edu.mx/sites/default/files/1_IMAGOTIPO_LASALLE_ulsanoroeste_transparente-01_new_1.png' />
                </div>
                            <li onClick={this.sendToHome}><a href="#">Home</a></li>
                            <li onClick={this.sendToGames}><a href="#">Juegos </a></li>
                            <li onClick={this.sendToTops}><a href="#">Subir </a></li>
                            <li onClick={this.sendToUpload2}><a href="#">Subir2 </a></li>
            </ul>
        </div>
        <div id="contenido">
        <div>
            <div className="file-upload">
                <input type="file" ref={this.el} onChange={handleChange} />
                <div className="progessBar" style={{ width: progress }}>{progress}</div> 
                <button onClick={uploadFile} className="upbutton">upload</button>
            </div>
            <hr />
            {this.state.getFile.path && <div><textarea value={this.state.getFile.path} onChange={uploadFile} /></div>}
            {this.state.getFile.path && <img src={this.state.getFile.path} alt={this.state.getFile.file} />}

        </div>
  
        <Button onClick={saveFile}>PRUEBA OJALA FUNCIONE ESTA CAGADA</Button>
        </div>
        </Fragment>
        );
    }
}