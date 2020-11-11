import React, {Component, Fragment} from 'react';
import { Button, Header, Icon, Segment, Menu , Image, Sidebar, Form, Checkbox, Divider} from 'semantic-ui-react'

const options = [
    { key: 'av', text: 'Aventura', value: 'aventura' },
    { key: 't', text: 'Terror', value: 'terror' },
    { key: 'ac', text: 'Acción', value: 'acción' },
    { key: 'o', text: 'Otro', value: 'Otro' },
  ]

export default class Games extends Component {

    state = {}

    sendToHome = ()=> this.props.history.push({pathname: '/'});

    sendToGames = ()=> this.props.history.push({pathname: '/games'});

    sendToTops = ()=> this.props.history.push({pathname: '/top'});

    handleChange = (e, { value }) => this.setState({ value })

    render(){
       
        const { value } = this.state

        return(
            <Fragment>
                
                <Segment inverted>
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
                    <Divider></Divider>
                   
               <Segment inverted> 
                    <div>
                        <Header inverted as='h1' textAlign='center'>Sube un juego</Header>
                    </div>
                <Form inverted>
                    <Form.Group widths='equal'>
                    <Form.Input fluid label='Nombre' placeholder='Nombre' />
                    <Form.Input fluid label='Autor' placeholder='Autor' />
                    <Form.Select
                        fluid
                        label='Gender'
                        options={options}
                        placeholder='Gender'
                    />
                    </Form.Group>
                    <Form.Group inline>
                    <label>Size</label>
                    <Form.Radio
                        label='Small'
                        value='sm'
                        checked={value === 'sm'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Medium'
                        value='md'
                        checked={value === 'md'}
                        onChange={this.handleChange}
                    />
                    <Form.Radio
                        label='Large'
                        value='lg'
                        checked={value === 'lg'}
                        onChange={this.handleChange}
                    />
                    </Form.Group>
                    <Form.TextArea label='Descripción' placeholder='Cuentanos sobre tu juego...' />
                    
                </Form>
                </Segment> 
                
                <Segment placeholder >
                    
                    <Header icon>
                    <Icon name='pdf file outline' />
                    No documents are listed for this customer.
                    </Header>
                    <Button primary>Add Document</Button>
                    
                </Segment> 
                <Form.Button>Publicar</Form.Button>  
                </Segment> 
            </Fragment>
            
        );
    }
}