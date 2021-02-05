import React,{ Component } from 'react'
import { Grid, Segment, Label, Comment, Rating, Container, Header } from 'semantic-ui-react';

class PlaceOpinionCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            userAuthorName : "username",
            title : "title",
            message : "message",
            grade : 1
        }
    }

    componentWillMount() {
        if (this.props.opinionData !== undefined) {
            this.setState({
                userAuthorName : this.props.opinionData.userAuthor,
                title : this.props.opinionData.title,
                message : this.props.opinionData.message,
                grade : this.props.opinionData.grade
            })
        }
    }

    render() {
        return(
            <Grid textAlign = 'center'>
                <Grid.Column >
                    <Grid.Row>
                    <Segment width = {5} textAlign='left' color='orange' padded>
                        <Label color='orange' attached = 'top' size='large'>{this.state.title}</Label>
                         <Comment>
                            <Comment.Content>
                                <Comment.Author><Header as='h3'>{this.state.userAuthorName}</Header></Comment.Author>
                                <Comment.Metadata>
                                <Rating size='huge' icon='heart' disabled defaultRating={this.state.grade} maxRating={5}></Rating>
                                </Comment.Metadata>
                                <Comment.Text>
                                    <Container>
                                        <p>
                                            {this.state.message}
                                        </p>
                                    </Container>                                   
                                </Comment.Text>
                            </Comment.Content>
                        </Comment>
            </Segment>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
            
              
        )
    }
}

export default PlaceOpinionCard;