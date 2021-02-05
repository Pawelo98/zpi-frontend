import React, { Component } from "react";
import {Button, Segment, Image, Grid, Label, Container, Popup, Header} from "semantic-ui-react";
import { eventService, participationService } from '../Api/Api';
import LoadingIndicator from "../common/LoadingIndicator";
import { Link } from "react-router-dom";


class EventData extends Component {
    constructor(props) {
        super(props);

      this.state = {
          eventId: "",
          sportsName: "",
          sportsIcon: "https://cdn2.iconfinder.com/data/icons/activity-5/50/1F3C0-basketball-512.png",
          description: "",
          date: "",
          time: "",
          cyclePeriod: "",
          duration: '',
          joinned : null,
          actuallPartcipantNumber: 1,
          maxPartcipantNumber: 3,
          isLoading : true,
          eventStatus: ""
      }

    }
  
    componentDidMount() {
      const eventID = this.props.eventID;
      this.countEventParticipants(eventID);
      this.checkIfParticipationExists(eventID);
      this.setState({
          eventId: eventID,
          sportsName: this.props.eventSportName,
          description: this.props.eventDescription,
          date: this.props.eventDate,
          time: this.props.eventTime,
          cyclePeriod: {
            cycleLength: this.props.cycleLength,
            cycleType: this.props.cycleType
          },
          duration: this.props.eventDuration,
          joinned : true,
          actuallPartcipantNumber: 1,
          maxPartcipantNumber: this.props.maxPlayers,
          isLoading : true,
          eventStatus: this.props.eventStatus
      });
    }

    checkIfParticipationExists(eventID) {
      participationService.participationExists(eventID)
      .then((response) => {
        this.setState({
          joinned : response,
          isLoading: false
        });
        console.log(eventID + " joinned : " + this.state.joinned);
      })
      .catch((error) => {
        if (error.status === 404) {
          this.setState({
              isLoading: false
          });
        } else {
          this.setState({
              isLoading: false
          });
        }
      });
    }

    countEventParticipants(eventID) {
      eventService.countEventParticipants(eventID)
        .then((response) => {
          this.setState({
            actuallPartcipantNumber: response
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              actuallPartcipantNumber: 1
            });
          } else {
            this.setState({
              actuallPartcipantNumber: 1
            });
          }
        });
    }

    joinEvent = () => {
        console.log("Joining event : " + this.state.eventId)
        this.setState({
          isLoading : true
        });
        participationService.joinEvent(this.state.eventId)
          .then((response) => {
            this.setState({
              joinned : true,
              isLoading : false
            });
            console.log(this.state.eventId + " joinned : " + this.state.joinned);
            this.updateParticipants()
          })
          .catch((error) => {
            if (error.status === 404) {
              this.setState({
                isLoading : false
              });
            } else {
              this.setState({
                isLoading : false
              });
            }
          });
    }

    leaveEvent = () => {
      console.log("Leaving event : " + this.state.eventId);
      this.setState({ 
        isLoading: true 
      });
      participationService.leaveEvent(this.state.eventId)
        .then((response) => {
          this.setState({
            joinned: false,
            isLoading: false
          });
          console.log(this.state.eventID + " joinned : " + this.state.joinned);
          this.updateParticipants()
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    }

    cancelEvent = () => {
      console.log("Cancelin event : " + this.state.eventId);
      this.setState({ isLoading: true });
      eventService.cancelEvent(this.state.eventId)
        .then((response) => {
          this.setState({
            isLoading: false,
            eventStatus: "Anulowane"
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    }
    
    updateParticipants (){    
        console.log("updating participants");
        eventService.countEventParticipants(this.state.eventId)
        .then((response) => {
          this.setState({
            actuallPartcipantNumber: response
          });
        })
        .catch((error) => {
          if (error.status === 404) {
            this.setState({
              actuallPartcipantNumber: 1
            });
          } else {
            this.setState({
              actuallPartcipantNumber: 1
            });
          }
        });
      }

    cantBeChanged = () => {
      const timeDifference = new Date((this.props.eventDate + " " + this.props.eventTime)) - new Date();
      const differenceInHours = Math.abs(timeDifference)/3.6e6;
      console.log(differenceInHours)
      if(differenceInHours < 6) {
        return true
      } else {
        return false
      }
    }


    render() {
        let button;
        if (new Date(this.state.date + " " + this.state.time) <= new Date()) {
            button = <Button color='grey' size='huge' 
                            disabled>
                            <Button.Content visible>Wydarzenie minęło</Button.Content>
                    </Button>
        }
        else if(this.state.eventStatus === "Anulowane") {
            button = <Button color='grey' size='huge' 
                              disabled>
                              <Button.Content visible>Wydarzenie zostało anulowane</Button.Content>
                    </Button>
        }
        else if(!this.state.joinned) {
            button = <Button color='orange' size='huge' 
                             disabled={this.state.actuallPartcipantNumber>= this.state.maxPartcipantNumber}
                             onClick={this.joinEvent}
                             loading={this.state.isLoading}>
                            <Button.Content visible>Dołącz do wydarzenia</Button.Content>
                     </Button>
        } else if(this.props.userInitiator === this.props.currentUser.username) {
            let cantBeChanged = this.cantBeChanged();
            console.log(cantBeChanged);
            button = <Grid textAlign="center" stackable columns={1}>
                        <Grid.Column>
                          <Popup trigger={<Button fluid compact color='red' size='small' 
                                          loading={this.state.isLoading}
                                          style={{ maxHeight: 60}}
                                           flowing hoverable >
                                            <Button.Content visible>Anuluj wydarzenie</Button.Content>
                                          </Button>} flowing hoverable={true} position='top center'>
                            <Grid centered columns={1}>
                              <Grid.Column textAlign='center'>
                                <Header as='h4'>Jesteś pewien? </Header>
                                <Button color='red'  onClick={this.cancelEvent}>Tak, anuluj wydarzenie</Button>
                              </Grid.Column>
                            </Grid>
                          </Popup>
                          <Link to={`/editEvent/${this.state.eventId}`}>
                            <Button fluid compact color='grey' size='small' 
                                    loading={this.state.isLoading}
                                    style={{ maxHeight: 60, marginTop: '10px' }} 
                                    disabled={cantBeChanged}
                                    >
                                    <Button.Content visible>Edytuj wydarzenie</Button.Content>
                            </Button>
                          </Link>
                        </Grid.Column>
                     </Grid>                    
        }
        else {
            button = <Button color='red' size='huge' 
                             loading={this.state.isLoading}
                             onClick={this.leaveEvent}
                             >
                            <Button.Content visible>Zrezygnuj z wydarzenia</Button.Content>
                     </Button>
        }
        let cyclePeriod = null;
        if(this.props.cyclic) {
            cyclePeriod = this.state.cyclePeriod.cycleType + " " + this.state.cyclePeriod.cycleLength

        } else {
          cyclePeriod = 'Wydarzenie jednorazowe';
        }

        if (this.state.isLoading) {
            return <LoadingIndicator />;
        } else return(
                <Grid>
                    <Grid.Column>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Sport</Label>
                                <Container>
                                    <Grid>
                                        <Grid.Column textAlign='center'>
                                            {this.state.sportsName}
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Image src={this.state.sportsIcon}/>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Opis</Label>
                                <Container textAlign='center' >{this.state.description}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Data</Label>
                                <Container textAlign='center'>{this.state.date}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Godzina</Label>
                                <Container textAlign='center'>{this.state.time}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Cykliczność</Label>
                                <Container textAlign='center'>{cyclePeriod}</Container>
                            </Segment>
                            <Segment textAlign='left'>
                                <Label textAlign='left' attached="top" color="orange">Czas trwania</Label>
                                <Container textAlign='center'>{this.state.duration}</Container>
                            </Segment>
                            {button}
                    </Grid.Column>
                </Grid>
        )
    }
}

export default EventData;