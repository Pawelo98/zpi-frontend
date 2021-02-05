import React, { Component } from 'react';
import { Button, Label, Form, Grid, GridColumn, TextArea, Segment, Input, Container } from 'semantic-ui-react';
import { mainProfileService } from "./Api/Api";
import { notification } from "antd";
import { USER } from "./constants";


class UserInfoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "login",
      name: "imie",
      nazwisko: "nazwisko",
      email: "email użytkownika",
      photoLink: "https://react.semantic-ui.com/images/wireframe/image.png",
      phoneNumber: "telefon użytkownika",
      description: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (updateRequest) {
    // Here, we invoke the callback with the new value
    this.props.onChange(updateRequest);
  };

  componentDidMount() {
    this.setState((props) => ({
      username: this.props.username,
      name: this.props.name,
      surname: this.props.surname,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      photoLink: this.props.photoLink,
      description: this.props.description,
    }));
  }

  handleSubmit(event) {
    const updateRequest = {
      username: this.state.username,
      email: this.state.email,
      name: this.state.name,
      surname: this.state.surname,
      phoneNumber: this.state.phoneNumber,
      photoLink: this.props.photoLink,
      description: this.state.description,
    };
    this.handleChange(updateRequest);
    
    mainProfileService
      .updateUser(updateRequest)
      .then((response) => {
        notification.success({
          message: "Data change",
          description: "Data were correctly changed!",
        });

        localStorage.setItem(USER, JSON.stringify(updateRequest));
        this.props.handler();
      })
      .catch((error) => {
        notification.error({
          message: "Data change",
          description: error.message || "Sorry! Something went wrong.",
        });
      });
  }

  render() {
    return (
      <Grid>
        <GridColumn>
          <Grid.Row>
            <Segment>
              <Label attached="top">Imię</Label>
              <Container textAlign="left">
                <Input
                  placeholder="Imię"
                  style={{ width: "100%" }}
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                  }}
                ></Input>
              </Container>
            </Segment>
            <Segment>
              <Label attached="top">Nazwisko</Label>
              <Container textAlign="left">
                <Input
                  placeholder="Nazwisko"
                  style={{ width: "100%" }}
                  value={this.state.surname}
                  onChange={(e) => {
                    this.setState({ surname: e.target.value });
                  }}
                ></Input>
              </Container>
            </Segment>
            <Segment>
              <Label attached="top">Email</Label>
              <Container textAlign="left">
                <Input
                  placeholder="Email"
                  style={{ width: "100%" }}
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                ></Input>
              </Container>
            </Segment>
            <Segment>
              <Label attached="top">Telefon</Label>
              <Container textAlign="left">
                <Input
                  placeholder="Telefon"
                  style={{ width: "100%" }}
                  value={this.state.phoneNumber}
                  onChange={(e) => {
                    this.setState({ phoneNumber: e.target.value });
                  }}
                ></Input>
              </Container>
            </Segment>
            <Segment>
              <Label attached="top">O mnie</Label>
              <Container textAlign="left">
                <Form>
                  <TextArea
                    value={this.state.description}
                    style={{ minHeight: "10%" }}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  ></TextArea>
                </Form>
              </Container>
            </Segment>
            <GridColumn width={1}>
              <Button
                fluid
                size="medium"
                color="green"
                style={{
                  width: "100%",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
                onClick={this.handleSubmit}
              >
                <Button.Content visible>Zapisz zmiany</Button.Content>
              </Button>
            </GridColumn>
            <GridColumn width={1}>
              <Button
                fluid
                size="medium"
                color="grey"
                style={{ width: "100%" }}
                onClick={this.props.handler}
              >
                <Button.Content visible>Anuluj</Button.Content>
              </Button>
            </GridColumn>
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }
}
export default UserInfoEdit;
