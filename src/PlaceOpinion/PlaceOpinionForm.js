import React,{ Component } from "react";
import { Header, Grid,Rating, Segment,Button,Icon, Divider, Container } from "semantic-ui-react";
import { notification, Input, Form } from "antd";
import { validation } from "../Register/validationRules"
import { eventPlaceOpinionService } from "../Api/Api";
const FormItem = Form.Item;

class PlaceOpinionForm extends Component {

    constructor(props) {
        super(props);
  
        this.state = {
            placeID : '',

            title: {
                value: "",
              },

            message: {
                value: "",
            },

            defaultGrade : 3
        }
        this.handleChange = this.handleChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit () {
          console.log(this.state.placeID + " " + this.state.title.value + " " + this.state.message.value + " " + this.state.defaultGrade)

          const updateRequest = {
            eventID: this.state.placeID,
            title: this.state.title.value,
            message: this.state.message.value,
            grade: this.state.defaultGrade            
          };

          eventPlaceOpinionService.sendEventPlaceOpinion
          (updateRequest)
          .then((response) => {
            notification.success({
              message: "Data change",
              description: "Data were correctly added!",
            });
         })
          .catch((error) => {
            notification.error({
              message: "Data change",
              description: error.message || "Sorry! Something went wrong.",
            });
          });
      }

      handleChange(event, valdiationFunction) {
        const target = event.target;
        const inputValue = target.value;
        const inputName = target.name;
    
        this.setState({
          [inputName]: {
            value: inputValue,
            ...valdiationFunction(inputValue),
          },
        });
      }

    componentWillMount () {
        this.setState(
            {
                placeID : this.props.match.params.eventPlaceID
            }
        )
    }

    isFormInvalid() {
        return !(
          this.state.title.validateStatus === "success" &&
          this.state.message.validateStatus === "success"
        );
      }

    handleRate = (event,{ rating, maxRating }) => {
        this.setState(
            {
                defaultGrade : rating
            }
        )
    }

    

     render () {
         return (
             <Grid textAlign='center'>
                 <Grid.Row>
                     <Grid.Column width={10} textAlign='left'>
                         <Segment>
                             <Header textAlign='center' color='orange' as='h1'>Opinia o miejscu</Header>
                             <Form>
                                <FormItem 
                                    style={{ marginBottom: 12 }}
                                    hasFeedback
                                    autoComplete="off"
                                    validateStatus={this.state.title.validateStatus}
                                    help={this.state.title.errorMsg}>
                                    
                                    <Input 
                                    autoComplete="off"
                                    name="title"
                                    type="text"
                                    value={this.state.title.value}
                                    placeholder="Tytuł"
                                    onChange={(event) =>
                                    this.handleChange(event, validation.validateTitle)}/>
                                                
                                </FormItem>

                                <FormItem 
                                    style={{ marginBottom: 12 }}
                                    hasFeedback
                                    autoComplete="off"
                                    validateStatus={this.state.message.validateStatus}
                                    help={this.state.message.errorMsg}>
                                    
                                    <Input.TextArea
                                    autoComplete="off"
                                    name="message"
                                    type="text"
                                    value={this.state.message.value}
                                    placeholder="Napisz coś o miejscu..."
                                    onChange={(event) =>
                                    this.handleChange(event, validation.validateMessage)}/>
                                                
                                </FormItem>
                                <Rating maxRating={5} defaultRating={this.state.defaultGrade} icon='star' size='massive' onRate={this.handleRate} />
                                <Divider></Divider>
                                <Container textAlign='center'>
                                    <Button disabled={this.isFormInvalid()} animated size='big' color='orange' onClick={this.handleSubmit}>
                                        <Button.Content visible>Dodaj opinię</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='plus' />
                                        </Button.Content>
                                    </Button>
                                </Container>
                                
                            </Form>
                         </Segment>
                     </Grid.Column>
                 </Grid.Row>
             </Grid>
         )
     }
}

export default PlaceOpinionForm;