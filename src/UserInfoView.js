import React, { Component } from 'react';
import { Button, Label, Icon, Grid, GridColumn, Image, Segment } from 'semantic-ui-react';
import LoadingIndicator from "./common/LoadingIndicator";

class UserInfoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      username: "login użytkownika",
      name: "imie",
      surname: "nazwisko",
      email: "email użytkownika",
      userProfileImage:
        "https://react.semantic-ui.com/images/wireframe/image.png",
      phoneNumber: "telefon użytkownika",
      description: "Lorem ipsum dolor sit amet.",
    };
  }

  componentDidMount(props) {
    this.setState((props) => ({
      username: this.props.username,
      name: this.props.name,
      surname: this.props.surname,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      description: this.props.description,
      userProfileImage: this.props.userProfileImage,
    }));
  }

  render() {
    if (this.props.isLoading) {
      return <LoadingIndicator />;
    }

    let button = null;
    if(this.props.currentUser === this.props.username) {
      button =  <Button
                  fluid
                  size="small"
                  color="grey"
                  onClick={this.props.handler}
                >
                  <Button.Content visible>Edytuj profil</Button.Content>
                </Button>
    }

    return (
      <Grid>
        <GridColumn width="16">
          <Grid.Row>
            <Segment>
              <Label attached="top">{this.props.username}</Label>
              {this.props.isLoadingImage ? (
                <LoadingIndicator />
              ) : (
                <Image
                  fluid
                  bordered
                  rounded
                  centered
                  src={this.props.userProfileImage}
                  style={{ maxHeight: "200px", maxWidth: "200px" }}
                />
              )}
            </Segment>
            <Segment textAlign="left">
              <Icon name="user" />
              {this.props.name + " " + this.props.surname}
            </Segment>
            <Segment textAlign="left">
              <Icon name="mail" />
              {this.props.email}
            </Segment>
            <Segment textAlign="left">
              <Icon name="phone" />
              {this.props.phoneNumber}
            </Segment>
            <Segment textAlign="left">
              <Icon name="book" />
              {this.props.description}
            </Segment>
            {button}
          </Grid.Row>
        </GridColumn>
      </Grid>
    );
  }
}

export default UserInfoView;