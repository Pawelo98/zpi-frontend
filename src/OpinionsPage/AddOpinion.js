import React,{ Component } from 'react'
import { Grid, Segment, Form, Rating, Button, TextArea } from 'semantic-ui-react';
import { userOpinionService } from '../Api/Api';
import { notification } from "antd";

class AddOpinion extends Component {
    constructor(props){
        super(props);
        this.state = {
            userOpinionID : 0,
            userAuthor: "",
            userAbout: "",
            title : "",
            message : "",
            grade : 3,
            isOpinionIncorrect: true,
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
      }
    
    handleTitleChange(event) {    
        this.setState({title: event.target.value}); 
        this.checkIfCommentIsValid();
    }

    handleMessageChange(event) {    
        this.setState({message: event.target.value}); 
        this.checkIfCommentIsValid();
    }
    handleRate = (e, {rating}) =>{
            this.setState({ grade: rating
        })
    }

    checkIfCommentIsValid = () => {
        if(!this.state.title || !this.state.message) {
            this.setState({
                isOpinionIncorrect: true
            })
        } else {
            this.setState({
                isOpinionIncorrect: false
            })
        }
    }

    componentWillMount() {

        if (this.props.opinionData !== null) {
            this.setState({
                userOpinionID : this.props.opinionData.userOpinionID,
                title : this.props.opinionData.title,
                message : this.props.opinionData.message,
                grade : this.props.opinionData.grade
            })
        }
    }

    handleChange (opinionRequest) {
        // Here, we invoke the callback with the new value
        this.props.onChange(opinionRequest);
      };

    handleSubmit() {
        const newOpinionRequest = {
          userAuthor: this.props.currentUser,
          userAbout: this.props.aboutUser,
          opinionTitle: this.state.title,
          opinionGrade: this.state.grade,
          opinionMessage: this.state.message
        };
        userOpinionService
          .newUserOpiion(newOpinionRequest)
          .then((response) => {
            notification.success({
              message: "New opinion",
              description:
                "Thank you! Your opinion has been added.",
            });
          })
          .catch((error) => {
            notification.error({
              message: "New event place",
              description:
                error.message || "Sorry! Something went wrong. Please try again!",
            });
          });
      }
   
    render() {
        return(
            <Grid textAlign = 'center'>
                <Grid.Column >
                    <Grid.Row>
                        <Segment width = {5} textAlign='left' color='orange' padded>
                            <Form>
                                <Form.Field>
                                    <label>Tytuł</label>
                                    <input placeholder='Treść tytułu...' 
                                    onChange={this.handleTitleChange}
                                    value={this.state.title}/>
                                </Form.Field>
                                <Rating size='huge' icon='heart' defaultRating={this.state.grade} maxRating={5} onRate={this.handleRate}></Rating>
                                <Form.Field 
                                    control={TextArea}
                                    label='Treść'
                                    placeholder='Treść opinii...' 
                                    onChange={this.handleMessageChange}
                                    > 
                                    {this.state.message}
                                </Form.Field>
                                <Button color='orange' disabled={this.state.isOpinionIncorrect} type='Wystaw opinię' onClick={this.handleSubmit} >Submit</Button>
                            </Form>
                        </Segment>
                    </Grid.Row>
                </Grid.Column>
            </Grid>          
        )
    }
}

export default AddOpinion;