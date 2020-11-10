import React, {Component, Fragment} from 'react';

import { Button, Divider, Grid, Header, Segment, Menu, activeItem, Feed, Icon, Item, Image, Rating, Embed} from 'semantic-ui-react';

export default class HomeView extends Component {

    selectedValue = 'active'

    sendToHome = ()=> this.props.history.push({pathname: '/home'});

    sendToGames = ()=> this.props.history.push({pathname: '/games'});

    sendToTops = ()=> this.props.history.push({pathname: '/top'});

    render() {

        return(
            
            <Fragment>

                <Segment inverted>
                    <Menu inverted widths='five' fixed='top'  >

                    <Menu.Item
                        name='Home' icon='home' header as='h3'  onClick={this.sendToHome}
                        
                    /> 
                    <Menu.Item
                        name='Juegos' icon='game' header as='h3' onClick={this.sendToGames} 
                        onMouseOver={this.onSelect} onMouseOut={this.onDeselect}

                    />
                    
                    <Menu.Item
                        name='Top trending' icon='star' header as='h3' onClick={this.sendToTops}
                    />
                    </Menu>

                    <Divider></Divider>

                    <Header as='h2' icon='game' content='Game' />
                    <Grid relaxed='very' columns={5}>
                        <Grid.Column>
                        <Image size='medium' src='https://pbs.twimg.com/profile_images/1286810783570104327/4yWeqstd_400x400.jpg' />
                
                        </Grid.Column>
                        <Grid.Column>
                        <Image size='medium' src='https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode400/5438079/5438079-1599988451999-2ccff43ecbb12.jpg' />
        
                        </Grid.Column>
                        <Grid.Column>
                        <Image size='medium' src='https://letslassothemoon.com/wp-content/uploads/2015/10/minecraft.png' />

                        </Grid.Column>
                        <Grid.Column>
                        <Image size='medium' src='https://www.mobygames.com/images/covers/l/416543-fortnite-standard-founder-s-pack-playstation-4-front-cover.png' />

                        </Grid.Column>
                        <Grid.Column>
                        <Image size='medium' src='https://www.mobygames.com/images/covers/l/398832-little-nightmares-playstation-4-front-cover.png' />

                        </Grid.Column>
                    </Grid>

                    <Header as='h2' icon='video play' content='Videos Multimedia' />
                    <Grid relaxed='very' columns={5}>
                        <Grid.Column>
                        <Image size='medium' src='https://www.mobygames.com/images/covers/l/398832-little-nightmares-playstation-4-front-cover.png' />
                        </Grid.Column>
                        <Grid.Column>
                        <Image size='medium' src='https://www.mobygames.com/images/covers/l/665868-dying-light-enhanced-edition-dying-light-x-left-4-dead-2-weapon-pack-playstation-4-front-cover.jpg' />
                        </Grid.Column>
                        <Grid.Column>
                        <Image size='medium' src='https://cdn.shopify.com/s/files/1/0094/8718/8015/products/843563114568_800x.jpg?v=1587729419' />
                        </Grid.Column>
                        <Grid.Column>
                        <Image size= 'medium' src='https://www.actugaming.net/wp-content/uploads/2019/10/pac-man-party-royale-logo.jpg' />
                        </Grid.Column>
                        <Grid.Column>
                        <Image size= 'medium' src='https://www.hd-tecnologia.com/imagenes/articulos/2019/12/Encuentran-las-portadas-de-Resident-Evil-3-Remake-en-la-PlayStation-Store-1.jpg' />
                        </Grid.Column>
                    </Grid>

                    <Divider hidden></Divider>
                    { <Embed
                    id='Yg3LhyQGSu8'
                    placeholder='https://as.com/meristation/imagenes/2020/09/04/noticias/1599237499_919231_1599237606_noticia_normal.jpg'
                    source='youtube'
                /> }
                </Segment>
                
                
            </Fragment>
        );
    }
}