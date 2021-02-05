import React, { Component } from 'react';
import { Label, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import UserInfo from "./UserInfo"
import CommingEvent from "./Events/CommingEvent"
import PassedEvent from "./Events/PassedEvent"
import { eventService } from "./Api/Api";
import NotFound from "./common/NotFound";
import CheckAuthentication from "./common/CheckAuthentication";
import ServerError from "./common/ServerError";
import LoadingIndicator from "./common/LoadingIndicator";
import { Link } from "react-router-dom";

class MainProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLoading: false,
      isLoadingEvents: true,
      events: [
        {
          eventName: 1,
        },
        {
          eventName: 2,
        },
      ],
    };

    this.eventStatusColor = this.eventStatusColor.bind(this);
  }

  componentDidMount () {
    const username = this.props.match.params.username;
    this.loadEvents(username);
  }

  componentDidUpdate (prevProps) {
    // Typowy sposób użycia (nie zapomnij porównać właściwości):
    const username = this.props.match.params.username;
    if (username !== prevProps.match.params.username) {
      this.loadEvents(username);
    }
  }

  loadEvents (username) {
    this.setState({
      isLoadingEvents: true
    })
    eventService
      .getComingUserEvents(username)
      .then((response) => {
        this.setState({
          events: response,
          isLoadingEvents: false,
        });
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
            notFound: true,
            isLoadingEvents: false,
          });
        } else {
          this.setState({
            serverError: true,
            isLoadingEvents: false,
          });
        }
      });
  }

  sortByDateAscending (date1, date2) {
    if (date1.eventDate < date2.eventDate) {
      return -1;
    }
    if (date1.eventDate > date2.eventDate) {
      return 1;
    }
    return 0;
  }

  sortByDateDescending (date1, date2) {
    if (date1.eventDate < date2.eventDate) {
      return 1;
    }
    if (date1.eventDate > date2.eventDate) {
      return -1;
    }
    return 0;
  }

  eventStatusColor (event) {
    if (event.eventStatus === "Anulowane") {
      return "red";
    } else if (event.userInitiator === this.props.currentUser.username) {
      return "yellow";
    } else {
      return "blue";
    }
  }

  render () {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    if (this.state.notFound) {
      return <NotFound />;
    }

    if (this.state.serverError) {
      return <ServerError />;
    }
    if (!this.props.isAuthenticated) {
      return <CheckAuthentication {...this.props} />;
    }

    if (this.props.currentUser.username === this.props.match.params.username) {
      return (
        <Grid textAlign="center" stackable columns={3}>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Link to={"/searchPannel"} >
              <Button
                fluid
                size="massive"
                animated
                color="orange"
                style={{ maxHeight: 60 }}
              >
                <Button.Content visible>Znajdź ekipę</Button.Content>
                <Button.Content hidden>
                  <Icon name="group" />
                </Button.Content>
              </Button>
            </Link>
            <UserInfo currentUser={this.props.currentUser.username} username={this.props.match.params.username} />
            <br></br>

            <Link to={"/useropinions/" + this.props.match.params.username}>
              <Button
                fluid
                size="small"
                animated
                color="grey"
                style={{ maxHeight: 60 }}
              >
                <Button.Content visible>Opinie</Button.Content>
                <Button.Content hidden>
                  <Icon name="thumbs up" />
                </Button.Content>
              </Button>
            </Link>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment fluid="true">
              <Label attached="top">Twoje aktualne wydarzenia</Label>
              {this.state.isLoadingEvents ? (
                <LoadingIndicator />
              ) : (
                  <React.Fragment>

                    {this.state.events
                      .filter(function (event) {
                        return (new Date((event.eventDate + " " + event.eventTime)) >= new Date() && event.eventStatus !== "Anulowane");
                      })
                      .sort(this.sortByDateAscending)
                      .map((event) => (
                        <Segment key={event.eventID}>
                          <Label attached="top" horizontal color={this.eventStatusColor(event)} />
                          <CommingEvent

                            dataFromParent={event}
                          />
                        </Segment>
                      ))}
                  </React.Fragment>
                )}
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign="center" mobile={16} tablet={8} computer={5}>
            <Segment divided="true">
              <Label attached="top">Historia wydarzeń</Label>
              {this.state.isLoadingEvents ? (
                <LoadingIndicator />
              ) : (
                  <React.Fragment>
                    {this.state.events
                      .filter(function (event) {
                        return new Date((event.eventDate + " " + event.eventTime)) < new Date() || event.eventStatus === "Anulowane";
                      })
                      .sort(this.sortByDateDescending)
                      .slice(0, 10)
                      .map((event) => (
                        <Segment key={event.eventID}>
                          <Label attached="top" horizontal color={this.eventStatusColor(event)} />
                          <PassedEvent
                            dataFromParent={event}
                            isLoading={this.state.isLoadingEvents}
                          />
                        </Segment>
                      ))}
                  </React.Fragment>
                )}
            </Segment>
          </Grid.Column>
        </Grid>
      );
    } else {
      return (
        <Grid textAlign="center" stackable columns={3}>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <UserInfo currentUser={this.props.currentUser.username} username={this.props.match.params.username} />
            <br></br>

            <Link to={"/useropinions/" + this.props.match.params.username}>
              <Button
                fluid
                size="small"
                animated
                color="grey"
                style={{ maxHeight: 60 }}
              >
                <Button.Content visible>Opinie</Button.Content>
                <Button.Content hidden>
                  <Icon name="thumbs up" />
                </Button.Content>
              </Button>
            </Link>
          </Grid.Column>

          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Segment fluid="true">
              <Label attached="top" >Twoje aktualne wydarzenia</Label>
              {this.state.isLoadingEvents ? (
                <LoadingIndicator />
              ) : (
                  <React.Fragment>
                    {this.state.events
                      .filter(function (event) {
                        return (new Date((event.eventDate + " " + event.eventTime)) >= new Date() && event.eventStatus !== "Anulowane");
                      })
                      .sort(this.sortByDateAscending)
                      .map((event) => (
                        <Segment key={event.eventID}>
                          <Label attached="top" horizontal color={this.eventStatusColor(event)} />
                          <CommingEvent

                            dataFromParent={event}
                            isLoading={this.state.isLoadingEvents}
                          />
                        </Segment>
                      ))}
                  </React.Fragment>
                )}
            </Segment>
          </Grid.Column>

          <Grid.Column textAlign="center" mobile={16} tablet={8} computer={5}>
            <Segment divided="true">
              <Label attached="top" >Historia wydarzeń</Label>
              {this.state.isLoadingEvents ? (
                <LoadingIndicator />
              ) : (
                  <React.Fragment>
                    {this.state.events
                      .filter(function (event) {
                        return new Date((event.eventDate + " " + event.eventTime)) < new Date() || event.eventStatus === "Anulowane";
                      })
                      .sort(this.sortByDateDescending)
                      .slice(0, 10)
                      .map((event) => (
                        <Segment key={event.eventID}>
                          <Label attached="top" horizontal color={this.eventStatusColor(event)} />
                          <PassedEvent
                            dataFromParent={event}
                            isLoading={this.state.isLoadingEvents}
                          />
                        </Segment>
                      ))}
                  </React.Fragment>
                )}
            </Segment>
          </Grid.Column>
        </Grid>
      );
    }
  }
}

export default MainProfilePage;