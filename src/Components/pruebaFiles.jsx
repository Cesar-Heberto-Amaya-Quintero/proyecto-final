import React, { Component, Fragment } from 'react';

import { Divider, Header, Menu, Image, Rating, Embed, Card, List, Grid, Button } from 'semantic-ui-react';

import { getApolloContext, gql } from '@apollo/client';

const GET_ALL_FILES = gql`
    {
  files{
    id
    lenght
    chunkSize
    uploadDate
    filename
    md5
    contentType
  }
}
`;




export default class pruebaFiles extends Component {


    state = {
        files: [],
    }

    static contextType = getApolloContext();

    componentDidMount = async () => {
        const { client } = this.context;
        const response = await client.query({ query: GET_ALL_FILES });
        this.setState({ files: response.data.files });
        console.log(response.data.files);
    }


    sendToHome = () => this.props.history.push({ pathname: '/' });

    sendToGames = () => this.props.history.push({ pathname: '/games' });

    sendToInfoGame = id => this.props.history.push({ pathname: '/infoGame', state: { gameId: id } });

    sendToTops = () => this.props.history.push({ pathname: '/top' });

    showId = id => console.log(id);

    showGames = () => {
        return this.state.files.map(file => {
            console.log(file);

            return <Fragment >
                    {file.filename}

            </Fragment>


        })
    }

    render() {


        return (
            <Fragment>
            
                
                <Divider hidden/>

                <div class="fondo">
                    
                
                    <Divider vertical hidden></Divider>
                </div>
                <Divider hidden/>

                <div class="titulo">
                    <Header >Catálogo de juegos</Header>
                </div>
                

                <Divider hidden/>
                <div class="listaJuegos">

                        {this.showGames()}

                </div>

                <br/>
                <br/>

                

            </Fragment>
        );
    }
}

